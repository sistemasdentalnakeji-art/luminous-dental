/**
 * Where live Google reviews come from. null = use the short list in content/reviews.ts.
 * To connect (Jadro): a server endpoint (the Google key must stay on the server) that answers { reviews: Review[] }
 * with author, rating, text and relativeTime; put its address here. See docs/datos.md.
 */
export const reviewsSource = {
  endpoint: null as string | null,
  profileUrl: null as string | null, // the clinic's Google listing link, POR CONFIRMAR
}

