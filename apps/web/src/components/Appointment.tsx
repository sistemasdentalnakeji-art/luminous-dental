import { useState, type FormEvent } from 'react'
import { RevealText } from '@/components/RevealText'
import { MAX, NAME_JUNK, checkAppointment, formatPhone } from '@/config/booking'
import { clinic } from '@/content/clinic'
import { home } from '@/content/home'

const { heading, location, messages } = home.appointment
const ORDER = ['firstName', 'phone', 'email']

/**
 * PROVISIONAL (dueña, 23-11-2026): contacto rápido que NO envía nada a ningún lado.
 * Valida con las mismas reglas de config/booking.ts. El formulario completo (features/booking) sigue en el proyecto, sin usarse.
 */
function QuickContact() {
  const [bad, setBad] = useState<Record<string, string>>({})
  const [done, setDone] = useState(false)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const el = e.currentTarget
    const d = new FormData(el)
    const name = String(d.get('firstName') ?? '')
    // checkAppointment pide más campos: se le da el nombre en ambos y solo se miran estos tres.
    const { errors } = checkAppointment({ firstName: name, lastName: name, phone: String(d.get('phone') ?? ''), email: String(d.get('email') ?? ''), treatment: '', message: '', preferredDate: '', preferredTime: '', consent: true, source: 'website' })
    const found = Object.fromEntries(ORDER.filter((k) => k in errors).map((k) => [k, errors[k as keyof typeof errors] as string]))
    setBad(found)
    setDone(Object.keys(found).length === 0)
    const first = ORDER.find((k) => k in found)
    if (first) el.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
  }

  const field = (name: string, label: string, props: object) => (
    <div className={`f${name === 'email' ? ' w2' : ''}${bad[name] ? ' bad' : ''}`}>
      <label htmlFor={`q-${name}`}>{label}</label>
      <input id={`q-${name}`} name={name} required maxLength={MAX[name as keyof typeof MAX]} aria-describedby={`qe-${name}`} aria-invalid={bad[name] ? true : undefined} {...props} />
      <p className="err" id={`qe-${name}`} role={bad[name] ? 'alert' : undefined}>{bad[name]}</p>
    </div>
  )

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="fields">
        {field('firstName', 'First name', { type: 'text', autoComplete: 'given-name', placeholder: 'Your first name', onInput: (e: FormEvent<HTMLInputElement>) => { e.currentTarget.value = e.currentTarget.value.replace(NAME_JUNK, '') } })}
        {field('phone', 'Phone', { type: 'tel', inputMode: 'tel', autoComplete: 'tel-national', placeholder: '(000) 000-0000', onInput: (e: FormEvent<HTMLInputElement>) => { e.currentTarget.value = formatPhone(e.currentTarget.value) } })}
        {field('email', 'Email', { type: 'email', autoComplete: 'email', placeholder: 'you@example.com' })}
      </div>
      <div className="submit-row">
        <button className="btn" type="submit">{home.appointment.submitLabel}</button>
      </div>
      <div role="status" aria-live="polite">
        {Object.keys(bad).length > 0 && <p className="status">{messages.missingFields}</p>}
        {done && <p className="status">{messages.preview}</p>}
      </div>
    </form>
  )
}

/** `hideVisit`: omite el bloque de la dirección, para la página que ya lo muestra (Contact). */
export function Appointment({ hideVisit = false }: { hideVisit?: boolean }) {
  return (
    <section className="wrap appt-sec" id={home.appointment.id} aria-labelledby="appt-h">
      <div className="appt">
        <div className="appt-l">
          <RevealText className="h2" id="appt-h">{heading}</RevealText>
          {!hideVisit && (
            <div className="visit">
              <h3>{location.heading}</h3>
              <address>{location.address}</address>
              <a className="tlink" href={clinic.mapsUrl} target="_blank" rel="noopener noreferrer">{location.mapLabel}</a>
            </div>
          )}
        </div>
        <div className="formbox"><QuickContact /></div>
      </div>
    </section>
  )
}
