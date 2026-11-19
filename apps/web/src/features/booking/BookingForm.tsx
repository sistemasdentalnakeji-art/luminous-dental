import { useRef, useState, type FormEvent, type ReactNode } from 'react'
import { sendAppointment, type AppointmentRequest } from '@/config/booking'
import { services } from '@/content/clinic'
import { home } from '@/content/home'

type Status = 'idle' | 'sending' | 'sent' | 'preview' | 'error'

const { submitLabel, consent, messages, errors } = home.appointment
const phone = home.footer.phone

// Fields mirror the official contact form; the shape is AppointmentRequest in packages/types.
export function BookingForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [bad, setBad] = useState<Record<string, boolean>>({})
  const form = useRef<HTMLFormElement>(null)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const el = e.currentTarget
    const data = new FormData(el)
    if (data.get('company')) return // honeypot: bots fill hidden fields
    const invalid = [...el.querySelectorAll<HTMLInputElement>('[required]')].filter((i) => !i.checkValidity())
    setBad(Object.fromEntries(invalid.map((i) => [i.name, true])))
    if (invalid.length) {
      setStatus('idle')
      invalid[0].focus()
      return
    }
    const s = (k: string) => String(data.get(k) ?? '').trim()
    const request: AppointmentRequest = {
      firstName: s('firstName'),
      lastName: s('lastName'),
      email: s('email'),
      phone: s('phone'),
      treatment: s('treatment'),
      message: s('message'),
      preferredTime: s('preferredTime') || undefined,
      consent: data.get('consent') === 'on',
      source: 'website',
    }
    setStatus('sending')
    try {
      setStatus(await sendAppointment(request))
    } catch {
      setStatus('error')
    }
  }

  // One field: label, control, and its own message linked with aria-describedby.
  const field = (name: keyof typeof errors, label: string, control: (p: object) => ReactNode, wide = false) => (
    <div className={`f${wide ? ' w2' : ''}${bad[name] ? ' bad' : ''}`}>
      <label htmlFor={`b-${name}`}>{label}</label>
      {control({ id: `b-${name}`, name, required: true, 'aria-describedby': `e-${name}`, 'aria-invalid': bad[name] ? true : undefined })}
      <p className="err" id={`e-${name}`}>{errors[name]}</p>
    </div>
  )

  return (
    <form ref={form} onSubmit={onSubmit} noValidate>
      <div className="fields">
        {field('firstName', 'First name', (p) => <input type="text" autoComplete="given-name" {...p} />)}
        {field('lastName', 'Last name', (p) => <input type="text" autoComplete="family-name" {...p} />)}
        {field('phone', 'Phone', (p) => <input type="tel" autoComplete="tel" {...p} />)}
        {field('email', 'Email', (p) => <input type="email" autoComplete="email" {...p} />)}
        {field('treatment', 'What do you need?', (p) => (
          <select defaultValue="" {...p}>
            <option value="" disabled>Choose a treatment</option>
            {services.map((s) => <option key={s.name}>{s.name}</option>)}
            <option>Not sure yet</option>
          </select>
        ), true)}
        <div className="f w2">
          <label htmlFor="b-preferredTime">Preferred day and time (optional, Las Vegas time)</label>
          <input id="b-preferredTime" name="preferredTime" type="text" />
        </div>
        <div className="f w2">
          <label htmlFor="b-message">Anything else we should know</label>
          <textarea id="b-message" name="message" rows={3} />
          <p className="hint">Please don’t include medical history or payment information.</p>
        </div>
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
        <button className="btn" type="submit" disabled={status === 'sending'}>{status === 'sending' ? messages.sending : submitLabel}</button>
        <a className="tlink" href={phone.href}>{phone.label}</a>
      </div>
      <div role="status" aria-live="polite">
        {Object.keys(bad).length > 0 && status === 'idle' && <p className="status">{messages.missingFields}</p>}
        {status === 'sent' && <p className="status">{messages.success}</p>}
        {status === 'preview' && <p className="status">{messages.preview}</p>}
        {status === 'error' && <p className="status">{messages.error}</p>}
      </div>
    </form>
  )
}
