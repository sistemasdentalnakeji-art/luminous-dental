import { useRef, useState, type FormEvent, type ReactNode } from 'react'
import { BookingError, MAX, NAME_JUNK, checkAppointment, formatPhone, sendAppointment, type AppointmentRequest } from '@/config/booking'
import { services } from '@/content/clinic'
import { legalText } from '@/content/legal'
import { home } from '@/content/home'
import { BookingSchedule } from './BookingSchedule'
import { TimePicker } from './TimePicker'
import type { IconName } from '@/components/Icon'

type Status = 'idle' | 'sending' | 'sent' | 'preview' | 'error' | 'invalid' | 'busy'

// Mientras se teclea o se pega: el nombre solo conserva letras, y el teléfono se escribe con su formato.
const onName = (e: FormEvent<HTMLInputElement>) => { e.currentTarget.value = e.currentTarget.value.replace(NAME_JUNK, '') }
const onPhone = (e: FormEvent<HTMLInputElement>) => { e.currentTarget.value = formatPhone(e.currentTarget.value) }
// Orden de los campos en pantalla: el primero con error recibe el foco.
const ORDER = ['firstName', 'lastName', 'phone', 'email', 'treatment', 'preferredDate', 'preferredTime', 'message', 'consent']

const { submitLabel, consent, messages, errors } = home.appointment
const phone = home.footer.phone
// Un icono por grupo de tratamientos (los grupos salen de content/clinic.ts).
const GROUP_ICON: Record<string, IconName> = { 'General Dentistry': 'tooth', 'Cosmetic Dentistry': 'sparkle', Orthodontics: 'braces', 'Pediatric Dentistry': 'child' }
const TREATMENT_GROUPS = [
  ...[...new Set(services.map((s) => s.group))].map((g) => ({ label: g, icon: GROUP_ICON[g], options: services.filter((s) => s.group === g).map((s) => ({ value: s.name, label: s.name })) })),
  { label: 'Not sure?', options: [{ value: 'Not sure yet', label: 'Not sure yet' }] },
]

// Sección del formulario: fieldset con leyenda numerada (agrupa los campos para lectores de pantalla).
function Group({ step, title, children }: { step: number; title: string; children: ReactNode }) {
  return (
    <fieldset className="fgroup">
      <legend><span className="fgroup-num" aria-hidden="true">{step}</span>{title}</legend>
      <div className="fields">{children}</div>
    </fieldset>
  )
}

// Los campos replican el formulario de contacto oficial; su forma es AppointmentRequest en packages/types.
export function BookingForm({ defaultTreatment = '' }: { defaultTreatment?: string }) {
  const [status, setStatus] = useState<Status>('idle')
  const [bad, setBad] = useState<Record<string, string>>({}) // nombre del campo -> su mensaje
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [treatment, setTreatment] = useState(defaultTreatment)
  const form = useRef<HTMLFormElement>(null)

  // Al elegir un día u hora válidos, se quita el aviso que quedó del envío anterior.
  const clear = (k: string) => setBad(({ [k]: _gone, ...rest }) => rest)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'sending') return // no se envía por segunda vez mientras hay un envío en curso (tras uno terminado se puede pedir otra cita: el formulario ya quedó limpio)
    const el = e.currentTarget
    const data = new FormData(el)
    if (data.get('contact_ref')) { setStatus('error'); return } // honeypot: los bots llenan los campos ocultos; si lo llenó el autocompletado de una persona, ve el aviso genérico y puede reintentar
    const s = (k: string) => String(data.get(k) ?? '')
    // Las reglas viven en config/booking.ts (las mismas que revisa el envío).
    const { clean, errors: found } = checkAppointment({
      firstName: s('firstName'),
      lastName: s('lastName'),
      email: s('email'),
      phone: s('phone'),
      treatment: s('treatment'),
      message: s('message'),
      preferredDate: date,
      preferredTime: time,
      consent: data.get('consent') === 'on',
      source: 'website',
    })
    setBad(found)
    const first = ORDER.find((k) => k in found)
    if (first) {
      setStatus('idle')
      el.querySelector<HTMLElement>(`[name="${first}"],[data-focus="${first}"]`)?.focus()
      return
    }
    const request: AppointmentRequest = clean
    setStatus('sending')
    try {
      const result = await sendAppointment(request)
      if (result === 'sent') { el.reset(); setDate(''); setTime(''); setTreatment(defaultTreatment) } // los datos enviados no se quedan en pantalla
      setStatus(result)
    } catch (err) {
      setStatus(err instanceof BookingError && err.kind !== 'down' ? err.kind : 'error')
    }
  }

  // Un campo: etiqueta, control y su propio mensaje enlazado con aria-describedby.
  // `wide`: ocupa las dos columnas; `required: false`: campo opcional (sin atributo required).
  const field = (name: keyof typeof errors, label: string, control: (p: any) => ReactNode, wide = false, required = true, hint?: string) => (
    <div className={`f${wide ? ' w2' : ''}${bad[name] ? ' bad' : ''}`}>
      <label htmlFor={`b-${name}`}>{label}</label>
      {control({ id: `b-${name}`, name, required, maxLength: MAX[name as keyof typeof MAX], 'aria-describedby': hint ? `h-${name} e-${name}` : `e-${name}`, 'aria-invalid': bad[name] ? true : undefined })}
      {hint && <p className="hint" id={`h-${name}`}>{hint}</p>}
      <p className="err" id={`e-${name}`} role={bad[name] ? 'alert' : undefined}>{bad[name]}</p>
    </div>
  )

  return (
    <form ref={form} onSubmit={onSubmit} noValidate>
      <Group step={1} title="Your details">
        {field('firstName', 'First name', (p) => <input type="text" autoComplete="given-name" placeholder="Your first name" onInput={onName} {...p} />)}
        {field('lastName', 'Last name', (p) => <input type="text" autoComplete="family-name" placeholder="Your last name" onInput={onName} {...p} />)}
        {field('phone', 'Phone', (p) => <input type="tel" inputMode="tel" autoComplete="tel-national" placeholder="(000) 000-0000" onInput={onPhone} {...p} />)}
        {field('email', 'Email', (p) => <input type="email" autoComplete="email" placeholder="you@example.com" {...p} />)}
      </Group>
      <Group step={2} title="Your visit">
        {field('treatment', 'What do you need?', (p) => (
          <TimePicker id={p.id} name="treatment" grid={false} focusKey="treatment" value={treatment} groups={TREATMENT_GROUPS} placeholder="Choose a treatment" invalid={Boolean(bad.treatment)} describedBy={p['aria-describedby']} onChange={(v) => { setTreatment(v); clear('treatment') }} />
        ), true)}
        <BookingSchedule date={date} time={time} onDate={(d) => { setDate(d); if (d) clear('preferredDate') }} onTime={(v) => { setTime(v); if (v) clear('preferredTime') }} errDate={bad.preferredDate} errTime={bad.preferredTime} />
      </Group>
      <Group step={3} title="Message and consent">
        {field('message', 'Anything else we should know (optional)', (p) => <textarea rows={3} placeholder="Tell us how we can help." {...p} />, true, false, home.appointment.messageHint)}
        <label className="hidden" aria-hidden="true">Reference<input name="contact_ref" tabIndex={-1} autoComplete="off" /></label>
        <div className={`f w2${bad.consent ? ' bad' : ''}`}>
          <label className="consent" htmlFor="b-consent">
            <input id="b-consent" name="consent" type="checkbox" required aria-describedby="e-consent" aria-invalid={bad.consent ? true : undefined} />
            <span>{consent}</span>
          </label>
          <p className="consent-links">{legalText.consentLead} <a href={`${import.meta.env.BASE_URL}privacy-policy`} target="_blank" rel="noopener">{legalText.privacyLabel}</a> {legalText.consentAnd} <a href={`${import.meta.env.BASE_URL}terms-and-conditions`} target="_blank" rel="noopener">{legalText.termsLabel}</a>.</p>
          <p className="err" id="e-consent" role={bad.consent ? 'alert' : undefined}>{errors.consent}</p>
        </div>
      </Group>
      <div className="submit-row">
        <button className="btn" type="submit" disabled={status === 'sending'}>{status === 'sending' ? messages.sending : submitLabel}</button>
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
