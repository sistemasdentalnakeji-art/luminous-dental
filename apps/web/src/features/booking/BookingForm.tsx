import { useState, type FormEvent } from 'react'
import { sendAppointment, type AppointmentRequest } from '@/config/booking'
import { clinic, services } from '@/content/clinic'

type Status = 'idle' | 'sending' | 'sent' | 'preview' | 'error'

const field = 'mt-1 block w-full rounded border border-ink/30 bg-paper px-3 py-2 min-h-11'

// Fields mirror the official contact form; the shape is AppointmentRequest in packages/types.
export function BookingForm() {
  const [status, setStatus] = useState<Status>('idle')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    if (data.get('company')) return // honeypot: bots fill hidden fields
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

  return (
    <form onSubmit={onSubmit} className="mt-4 grid gap-4 sm:grid-cols-2">
      <label>First name<input name="firstName" required autoComplete="given-name" className={field} /></label>
      <label>Last name<input name="lastName" required autoComplete="family-name" className={field} /></label>
      <label>Email<input name="email" type="email" required autoComplete="email" className={field} /></label>
      <label>Phone<input name="phone" type="tel" required autoComplete="tel" className={field} /></label>
      <label className="sm:col-span-2">Treatment
        <select name="treatment" required defaultValue="" className={field}>
          <option value="" disabled>Choose a treatment</option>
          {services.map((s) => <option key={s.name}>{s.name}</option>)}
          <option>Not sure yet</option>
        </select>
      </label>
      <label className="sm:col-span-2">Preferred day and time <span className="text-muted">(optional, Las Vegas time)</span>
        <input name="preferredTime" className={field} />
      </label>
      <label className="sm:col-span-2">Your message<textarea name="message" required rows={4} className={field} /></label>
      <label className="hidden" aria-hidden="true">Company<input name="company" tabIndex={-1} autoComplete="off" /></label>
      <label className="flex items-start gap-2 sm:col-span-2">
        <input name="consent" type="checkbox" required className="mt-1 size-5" />
        <span>I agree to be contacted by {clinic.name} about my appointment request.</span>
      </label>
      <p className="text-sm text-muted sm:col-span-2">Please don't include medical history or payment information. Sending a request does not book an appointment; our team will contact you to confirm.</p>
      <button type="submit" disabled={status === 'sending'} className="min-h-11 rounded bg-ink px-5 py-2 font-medium text-paper sm:col-span-2 sm:justify-self-start">
        {status === 'sending' ? 'Sending…' : 'Request appointment'}
      </button>
      <p role="status" aria-live="polite" className="sm:col-span-2">
        {status === 'sent' && 'Thank you! Our team will contact you soon to confirm your appointment.'}
        {status === 'preview' && `Preview only: this form is not connected yet. Please call ${clinic.phone.label} to book.`}
        {status === 'error' && `Something went wrong. Please call ${clinic.phone.label}.`}
      </p>
    </form>
  )
}
