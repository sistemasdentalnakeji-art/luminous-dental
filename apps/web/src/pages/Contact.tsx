import { ContactMap } from '@/components/ContactLocation'
import { Hours } from '@/components/Hours'
import { Icon } from '@/components/Icon'
import { RevealText } from '@/components/RevealText'
import { SocialLinks } from '@/components/SocialLinks'
import { clinic, clinicText } from '@/content/clinic'
import { bookVisitText } from '@/content/bookVisit'
import { home } from '@/content/home'
import { terms } from '@/content/legal'
import { locationText } from '@/content/location'
import RollCounter from '@/components/RollCounter'
import { useMotionPaused } from '@/lib/motion'
import { useLang } from '@/lib/lang'
import { useEffect, useState } from 'react'
import { NewTab } from '@/lib/router'
import '@/styles/contact-lines.css'

// Foto: la recepción es real de la clínica (blog/*, de luminousdentallv.com).
const photos = {
  en: { desk: 'The reception desk at Luminous Dental, with the clinic sign on a white tiled wall.' },
  es: { desk: 'La recepción de Luminous Dental, con el letrero de la clínica sobre una pared blanca de azulejos.' },
}

// Letrero «24/7» (r11): dos contadores de dígitos que ruedan (RollCounter, de React Bits) en celdas oscuras con luz roja; al verse ruedan una vez y cada 7 s dan otra vuelta. Quieto con movimiento reducido y en pausa.
function RollSign() {
  const paused = useMotionPaused()
  const [turn, setTurn] = useState(0)
  useEffect(() => {
    if (paused) return
    const id = window.setInterval(() => setTurn((t) => t + 1), 7000)
    return () => window.clearInterval(id)
  }, [paused])
  const props = { fontSize: '1em', fontWeight: 800, textColor: 'var(--ct-red)', duration: 1.1, bounce: 0.18, stagger: 0.12, fade: 0, spin: turn, tabular: true } as const
  return (
    <span className="ct-sign" aria-hidden="true">
      <RollCounter value={24} {...props} className="ct-sign__n" />
      <span className="ct-sign__slash" />
      <RollCounter value={7} {...props} className="ct-sign__n" />
    </span>
  )
}

// Ronda 11e (27-11): héroe centrado: título, letrero «24/7», texto y llamar; señales, aviso de 911 (legal.ts) y dirección;
// debajo UNA sola sección: foto de la recepción | cita (botón a la agenda en línea, sin campos) y dirección, teléfono, correo y horario; el mapa con su moneda (r9) cierra la columna de la foto.
export default function Contact() {
  const lang = useLang()
  const { footer } = home[lang]
  const em = clinicText[lang].emergency
  const bv = bookVisitText[lang]
  const T = locationText[lang]
  const P = photos[lang]
  const title = em.title.replace('24/7', '').trim().replace(/^./, (c) => c.toUpperCase()) // «Dental emergencies» / «Emergencias dentales»: el texto de siempre, sin el «24/7» (va en el letrero)
  // Segunda frase del aviso de emergencias de los Términos (911 / sala de emergencias); la primera repite el teléfono.
  const safety = String(terms[lang].sections.find((x) => x.id === 'info')?.blocks[1] ?? '').split(/(?<=\.) /).slice(1).join(' ')
  return (
    <div className="contact lines">
      <section className="wrap ct-hero" id="emergencies" aria-labelledby="emg-h">
        <div className="ct-hero__top">
          <h1 id="emg-h" className="ct-title">
            <span className="ct-title__text">{title}</span>
            <RollSign />
            <span className="sr-only"> 24/7</span>
          </h1>
          <div className="ct-hero__copy">
            <p className="ct-lead">{em.text}</p>
            <p className="ct-calllabel">{em.callLabel}</p>
            <a className="btn ct-call" href={clinic.phone.href}><Icon name="phone" size={26} /><span className="nw">{clinic.phone.label}</span><span className="sr-only"> {em.cta}</span></a>
          </div>
        </div>
        <div className="ct-signs">
          <h2>{em.examplesTitle}</h2>
          <ul>{em.examples.map((e) => <li key={e}><Icon name="check" size={18} />{e}</li>)}</ul>
        </div>
        <p className="ct-safety">{safety}</p>
        <p className="ct-where"><Icon name="pin" size={18} />{T.address}</p>
      </section>

      <section className="wrap" id={bv.id} aria-label={footer.contactHeading}>
        <div className="ct-visit">
          <div className="ct-side">
            <figure className="ct-photo ct-photo--desk">
              <img src="/images/blog/reception-1280.webp" srcSet="/images/blog/reception-640.webp 640w, /images/blog/reception-1280.webp 1280w" sizes="(max-width:900px) 92vw, 38vw" width="1280" height="1162" alt={P.desk} loading="lazy" decoding="async" />
            </figure>
            <div className="ct-map"><ContactMap /></div>
          </div>
          <div className="ct-main">
            <div className="ct-book">
              <RevealText className="h2" id="appt-h" accent={bv.accent}>{bv.heading}</RevealText>
              <p>{bv.text}</p>
              <a className="btn ct-book__btn" href={clinic.bookingUrl} target="_blank" rel="noopener noreferrer">{bv.cta}<Icon name="arrowRight" size={20} /><span className="sr-only"> {bv.newTab}</span></a>
            </div>
            <address className="ct-ledger">
              <div className="ct-row">
                <span className="ct-k"><Icon name="pin" size={20} />{T.addressLabel}</span>
                <div className="ct-v">
                  <span>{T.address}</span>
                  <a className="ct-link" href={clinic.mapsUrl} target="_blank" rel="noopener noreferrer">{T.directions}<Icon name="arrowRight" size={16} /><NewTab /></a>
                </div>
              </div>
              <div className="ct-row">
                <span className="ct-k"><Icon name="phone" size={20} />{T.phoneLabel}</span>
                <div className="ct-v"><a className="ct-link ct-link--big" href={footer.phone.href}>{footer.phone.label}</a></div>
              </div>
              <div className="ct-row">
                <span className="ct-k"><Icon name="mail" size={20} />{T.emailLabel}</span>
                <div className="ct-v"><a className="ct-link ct-link--big" href={footer.email.href}>{footer.email.label}</a></div>
              </div>
              <div className="ct-row ct-row--hours">
                <span className="ct-k"><Icon name="clock" size={20} />{T.hoursLabel}</span>
                <div className="ct-v"><Hours /></div>
              </div>
              <div className="ct-row ct-row--social">
                <span className="ct-k">{T.followLabel}</span>
                <div className="ct-v"><SocialLinks /></div>
              </div>
            </address>
          </div>
        </div>
      </section>
    </div>
  )
}
