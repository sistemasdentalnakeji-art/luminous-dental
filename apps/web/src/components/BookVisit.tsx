import { Icon } from '@/components/Icon'
import { RevealText } from '@/components/RevealText'
import { clinic } from '@/content/clinic'
import { bookVisitText } from '@/content/bookVisit'
import { useLang } from '@/lib/lang'

const STAR = 'M50 0C54 30 70 46 100 50C70 54 54 70 50 100C46 70 30 54 0 50C30 46 46 30 50 0Z' // la estrella de cuatro puntas del logo
// Estrellitas satélite: centro (x, y) en un plano de 520 y escala de la estrella de 100.
const SATS = [
  { x: 70, y: 130, s: 0.26, d: '0s', t: '5.2s' },
  { x: 455, y: 95, s: 0.18, d: '1.7s', t: '4.4s' },
  { x: 480, y: 370, s: 0.3, d: '.8s', t: '6s' },
  { x: 120, y: 455, s: 0.2, d: '2.6s', t: '4.8s' },
  { x: 400, y: 470, s: 0.12, d: '3.4s', t: '5.6s' },
  { x: 30, y: 330, s: 0.12, d: '1.1s', t: '4.2s' },
]

/**
 * Reserva del inicio (r9, 27-11): una estrella grande, la del logo, con su pequeña constelación a la derecha; título, texto y el botón a la agenda en línea de Adit
 * (clinic.bookingUrl, pestaña nueva con aviso para lector) a la izquierda. Sin campos, sin líneas divisoras ni tarjeta. Estilos .bv* en styles/home-b1.css.
 */
export function BookVisit() {
  const t = bookVisitText[useLang()]
  return (
    <section className="wrap appt-sec" id={t.id} aria-labelledby="appt-h">
      <div className="bv">
        <div className="bv__copy">
          <RevealText className="h2" id="appt-h" accent={t.accent}>{t.heading}</RevealText>
          <p>{t.text}</p>
          <a className="btn bv__book" href={clinic.bookingUrl} target="_blank" rel="noopener noreferrer">{t.cta}<Icon name="arrowRight" size={20} /><span className="sr-only"> {t.newTab}</span></a>
        </div>
        <div className="bv__sky" aria-hidden="true">
          <svg className="bv__star" viewBox="-10 -10 120 120" focusable="false">
            <defs><linearGradient id="bv-star" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff" /><stop offset=".45" stopColor="#8fe3e8" /><stop offset="1" stopColor="#34bfcc" /></linearGradient></defs>
            <path d={STAR} fill="url(#bv-star)" />
          </svg>
          <svg className="bv__sats" viewBox="0 0 520 520" focusable="false">
            {SATS.map((q) => (
              <path key={q.x} className="bv__sat" d={STAR} fill="#cfeeff" transform={`translate(${q.x - 50 * q.s} ${q.y - 50 * q.s}) scale(${q.s})`} style={{ animationDelay: q.d, animationDuration: q.t }} />
            ))}
          </svg>
        </div>
      </div>
    </section>
  )
}
