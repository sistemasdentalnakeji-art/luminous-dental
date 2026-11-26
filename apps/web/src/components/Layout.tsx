import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Backdrop } from '@/components/Backdrop'
import { BrandIcon } from '@/components/BrandIcon'
import { Header } from '@/components/Header'
import { Icon } from '@/components/Icon'
import { LanguageSwitch } from '@/components/LanguageSwitch'
import { FloatingContact } from '@/components/FloatingContact'
import { WhatsAppLink } from '@/components/WhatsAppLink'
import { NeonLogo } from '@/components/NeonLogo'
import { hrefOf, targetHref } from '@/config/routes'
import { clinic } from '@/content/clinic'
import { home } from '@/content/home'
import { servicesOf } from '@/content/services'
import { ui } from '@/content/ui'
import { setMotionPaused, useMotionPaused } from '@/lib/motion'
import { useLang } from '@/lib/lang'
import { Link } from '@/lib/router'

const year = new Date().getFullYear()

/** Solo celular (docs/mejoras-1-plan.md 2.1): los botones de llamar y pedir cita quedan a la mano después de la primera pantalla y se ocultan mientras el formulario está a la vista. */
function ActionBar({ path, appointmentHref }: { path: string; appointmentHref: string }) {
  const lang = useLang()
  const { header } = home[lang]
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
    const stop = setTimeout(() => mo.disconnect(), 10000) // páginas sin formulario (404): no vigilar el DOM para siempre
    return () => { clearTimeout(stop); mo.disconnect(); io?.disconnect() }
  }, [path])
  const hidden = !past || formInView
  // Avisa a los botones flotantes (floating-contact.css): suben sobre la barra, o se esconden si el formulario está a la vista.
  useEffect(() => {
    document.documentElement.dataset.actionbar = formInView ? 'form' : past ? 'on' : 'off'
    return () => { delete document.documentElement.dataset.actionbar }
  }, [past, formInView])
  return (
    <div className="actionbar" hidden={hidden}>
      <a className="btn btn-ghost" href={clinic.phone.href}>{ui[lang].callOrText}</a>
      <a className="btn" href={appointmentHref} target="_blank" rel="noopener noreferrer">{header.cta.label}</a>
    </div>
  )
}

const current = (href: string, path: string) => (href === path ? 'page' : undefined)

export function Layout({ path, appointmentHref, children }: { path: string; appointmentHref: string; children: ReactNode }) {
  const lang = useLang()
  const { header, footer } = home[lang]
  const t = ui[lang]
  const services = servicesOf(lang)
  const faqHref = hrefOf('faq', lang) // FAQ va en la línea final del pie
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
        {/* Pie (26-11): fondo fijo y quieto · marca, emergencias, redes e idioma · columnas (Servicios, Beneficios, Clínica, Legal, Contacto) · línea final con FAQ y pausa. */}
        <footer className="ftr">
          <div className="wrap ftr-grid">
            <div className="ftr-brand">
              <NeonLogo />
              <p>{footer.tagline}</p>
              <a className="btn btn-ghost ftr-emg" href={clinic.phone.href}>
                <Icon name="phone" size={18} />{footer.emergencyLine} <span className="ftr-emg__tel">{clinic.phone.label}</span>
              </a>
              <a className="btn ftr-book" href={footer.request.href} target="_blank" rel="noopener noreferrer">{footer.request.label}<span className="sr-only"> {t.opensNewTab}</span></a>
              <ul className="ftr-social" aria-label={t.social}>
                {footer.social.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={t.socialOn(clinic.name, s.label)}>
                      <BrandIcon name={s.label === 'Instagram' ? 'instagram' : 'facebook'} size={44} />
                    </a>
                  </li>
                ))}
                <li><WhatsAppLink size={44} /></li>
              </ul>
              <LanguageSwitch path={path} className="ftr-lang" />
            </div>
            <div className="ftr-links">
              <nav aria-labelledby="ftr-services">
                <h2 id="ftr-services">{footer.servicesHeading}</h2>
                <ul>
                  {footer.services.map((id) => <li key={id}><Link href={hrefOf(`service:${id}`, lang)}>{services.find((s) => s.id === id)?.name}</Link></li>)}
                  <li><Link href={hrefOf('services', lang)}>{header.servicesOverview}</Link></li>
                </ul>
              </nav>
              <nav aria-labelledby="ftr-benefits">
                <h2 id="ftr-benefits">{footer.benefitsHeading}</h2>
                <ul>{footer.benefits.map((l) => { const href = targetHref(l, lang); return <li key={href}><Link href={href} aria-current={current(href, path)}>{l.label}</Link></li> })}</ul>
              </nav>
              <nav aria-labelledby="ftr-clinic">
                <h2 id="ftr-clinic">{footer.clinicHeading}</h2>
                <ul>{footer.links.filter((l) => targetHref(l, lang) !== faqHref).map((l) => { const href = targetHref(l, lang); return <li key={href}><Link href={href} aria-current={current(href, path)}>{l.label}</Link></li> })}</ul>
              </nav>
              <nav aria-labelledby="ftr-legal">
                <h2 id="ftr-legal">{footer.legalHeading}</h2>
                <ul>{footer.legalLinks.map((l) => { const href = targetHref(l, lang); return <li key={href}><Link href={href} aria-current={current(href, path)}>{l.label}</Link></li> })}</ul>
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
          </div>
          <div className="wrap ftr-legal">
            <span>© {year} {footer.legal}</span>
            <span>{footer.note}</span>
            <Link href={faqHref}>{footer.links.find((l) => targetHref(l, lang) === faqHref)?.label}</Link>
            <button type="button" className="motion-toggle" onClick={() => setMotionPaused(!motionPaused)}>{motionPaused ? footer.motion.play : footer.motion.pause}</button>
          </div>
        </footer>
        <ActionBar path={path} appointmentHref={appointmentHref} />
        <FloatingContact />
      </div>
    </div>
  )
}
