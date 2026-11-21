import { Appointment } from '@/components/Appointment'
import { ContactLocation } from '@/components/ContactLocation'
import { home } from '@/content/home'

// Mismo letrero, tarjeta de contacto y mapa que el inicio, luego el formulario (sin su propio bloque "Visit us").
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
