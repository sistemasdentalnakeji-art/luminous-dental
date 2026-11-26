// Sección "Google reviews", misma estructura que el inicio de Dental Nakeji (pages/home/sections/Reviews.tsx):
// nombre de Google animado + una ventana estilo navegador con el eslogan, luego dos filas de tarjetas de reseñas que corren en direcciones opuestas.
// El número de calificación, las fechas de las reseñas y el enlace "See on Google" no se muestran hasta que se confirmen (docs/datos.md).
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Marquee } from '@/components/Marquee'
import { Stars } from '@/components/Stars'
import { reviewsSource } from '@/config/reviews'
import { reviewsText, type Review } from '@/content/reviews'
import { ui } from '@/content/ui'
import { useLang } from '@/lib/lang'
import { useMotionPaused } from '@/lib/motion'
import { useGoogleReviews } from '@/lib/useGoogleReviews'

const LETTERS = ['G', 'o', 'o', 'g', 'l', 'e']
const COLORS = ['#4285F4', '#EA4335', '#FBBC05', '#4285F4', '#34A853', '#EA4335']

function GoogleBrand() {
  const ref = useRef<HTMLSpanElement>(null)
  const [play, setPlay] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setPlay(true); obs.disconnect() } }, { threshold: 0.6 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <span ref={ref} className={`google-brand${play ? ' google-brand--play' : ''}`} aria-hidden="true">
      {LETTERS.map((l, i) => <span key={i} className="google-brand__letter" style={{ '--i': i, '--gc': COLORS[i] } as CSSProperties}>{l}</span>)}
    </span>
  )
}

/** La "G" oficial de Google en sus cuatro colores. */
function GoogleG({ size }: { size: number }) {
  return (
    <svg className="google-g" width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  )
}

// Colores del avatar sin foto (como Google): blanco sobre cada uno >= 4.5:1; el color sale del nombre, así no cambia en cada carga.
const AVATAR_COLORS = ['#1a73e8', '#c5221f', '#188038', '#b3470a', '#8430ce', '#c2185b', '#00796b', '#5f6368']
const avatarColor = (name: string) => AVATAR_COLORS[[...name.trim().toLowerCase()].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7) % AVATAR_COLORS.length]

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const T = reviewsText[useLang()]
  return (
    <article className="review-card" style={{ '--i': index } as CSSProperties}>
      <div className="review-card__top"><GoogleG size={22} /></div>
      <div className="review-card__author">
        {review.photoUrl ? (
          <img className="review-card__avatar" src={review.photoUrl} width={48} height={48} alt="" loading="lazy" referrerPolicy="no-referrer" />
        ) : (
          <span className="review-card__avatar" style={{ background: avatarColor(review.author) }} aria-hidden="true">{review.author.trim().charAt(0).toUpperCase()}</span>
        )}
        <div className="review-card__who">
          <h3 className="review-card__name">{review.authorUrl ? <a href={review.authorUrl} target="_blank" rel="noopener noreferrer">{review.author}</a> : review.author}</h3>
          <Stars rating={review.rating} size={14} />
          {review.relativeTime && <p className="review-card__time">{review.relativeTime}</p>}
        </div>
      </div>
      <p className="review-card__text" lang={review.lang}>{review.text}</p>
      {review.googleUrl && <a className="review-card__more" href={review.googleUrl} target="_blank" rel="noopener noreferrer">{T.readOnGoogle}</a>}
    </article>
  )
}

export function Reviews() {
  const lang = useLang()
  const T = reviewsText[lang]
  const reviews = useGoogleReviews().slice(0, 8)
  const [paused, setPaused] = useState(false)
  const allPaused = useMotionPaused()
  const stopped = paused || allPaused
  const cards = reviews.map((r, i) => <ReviewCard key={`${r.author}-${i}`} review={r} index={i} />)
  // La segunda fila empieza en otra tarjeta para que, con pocas reseñas, las dos filas no se vean iguales.
  const shift = Math.ceil(cards.length / 2)
  const bottom = [...cards.slice(shift), ...cards.slice(0, shift)]
  return (
    <section className="reviews" aria-labelledby="reviews-h">
      <div className="wrap">
        <div className="reviews-intro">
          <div className="reviews-intro__google">
            <GoogleBrand />
            <h2 id="reviews-h" className="sr-only">{T.title}</h2>
          </div>
          <div className="mac-window">
            <div className="mac-window__bar">
              <span className="mac-window__dots" aria-hidden="true"><i /><i /><i /></span>
              <span className="mac-window__url">{T.domain}</span>
            </div>
            <div className="mac-window__body">
              <div className="mac-window__scene">
                <p className="mac-window__slogan">{T.slogan}</p>
                <p className="mac-window__sub">{T.sloganSub}</p>
                {/* Botón dorado y cursor animado que lo «presiona» (como en Dental Nakeji); el cursor es decorativo. */}
                <div className="mac-window__action">
                  <a className="mac-window__btn" href={reviewsSource.profileUrl} target="_blank" rel="noopener noreferrer">
                    {T.cta}<span className="sr-only"> {ui[lang].opensNewTab}</span>
                  </a>
                  <svg className="mac-window__cursor" width="26" height="26" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M5 3l14 7-6 2-2 6z" fill="#fff" stroke="#0b1220" strokeWidth="1.4" strokeLinejoin="round" />
                  </svg>
                </div>
                {/* Cinco estrellas que se llenan de dorado (como en Dental Nakeji); es decorativo, no es una calificación. */}
                <div className="mac-window__stars" aria-hidden="true">
                  <Stars rating={0} size={26} />
                  <span className="mac-window__stars-fill"><Stars rating={5} size={26} /></span>
                </div>
              </div>
              <img className="mac-window__brand" src={`${import.meta.env.BASE_URL}logo.webp`} width={520} height={297} alt="" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
      <div className="wrap reviews-pause">
        <button type="button" className="pause-btn" aria-label={paused ? T.play : T.pause} onClick={() => setPaused((p) => !p)}>
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d={paused ? 'M6 3l11 7-11 7z' : 'M5 3h3.4v14H5zM11.6 3H15v14h-3.4z'} />
          </svg>
        </button>
      </div>
      <div className="reviews-rows">
        <Marquee label={`${T.carousel}, ${T.firstRow}`} items={cards} direction="ltr" secondsPerCard={22} paused={stopped} />
        {/* Siempre dos filas (pedido de la dueña, 23-11-2026). Con pocas reseñas reales se repiten, empezando en otra tarjeta; no se inventan reseñas. */}
        {/* Misma lista repetida: se oculta a lectores de pantalla y al teclado para que no se oigan 6 tarjetas. */}
        <div style={{ display: 'contents' }} aria-hidden="true" inert>
          <Marquee label={`${T.carousel}, ${T.secondRow}`} items={bottom} direction="rtl" secondsPerCard={26} paused={stopped} />
        </div>
      </div>
    </section>
  )
}
