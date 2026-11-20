import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react'
import { Icon, type IconName } from '@/components/Icon'
import { SocialLinks } from '@/components/SocialLinks'
import { VegasSign } from '@/components/VegasSign'
import { clinic } from '@/content/clinic'
import { home } from '@/content/home'
import { locationText as T } from '@/content/location'

// The map (drawing data + coin card) loads apart, only once its place is about a screen and a half from view; its box keeps its height meanwhile (.loc-map min-height).
const LocationMap = lazy(() => import('@/components/LocationMap').then((m) => ({ default: m.LocationMap })))

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

/** Same layout as Dental Nakeji's home: intro, expanding map card and contact cards (on a phone the map sits between the text and the contacts). */
export function ContactLocation() {
  const { footer } = home
  return (
    <section className="wrap loc-sec" id="location" aria-labelledby="loc-h">
      <div className="loc-grid">
        <div className="loc-head">
          <h2 className="sr-only" id="loc-h">{T.title}</h2>
          <div className="loc-sign"><VegasSign /></div>
        </div>
        <NearScreen><LocationMap name={clinic.name} /></NearScreen>
        <div className="loc-contact loc-card">
          <address>
            <ul className="contact-list">
              <Item icon="pin" label={T.addressLabel}>
                <span className="contact-item__value">{T.address}</span>
                <a className="btn btn-ghost loc-btn" href={clinic.mapsUrl} target="_blank" rel="noopener noreferrer">{T.directions}</a>
              </Item>
              <Item icon="phone" label={T.phoneLabel}><a className="contact-item__value" href={footer.phone.href}>{footer.phone.label}</a></Item>
              <Item icon="mail" label={T.emailLabel}><a className="contact-item__value" href={footer.email.href}>{footer.email.label}</a></Item>
            </ul>
          </address>
          <div className="loc-card__social">
            <span className="contact-item__label">{T.followLabel}</span>
            <SocialLinks />
          </div>
        </div>
      </div>
    </section>
  )
}
