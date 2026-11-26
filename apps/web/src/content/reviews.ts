// Sección de reseñas de Google (estructura copiada de la home de Dental Nakeji).
// Las 3 citas son reales y se muestran en su idioma original (inglés) también en /es/: no se traducen, porque una reseña son las palabras del paciente
// (el párrafo lleva lang="en"). Públicas en el sitio oficial; el permiso para mostrarlas es POR CONFIRMAR, docs/datos.md. Nombres acortados a nombre + inicial.
// Citadas palabra por palabra (incluido «Dr» sin punto): Ashok Redkar y /about-us/ (Dr Christian, Joshua and Anna...); Ana Bravo y Sandra Paredes (widget de Google de la home).
// NO se muestra a propósito: la calificación de Google ni el conteo (se vieron dos valores distintos: 4.3 / 17 y 4.6 / 51), ni la fecha de cada reseña.
import type { L10n } from '@/lib/lang'

export interface Review {
  author: string
  /** De 1 a 5, como aparece en el widget del sitio oficial. */
  rating: number
  text: string
  /** Idioma de la cita cuando se sabe (las locales están en inglés). */
  lang?: string
  /** «2 weeks ago», solo cuando una fuente en vivo lo da. */
  relativeTime?: string
  authorUrl?: string
  photoUrl?: string
  googleUrl?: string
}

const quotes = [
  { quote: 'Dr Christian, Joshua and Anna have done a great job and made us feel very happy and satisfied.', author: 'Ashok R.' },
  { quote: 'Amazing dental office amazing staff.', author: 'Ana B.' },
  { quote: 'The staff and the specialist is all professional and very friendly.', author: 'Sandra P.' },
]
export const reviewList: Review[] = quotes.map((r) => ({ author: r.author, rating: 5, text: r.quote, lang: 'en' }))

const en = {
  title: 'What our patients say',
  slogan: "Don't just take our word for it. Our patients speak for us.",
  sloganSub: 'Words from our patients on Google.',
  cta: 'See reviews on Google',
  carousel: 'Patient reviews',
  firstRow: 'first row',
  secondRow: 'second row',
  readOnGoogle: 'Read on Google',
  pause: 'Pause patient reviews animation', // NUEVO, para aprobación
  play: 'Play patient reviews animation', // NUEVO, para aprobación
  domain: 'luminousdentallv.com',
  // «See on Google» de cada tarjeta se omite hasta que se confirme el enlace de la clínica en Google (docs/datos.md).
}
const es: typeof en = {
  title: 'Lo que dicen nuestros pacientes',
  slogan: 'No te lo decimos solo nosotros. Nuestros pacientes hablan por nosotros.',
  sloganSub: 'Opiniones de nuestros pacientes en Google.',
  cta: 'Ver reseñas en Google',
  carousel: 'Reseñas de pacientes',
  firstRow: 'primera fila',
  secondRow: 'segunda fila',
  readOnGoogle: 'Leer en Google',
  pause: 'Pausar la animación de reseñas de pacientes',
  play: 'Reproducir la animación de reseñas de pacientes',
  domain: 'luminousdentallv.com',
}
export const reviewsText: L10n<typeof en> = { en, es }
