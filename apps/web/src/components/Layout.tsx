import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Backdrop } from '@/components/Backdrop'
import { Header } from '@/components/Header'
import { Logo } from '@/components/Logo'
import { clinic, serviceHref } from '@/content/clinic'
import { home } from '@/content/home'
import { setMotionPaused, useMotionPaused } from '@/lib/motion'
import { Link } from '@/lib/router'

const { header, footer } = home
const year = new Date().getFullYear()

const Ridge = ({ d1, d2, d3 }: { d1: string; d2: string; d3: string }) => (
  <svg className="ftr-ridge" viewBox="0 30 1440 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
    <path className="ridge-far" style={{ stroke: 'none' }} d={d1} />
    <path className="ridge-line" d={d2} />
    <path className="ridge-near" d={d3} />
  </svg>
)

/** Phone only (docs/mejoras-1-plan.md 2.1): call and request buttons stay at hand after the first screen, and hide while the form is in view. */
function ActionBar({ appointmentHref }: { appointmentHref: string }) {
  const [past, setPast] = useState(false)
  const [formInView, setFormInView] = useState(false)
  useEffect(() => {
    const onScroll = () => setPast(scrollY > 600)
    onScroll()
    addEventListener('scroll', onScroll, { passive: true })
    const form = document.getElementById('appointment')
    const observer = new IntersectionObserver(([e]) => setFormInView(e.isIntersecting))
    if (form) observer.observe(form)
    return () => { removeEventListener('scroll', onScroll); observer.disconnect() }
  }, [])
  const hidden = !past || formInView
  return (
    <div className="actionbar" hidden={hidden}>
      <a className="btn btn-ghost" href={clinic.phone.href}>Call or text</a>
      <a className="btn" href={appointmentHref}>{header.cta.label}</a>
    </div>
  )
}

const current = (href: string, path: string) => (href === path ? 'page' : undefined)

export function Layout({ path, appointmentHref, children }: { path: string; appointmentHref: string; children: ReactNode }) {
  const main = useRef<HTMLElement>(null)
  const shown = useRef(path)
  const motionPaused = useMotionPaused()
  useEffect(() => {
    if (shown.current === path) return // first load: leave the focus at the top of the page
    shown.current = path
    main.current?.focus({ preventScroll: true }) // after a page change, keyboard and screen-reader users start at the new content
  }, [path])
  return (
    <div className="page">
      <Backdrop />
      <div className="layer">
        <a className="skip" href="#main" onClick={(e) => { e.preventDefault(); main.current?.focus() }}>{header.skipLink}</a>
        <Header path={path} appointmentHref={appointmentHref} />
        <main id="main" ref={main} tabIndex={-1}>{children}</main>
        <Ridge
          d1="M0 80 L90 58 L190 78 L300 44 L400 72 L520 36 L620 66 L730 50 L840 84 L950 42 L1050 72 L1150 38 L1250 70 L1350 52 L1440 76 L1440 130 L0 130Z"
          d2="M0 80 L90 58 L190 78 L300 44 L400 72 L520 36 L620 66 L730 50 L840 84 L950 42 L1050 72 L1150 38 L1250 70 L1350 52 L1440 76"
          d3="M0 108 L140 90 L260 106 L380 86 L500 108 L640 92 L760 110 L900 88 L1030 106 L1160 90 L1290 108 L1440 94 L1440 130 L0 130Z"
        />
        {/* Footer laid out like Dental Nakeji: brand, link columns, contact, then a bottom line. */}
        <footer className="ftr">
          <div className="wrap ftr-grid">
            <div className="ftr-brand">
              <Logo large />
              <p>{footer.tagline}</p>
            </div>
            <nav aria-labelledby="ftr-services">
              <h2 id="ftr-services">{footer.servicesHeading}</h2>
              <ul>
                {footer.services.map((name) => <li key={name}><Link href={serviceHref(name)}>{name}</Link></li>)}
                <li><Link href="/services">{header.servicesOverview}</Link></li>
              </ul>
            </nav>
            <nav aria-labelledby="ftr-clinic">
              <h2 id="ftr-clinic">{footer.clinicHeading}</h2>
              <ul>{footer.links.map((l) => <li key={l.href}><Link href={l.href === '#appointment' ? appointmentHref : l.href} aria-current={current(l.href, path)}>{l.label}</Link></li>)}</ul>
            </nav>
            <div>
              <h2>{footer.contactHeading}</h2>
              <address>
                <a href={clinic.mapsUrl} target="_blank" rel="noopener noreferrer">{footer.address}</a>
                <a href={footer.phone.href}>{footer.phone.label}</a>
                <a href={footer.email.href}>{footer.email.label}</a>
              </address>
            </div>
          </div>
          <div className="wrap ftr-legal">
            <span>© {year} {footer.legal}</span>
            <ul className="ftr-social" aria-label="Social media">
              {footer.social.map((s) => <li key={s.href}><a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a></li>)}
            </ul>
            <span>{footer.note}</span>
            <button type="button" className="motion-toggle" onClick={() => setMotionPaused(!motionPaused)}>{motionPaused ? footer.motion.play : footer.motion.pause}</button>
          </div>
        </footer>
        <ActionBar appointmentHref={appointmentHref} />
      </div>
    </div>
  )
}
