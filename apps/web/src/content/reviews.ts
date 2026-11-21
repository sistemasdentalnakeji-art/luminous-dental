// Sección de reseñas de Google (estructura copiada de la home de Dental Nakeji). Solo en inglés.
// Reseñas: las 3 citas reales de home.ts (públicas en el sitio oficial; el permiso para mostrarlas es POR CONFIRMAR, docs/datos.md).
// NO se muestra a propósito: la calificación de Google ni el conteo (se vieron dos valores distintos: 4.3 / 17 y 4.6 / 51), ni la fecha de cada reseña.
import { home } from '@/content/home'

export interface Review {
  author: string
  /** De 1 a 5, como aparece en el widget del sitio oficial. */
  rating: number
  text: string
  /** «2 weeks ago», solo cuando una fuente en vivo lo da. */
  relativeTime?: string
  authorUrl?: string
  photoUrl?: string
  googleUrl?: string
}

export const reviewList: Review[] = home.reviews.items.map((r) => ({ author: r.author, rating: 5, text: r.quote }))

export const reviewsText = {
  title: 'What our patients say',
  slogan: "Don't just take our word for it. Our patients speak for us.",
  sloganSub: 'Words from our patients on Google.',
  carousel: 'Patient reviews',
  pause: 'Pause patient reviews animation', // NUEVO, para aprobación
  play: 'Play patient reviews animation', // NUEVO, para aprobación
  domain: 'luminousdentallv.com',
  // «See on Google» se omite hasta que se confirme el enlace de la clínica en Google (docs/datos.md).
}
