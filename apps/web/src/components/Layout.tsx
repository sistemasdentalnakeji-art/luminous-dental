import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Backdrop } from '@/components/Backdrop'
import { Logo } from '@/components/Logo'
import { clinic, serviceHref, services } from '@/content/clinic'
import { home } from '@/content/home'
import { Link } from '@/lib/router'

const { header, footer } = home

const Ridge = ({ d1, d2, d3 }: { d1: string; d2: string; d3: string }) => (
  <svg className="ftr-ridge" viewBox="0 30 1440 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
    <path className="ridge-far" style={{ stroke: 'none' }} d={d1} />
    <path className="ridge-line" d={d2} />
    <path className="ridge-near" d={d3} />
  </svg>
)

const current = (href: string, path: string) => (href === path ? 'page' : undefined)

/** "Services" in the main menu: a button that opens a panel with every service (disclosure pattern, like Dental Nakeji). */
function ServicesMenu({ label, href, path }: { label: string; href: string; path: string }) {
  const [open, setOpen] = useState(false)
  const box = useRef<HTMLDivElement>(null)
  useEffect(() => setOpen(false), [path])
  useEffect(() => {
    if (!open) return
    const outside = (e: Event) => { if (!box.current?.contains(e.target as Node)) setOpen(false) }
    const esc = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      box.current?.querySelector('button')?.focus()
    }
    addEventListener('pointerdown', outside)
    addEventListener('focusin', outside)
    addEventListener('keydown', esc)
    return () => {
      removeEventListener('pointerdown', outside)
      removeEventListener('focusin', outside)
      removeEventListener('keydown', esc)
    }
  }, [open])
  return (
    <div className="dd" ref={box}>
      <button type="button" className="dd-btn" aria-expanded={open} aria-controls="dd-services" aria-current={path === href ? 'page' : undefined} onClick={() => setOpen(!open)}>
        {label}
        <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5" /></svg>
      </button>
      <div className="dd-panel" id="dd-services" hidden={!open} onClick={(e) => { if ((e.target as Element).closest('a')) setOpen(false) }}>
        <ul>{services.map((s) => <li key={s.name}><Link href={serviceHref(s.name)}>{s.name}</Link></li>)}</ul>
        <Link className="dd-all" href={href}>{header.servicesOverview} →</Link>
      </div>
    </div>
  )
}

export function Layout({ path, children }: { path: string; children: ReactNode }) {
  const main = useRef<HTMLElement>(null)
  const first = useRef(true)
  useEffect(() => {
    if (first.current) first.current = false
    else main.current?.focus({ preventScroll: true }) // after a page change, keyboard and screen-reader users start at the new content
  }, [path])
  const nav = header.nav.map((n) =>
    'menu' in n ? (
      <ServicesMenu key={n.href} label={n.label} href={n.href} path={path} />
    ) : (
      <Link key={n.href} href={n.href} aria-current={current(n.href, path)}>{n.label}</Link>
    ),
  )
  const mobileNav = header.nav.map((n) =>
    'menu' in n ? (
      <details className="menu-sub" key={n.href}>
        <summary>{n.label}</summary>
        {services.map((s) => <Link key={s.name} href={serviceHref(s.name)}>{s.name}</Link>)}
        <Link href={n.href}>{header.servicesOverview}</Link>
      </details>
    ) : (
      <Link key={n.href} href={n.href} aria-current={current(n.href, path)}>{n.label}</Link>
    ),
  )
  return (
    <div className="page">
      <Backdrop />
      <div className="layer">
        <a className="skip" href="#main">{header.skipLink}</a>
        <header className="wrap hbar">
          <div className="hdr">
            <Logo />
            <nav className="nav" aria-label="Main">{nav}</nav>
            <div className="hdr-r">
              <a className="hdr-phone" href={header.phone.href} aria-label={header.phone.label}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>
              </a>
              <Link className="btn" href="#appointment">{header.cta.label}</Link>
            </div>
            <details className="menu" key={path}>
              <summary aria-label="Menu">Menu</summary>
              <nav aria-label="Main mobile">
                <a href="#appointment" style={{ color: 'var(--color-sky)', fontWeight: 700 }}>{header.cta.label}</a>
                {mobileNav}
                <a href={header.phone.href}>{header.phone.label}</a>
              </nav>
            </details>
          </div>
        </header>
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
              <ul>{footer.links.map((l) => <li key={l.href}><Link href={l.href} aria-current={current(l.href, path)}>{l.label}</Link></li>)}</ul>
            </nav>
            <div>
              <h2>{footer.contactHeading}</h2>
              <address>
                <a href={clinic.mapsUrl} target="_blank" rel="noopener">{footer.address}</a>
                <a href={footer.phone.href}>{footer.phone.label}</a>
                <a href={footer.email.href}>{footer.email.label}</a>
              </address>
            </div>
          </div>
          <div className="wrap ftr-legal">
            <span>© {new Date().getFullYear()} {footer.legal}</span>
            <ul className="ftr-social" aria-label="Social media">
              {footer.social.map((s) => <li key={s.href}><a href={s.href} target="_blank" rel="noopener">{s.label}</a></li>)}
            </ul>
            <span>{footer.note}</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
