import { useRef, useState, type FormEvent, type ReactNode } from 'react'
import { BookingError, MAX, NAME_JUNK, checkAppointment, formatPhone, sendAppointment, type AppointmentRequest } from '@/config/booking'
import { services } from '@/content/clinic'
import { home } from '@/content/home'

type Status = 'idle' | 'sending' | 'sent' | 'preview' | 'error' | 'invalid' | 'busy'

// Mientras se teclea o se pega: el nombre solo conserva letras, y el teléfono se escribe con su formato.
const onName = (e: FormEvent<HTMLInputElement>) => { e.currentTarget.value = e.currentTarget.value.replace(NAME_JUNK, '') }
const onPhone = (e: FormEvent<HTMLInputElement>) => { e.currentTarget.value = formatPhone(e.currentTarget.value) }
// Orden de los campos en pantalla: el primero con error recibe el foco.
const ORDER = ['firstName', 'lastName', 'phone', 'email', 'treatment', 'preferredTime', 'message', 'consent']

const { submitLabel, consent, messages, errors } = home.appointment
const phone = home.footer.phone

// Los campos replican el formulario de contacto oficial; su forma es AppointmentRequest en packages/types.
export function BookingForm({ defaultTreatment = '' }: { defaultTreatment?: string }) {
  const [status, setStatus] = useState<Status>('idle')
  const [bad, setBad] = useState<Record<string, string>>({}) // nombre del campo -> su mensaje
  const form = useRef<HTMLFormElement>(null)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'sending' || status === 'sent') return // no se envía por segunda vez mientras hay un envío en curso o ya terminado
    const el = e.currentTarget
    const data = new FormData(el)
    if (data.get('company')) return // honeypot: los bots llenan los campos ocultos
    const s = (k: string) => String(data.get(k) ?? '')
    // Las reglas viven en config/booking.ts (las mismas que revisa el envío).
    const { clean, errors: found } = checkAppointment({
      firstName: s('firstName'),
      lastName: s('lastName'),
      email: s('email'),
      phone: s('phone'),
      treatment: s('treatment'),
      message: s('message'),
      preferredTime: s('preferredTime') || undefined,
      consent: data.get('consent') === 'on',
      source: 'website',
    })
    setBad(found)
    const first = ORDER.find((k) => k in found)
    if (first) {
      setStatus('idle')
      el.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    const request: AppointmentRequest = clean
    setStatus('sending')
    try {
      const result = await sendAppointment(request)
      if (result === 'sent') el.reset() // los datos enviados no se quedan en pantalla
      setStatus(result)
    } catch (err) {
      setStatus(err instanceof BookingError && err.kind !== 'down' ? err.kind : 'error')
    }
  }

  // Un campo: etiqueta, control y su propio mensaje enlazado con aria-describedby.
  // `wide`: ocupa las dos columnas; `required: false`: campo opcional (sin atributo required).
  const field = (name: keyof typeof errors | 'preferredTime', label: string, control: (p: object) => ReactNode, wide = false, required = true) => (
    <div className={`f${wide ? ' w2' : ''}${bad[name] ? ' bad' : ''}`}>
      <label htmlFor={`b-${name}`}>{label}</label>
      {control({ id: `b-${name}`, name, required, maxLength: MAX[name as keyof typeof MAX], 'aria-describedby': `e-${name}`, 'aria-invalid': bad[name] ? true : undefined })}
      <p className="err" id={`e-${name}`} role={bad[name] ? 'alert' : undefined}>{bad[name]}</p>
    </div>
  )

  return (
    <form ref={form} onSubmit={onSubmit} noValidate>
      <div className="fields">
        {field('firstName', 'First name', (p) => <input type="text" autoComplete="given-name" onInput={onName} {...p} />)}
        {field('lastName', 'Last name', (p) => <input type="text" autoComplete="family-name" onInput={onName} {...p} />)}
        {field('phone', 'Phone', (p) => <input type="tel" inputMode="tel" autoComplete="tel-national" placeholder="(702) 555-0123" onInput={onPhone} {...p} />)}
        {field('email', 'Email', (p) => <input type="email" autoComplete="email" {...p} />)}
        {field('treatment', 'What do you need?', (p) => (
          <select defaultValue={defaultTreatment} {...p}>
            <option value="" disabled>Choose a treatment</option>
            {services.map((s) => <option key={s.name}>{s.name}</option>)}
            <option>Not sure yet</option>
          </select>
        ), true)}
        {field('preferredTime', 'Preferred day and time (optional, Las Vegas time)', (p) => <input type="text" {...p} />, true, false)}
        {field('message', 'Anything else we should know (optional)', (p) => <textarea rows={3} {...p} />, true, false)}
        <p className="hint f w2">Please don’t include medical history or payment information.</p>
        <label className="hidden" aria-hidden="true">Company<input name="company" tabIndex={-1} autoComplete="off" /></label>
        <div className={`f w2${bad.consent ? ' bad' : ''}`}>
          <label className="consent" htmlFor="b-consent">
            <input id="b-consent" name="consent" type="checkbox" required aria-describedby="e-consent" aria-invalid={bad.consent ? true : undefined} />
            <span>{consent}</span>
          </label>
          <p className="err" id="e-consent">{errors.consent}</p>
        </div>
      </div>
      <div className="submit-row">
        <button className="btn" type="submit" disabled={status === 'sending' || status === 'sent'}>{status === 'sending' ? messages.sending : submitLabel}</button>
        <a className="tlink" href={phone.href}>{phone.label}</a>
      </div>
      <div role="status" aria-live="polite">
        {Object.keys(bad).length > 0 && status === 'idle' && <p className="status">{messages.missingFields}</p>}
        {status === 'sent' && <p className="status">{messages.success}</p>}
        {status === 'preview' && <p className="status">{messages.preview}</p>}
        {status === 'error' && <p className="status">{messages.error}</p>}
        {status === 'invalid' && <p className="status">{messages.errorInvalid}</p>}
        {status === 'busy' && <p className="status">{messages.errorBusy}</p>}
      </div>
    </form>
  )
}
