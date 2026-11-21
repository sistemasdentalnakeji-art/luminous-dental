import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Backdrop } from '@/components/Backdrop'
import { BrandIcon } from '@/components/BrandIcon'
import { Header } from '@/components/Header'
import { Icon } from '@/components/Icon'
import { FloatingContact } from '@/components/FloatingContact'
import { WhatsAppLink } from '@/components/WhatsAppLink'
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

/** Solo celular (docs/mejoras-1-plan.md 2.1): los botones de llamar y pedir cita quedan a la mano después de la primera pantalla y se ocultan mientras el formulario está a la vista. */
function ActionBar({ path, appointmentHref }: { path: string; appointmentHref: string }) {
  const [past, setPast] = useState(false)
  const [formInView, setFormInView] = useState(false)
  useEffect(() => {
    const onScroll = () => setPast(scrollY > 600)
    onScroll()
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [])
  // El formulario cambia con la página y en las páginas perezosas aparece tarde: se vuelve a buscar al cambiar de ruta y cuando entre al DOM.
  useEffect(() => {
    setFormInView(false)
    let io: IntersectionObserver | undefined
    const find = () => {
      const form = document.getElementById('appointment')
      if (!form || io) return
      io = new IntersectionObserver(([e]) => setFormInView(e.isIntersecting))
      io.observe(form)
      mo.disconnect()
    }
    const mo = new MutationObserver(find)
    mo.observe(document.body, { childList: true, subtree: true })
    find()
    return () => { mo.disconnect(); io?.disconnect() }
  }, [path])
  const hidden = !past || formInView
  // Avisa a los botones flotantes (floating-contact.css): suben sobre la barra, o se esconden si el formulario está a la vista.
  useEffect(() => {
    document.documentElement.dataset.actionbar = formInView ? 'form' : past ? 'on' : 'off'
    return () => { delete document.documentElement.dataset.actionbar }
  }, [past, formInView])
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
    if (shown.current === path) return // primera carga: se deja el foco al inicio de la página
    shown.current = path
    main.current?.focus({ preventScroll: true }) // tras un cambio de página, quien usa teclado o lector de pantalla empieza en el contenido nuevo
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
        {/* Pie de página armado como el de Dental Nakeji: marca, columnas de enlaces, contacto y una línea final. */}
        <footer className="ftr">
          <div className="wrap ftr-cta">
            <h2 className="ftr-cta__title">{footer.closing.title}</h2>
            <div className="ftr-cta__actions">
              <a className="btn" href={appointmentHref}>{header.cta.label}</a>
              <a className="btn btn-ghost" href={clinic.phone.href}>{footer.closing.callLabel} {clinic.phone.label}</a>
            </div>
          </div>
          <div className="wrap ftr-grid">
            <div className="ftr-brand">
              <Logo large />
              <p>{footer.tagline}</p>
              <ul className="ftr-social" aria-label="Social media">
                {footer.social.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${clinic.name} on ${s.label}`}>
                      <BrandIcon name={s.label === 'Instagram' ? 'instagram' : 'facebook'} size={44} />
                    </a>
                  </li>
                ))}
                <li><WhatsAppLink size={44} /></li>
              </ul>
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
            <div className="ftr-contact">
              <h2>{footer.contactHeading}</h2>
              <address>
                <a href={clinic.mapsUrl} target="_blank" rel="noopener noreferrer"><Icon name="pin" size={18} />{footer.address}</a>
                <a href={footer.phone.href}><Icon name="phone" size={18} />{footer.phone.label}</a>
                <a href={footer.email.href}><Icon name="mail" size={18} />{footer.email.label}</a>
              </address>
            </div>
          </div>
          <div className="wrap ftr-legal">
            <span>© {year} {footer.legal}</span>
            <span>{footer.note}</span>
            <button type="button" className="motion-toggle" onClick={() => setMotionPaused(!motionPaused)}>{motionPaused ? footer.motion.play : footer.motion.pause}</button>
          </div>
        </footer>
        <ActionBar path={path} appointmentHref={appointmentHref} />
        <FloatingContact />
      </div>
    </div>
  )
}
