import { ContactLocation } from '@/components/ContactLocation'
import { Emergency } from '@/components/Emergency'
import { BookVisit } from '@/components/BookVisit'
import { home } from '@/content/home'
import { useLang } from '@/lib/lang'

// Orden (dueña, 26-11): una sola sección arriba (booking a la izquierda, emergencias 24/7 a la derecha, sin tarjetas) → «Visit us» igual que el inicio (letrero, horarios y moneda).
export default function Contact() {
  const { footer } = home[useLang()]
  return (
    <>
      <h1 className="sr-only">{footer.contactHeading}</h1>
      <section className="wrap ct-top" aria-label={footer.contactHeading}>
        <BookVisit bare />
        <Emergency bare />
      </section>
      <ContactLocation />
    </>
  )
}
