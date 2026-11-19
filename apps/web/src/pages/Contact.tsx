import { Appointment } from '@/components/Appointment'
import { clinic } from '@/content/clinic'
import { home } from '@/content/home'

const { footer } = home

export default function Contact() {
  return (
    <>
      <section className="sec wrap pg">
        <h1 className="h2">{footer.contactHeading}</h1>
        <address className="contact-card">
          <p>{footer.address}</p>
          <p><a className="tlink" href={footer.phone.href}>{footer.phone.label}</a></p>
          <p><a className="tlink" href={footer.email.href}>{footer.email.label}</a></p>
          <p><a className="tlink" href={clinic.mapsUrl} rel="noopener">{home.appointment.location.mapLabel}</a></p>
        </address>
      </section>
      <Appointment />
    </>
  )
}
