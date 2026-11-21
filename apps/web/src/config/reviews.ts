/**
 * De dónde vienen las reseñas de Google en vivo. null = usar la lista corta de content/reviews.ts.
 * Para conectar (Jadro): un endpoint de servidor (la llave de Google debe quedarse en el servidor) que responda { reviews: Review[] }
 * con author, rating, text y relativeTime; pon su dirección aquí. Ver docs/datos.md.
 */
export const reviewsSource = {
  endpoint: null as string | null,
  profileUrl: null as string | null, // el enlace de la clínica en Google, POR CONFIRMAR
}

