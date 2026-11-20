import { Appointment } from '@/components/Appointment'
import { ContactLocation } from '@/components/ContactLocation'
import { home } from '@/content/home'

// Same sign, contact card and map as the home page, then the form (without its own "Visit us" block).
export default function Contact() {
  return (
    <>
      <section className="sec wrap pg">
        <h1 className="h2">{home.footer.contactHeading}</h1>
      </section>
      <ContactLocation />
      <Appointment hideVisit />
    </>
  )
}
