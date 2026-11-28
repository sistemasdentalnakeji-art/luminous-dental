import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react'
import { Icon, type IconName } from '@/components/Icon'
import { Hours } from '@/components/Hours'
import { SocialLinks } from '@/components/SocialLinks'
import { VegasSign } from '@/components/VegasSign'
import { clinic } from '@/content/clinic'
import { home } from '@/content/home'
import { locationText } from '@/content/location'
import { useLang } from '@/lib/lang'
import { NewTab } from '@/lib/router'

// El mapa (datos del dibujo + tarjeta moneda) carga aparte, solo cuando su lugar está a una pantalla y media de verse; mientras tanto su caja mantiene la altura (.loc-map min-height).
const LocationMapLazy = lazy(() => import('@/components/LocationMap').then((m) => ({ default: m.LocationMap })))

function NearScreen({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [near, setNear] = useState(typeof IntersectionObserver === 'undefined')
  useEffect(() => {
    const el = ref.current
    if (near || !el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setNear(true) }, { rootMargin: '1200px' })
    io.observe(el)
    return () => io.disconnect()
  }, [near])
  return <div className="loc-map" ref={ref}>{near && <Suspense fallback={null}>{children}</Suspense>}</div>
}

function Item({ icon, label, children }: { icon: IconName; label: string; children: ReactNode }) {
  return (
    <li className="contact-item">
      <span className="contact-item__icon" aria-hidden="true"><Icon name={icon} size={22} /></span>
      <div>
        <span className="contact-item__label">{label}</span>
        {children}
      </div>
    </li>
  )
}

/** Dirección, teléfono, correo, horario y redes: la tarjeta de contacto del inicio y la columna de contacto de Contact (r8). */
/** El mapa con carga diferida; `coin={false}` (Contact, r8) lo deja abierto y sin la moneda. */
export function ContactMap({ coin = true }: { coin?: boolean }) {
  return <NearScreen><LocationMapLazy name={clinic.name} coin={coin} /></NearScreen>
}

/** plain (Contact): sin el marco de tarjeta/línea propio, porque ya va dentro de la sección única. */
export function ContactDetails({ plain = false }: { plain?: boolean }) {
  const lang = useLang()
  const { footer } = home[lang]
  const T = locationText[lang]
  return (
    <div className={plain ? "loc-contact ct-details" : "loc-contact loc-card"}>
      <address>
        <ul className="contact-list">
          <Item icon="pin" label={T.addressLabel}>
            <span className="contact-item__value">{T.address}</span>
            <a className="btn btn-ghost loc-btn" href={clinic.mapsUrl} target="_blank" rel="noopener noreferrer">{T.directions}<NewTab /></a>
          </Item>
          <Item icon="phone" label={T.phoneLabel}><a className="contact-item__value" href={footer.phone.href}>{footer.phone.label}</a></Item>
          <Item icon="mail" label={T.emailLabel}><a className="contact-item__value" href={footer.email.href}>{footer.email.label}</a></Item>
          <Item icon="clock" label={T.hoursLabel}><Hours /></Item>
        </ul>
      </address>
      <div className="loc-card__social">
        <span className="contact-item__label">{T.followLabel}</span>
        <SocialLinks />
      </div>
    </div>
  )
}

/** Mismo diseño que el inicio de Dental Nakeji: introducción, tarjeta de mapa que se expande y tarjetas de contacto (en celular: letrero, tarjeta de contacto y al final la ficha del mapa). */
export function ContactLocation() {
  const T = locationText[useLang()]
  return (
    <section className="wrap loc-sec" id="location" aria-labelledby="loc-h">
      <div className="loc-grid">
        <div className="loc-head">
            <h2 className="sr-only" id="loc-h">{T.title}</h2>
            <div className="loc-sign"><VegasSign /></div>
          </div>
        <ContactMap />
        <ContactDetails />
      </div>
    </section>
  )
}
