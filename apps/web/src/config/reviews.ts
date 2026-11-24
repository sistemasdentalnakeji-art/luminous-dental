/**
 * De dónde vienen las reseñas de Google en vivo. null = usar la lista corta de content/reviews.ts.
 * Para conectar (Jadro): un endpoint de servidor (la llave de Google debe quedarse en el servidor) que responda { reviews: Review[] }
 * con author, rating, text y relativeTime; pon su dirección aquí. Ver docs/datos.md.
 */
export const reviewsSource = {
  endpoint: null as string | null,
  // Ficha de la clínica en Google (verificada); la usa el botón «See reviews on Google».
  profileUrl: 'https://www.google.com/maps/search/?api=1&query=Luminous+Dental+1212+S+Maryland+Pkwy+Las+Vegas+NV',
}

