// Google reviews section (structure copied from Dental Nakeji's home). English only.
// Reviews: the 3 real quotes of home.ts (public on the official site; permission to show them is POR CONFIRMAR, docs/datos.md).
// NOT shown on purpose: the Google rating number and the count (two different values were seen: 4.3 / 17 and 4.6 / 51), and the date of each review.
import { home } from '@/content/home'

export interface Review {
  author: string
  /** 1 to 5, as written on the official site's widget. */
  rating: number
  text: string
  /** "2 weeks ago", only when a live source provides it. */
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
  pause: 'Pause patient reviews animation', // NEW, for approval
  play: 'Play patient reviews animation', // NEW, for approval
  domain: 'luminousdentallv.com',
  // "See on Google" is left out until the clinic's Google listing link is confirmed (docs/datos.md).
}
