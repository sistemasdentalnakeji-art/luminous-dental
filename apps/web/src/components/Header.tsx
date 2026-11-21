// Header: misma estructura que el de Dental Nakeji (components/layout/Header.tsx): logo, menú principal con un submenú "Services",
// y en celulares un panel que se abre debajo de la barra (botón de menú, submenú tipo acordeón). Teclado: Enter/Espacio abre,
// las flechas mueven, Escape cierra. Estilos: styles/site.css (bloque "header menu").
import { useEffect, useRef, useState, type FocusEvent, type KeyboardEvent, type PointerEvent as ReactPointerEvent } from 'react'
import { flushSync } from 'react-dom'
import { Icon } from '@/components/Icon'
import { Logo } from '@/components/Logo'
import { serviceHref } from '@/content/clinic'
import { home } from '@/content/home'
import { servicePages } from '@/content/services'
import { Link } from '@/lib/router'

const { header } = home
const MENU_ID = 'main-menu'
const DESKTOP = '(min-width: 1001px)'
const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ')
const current = (href: string, path: string) => (href === path ? 'page' : undefined)

export function Header({ path, appointmentHref }: { path: string; appointmentHref: string }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openId, setOpenId] = useState<string | null>(null)
  const ref = useRef<HTMLElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)

  // Una página nueva cierra el menú (el estado se ajusta al dibujar, no en un effect).
  const [menuPath, setMenuPath] = useState(path)
  if (menuPath !== path) {
    setMenuPath(path)
    setMenuOpen(false)
    setOpenId(null)
  }

  // Escape cierra (primero el submenú, luego el panel del celular); un toque fuera del header cierra ambos.
  useEffect(() => {
    if (!openId && !menuOpen) return
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (openId) {
        setOpenId(null)
        document.getElementById(`nav-${openId}-button`)?.focus()
      } else {
        setMenuOpen(false)
        toggle.current?.focus()
      }
    }
    const onDown = (e: PointerEvent) => {
      if (ref.current?.contains(e.target as Node)) return
      setOpenId(null)
      setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [openId, menuOpen])

  // Panel del celular: bloquea la página de atrás, mantiene Tab adentro, se cierra cuando la ventana se ensancha.
  useEffect(() => {
    if (!menuOpen) return
    const before = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const covered = document.querySelectorAll<HTMLElement>('main, footer, .skip')
    covered.forEach((el) => { el.inert = true })
    document.getElementById(MENU_ID)?.querySelector<HTMLElement>('a, button')?.focus()
    const wide = matchMedia(DESKTOP)
    const onChange = () => { if (wide.matches) setMenuOpen(false) }
    wide.addEventListener('change', onChange)
    return () => {
      document.body.style.overflow = before
      covered.forEach((el) => { el.inert = false })
      wide.removeEventListener('change', onChange)
    }
  }, [menuOpen])

  return (
    <header ref={ref} className={cx('hbar', menuOpen && 'menu-open')}>
      <div className="wrap">
        <div className="hdr">
          <Logo />
          <div id={MENU_ID} className={cx('site-menu', menuOpen && 'is-open')}>
            <nav className="nav" aria-label="Main">
              <ul className="nav-list">
                {header.nav.map((n) =>
                  'menu' in n ? (
                    <NavDropdown
                      key={n.href}
                      id="services"
                      label={n.label}
                      href={n.href}
                      path={path}
                      open={openId === 'services'}
                      onToggle={() => setOpenId((id) => (id === 'services' ? null : 'services'))}
                      onOpen={() => setOpenId('services')}
                      onClose={() => setOpenId((id) => (id === 'services' ? null : id))}
                    />
                  ) : (
                    <li key={n.href} className="nav-item">
                      <Link className="nav-link" href={n.href} aria-current={current(n.href, path)}>{n.label}</Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>
            <div className="site-menu__row">
              <Link className="btn site-menu__cta" href={appointmentHref} onClick={() => setMenuOpen(false)}>{header.cta.label}</Link>
              <a className="tlink" href={header.phone.href}>{header.phone.label}</a>
            </div>
          </div>
          <div className="hdr-r">
            <a className="hdr-phone" href={header.phone.href} aria-label={header.phone.label}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>
            </a>
            <Link className="btn hdr-cta" href={appointmentHref}>{header.cta.label}</Link>
            <button
              ref={toggle}
              type="button"
              className="menu-toggle"
              aria-expanded={menuOpen}
              aria-controls={MENU_ID}
              onClick={() => { setOpenId(null); setMenuOpen((o) => !o) }}
            >
              <Icon name={menuOpen ? 'close' : 'menu'} size={24} />
              <span className="sr-only">Menu</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

interface DropdownProps {
  id: string
  label: string
  href: string
  path: string
  open: boolean
  onToggle: () => void
  onOpen: () => void
  onClose: () => void
}

function NavDropdown({ id, label, href, path, open, onToggle, onOpen, onClose }: DropdownProps) {
  const active = path === href || path.startsWith(href + '/')
  // Escritorio con mouse: abre al pasar el cursor, cierra tras 150 ms (hay un hueco de 10 px entre el botón y el panel). Táctil y teclado: clic.
  const hovering = useRef(false)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const onEnter = (e: ReactPointerEvent<HTMLLIElement>) => {
    if (e.pointerType !== 'mouse' || !matchMedia(DESKTOP).matches) return
    window.clearTimeout(timer.current)
    hovering.current = true
    onOpen()
  }
  const onLeave = (e: ReactPointerEvent<HTMLLIElement>) => {
    if (e.pointerType !== 'mouse') return
    hovering.current = false
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(onClose, 150)
  }
  const links = (box: HTMLElement) => Array.from(box.querySelectorAll<HTMLAnchorElement>(`#nav-${id}-panel a`))
  const onKeyDown = (e: KeyboardEvent<HTMLLIElement>) => {
    const box = e.currentTarget
    const target = e.target as HTMLElement
    if (target.id === `nav-${id}-button` && e.key === 'ArrowDown') {
      e.preventDefault()
      flushSync(onOpen)
      links(box)[0]?.focus()
      return
    }
    const items = links(box)
    const i = items.indexOf(target as HTMLAnchorElement)
    if (i === -1) return
    const next: Record<string, number> = { ArrowDown: (i + 1) % items.length, ArrowUp: (i - 1 + items.length) % items.length, Home: 0, End: items.length - 1 }
    if (e.key in next) {
      e.preventDefault()
      items[next[e.key]]?.focus()
    }
  }
  const onBlur = (e: FocusEvent<HTMLLIElement>) => {
    const to = e.relatedTarget as Node | null
    if (to && !e.currentTarget.contains(to)) onClose()
  }

  return (
    <li className={cx('nav-item has-dropdown', open && 'is-open')} onKeyDown={onKeyDown} onBlur={onBlur} onPointerEnter={onEnter} onPointerLeave={onLeave}>
      <button
        id={`nav-${id}-button`}
        type="button"
        className={cx('nav-link nav-button', active && 'is-active')}
        aria-expanded={open}
        aria-controls={`nav-${id}-panel`}
        onClick={() => { if (!hovering.current) onToggle() }}
      >
        {label}
        <Icon name="chevronDown" size={16} className="nav-chevron" />
      </button>
      <div id={`nav-${id}-panel`} className={`dropdown dropdown--${id}`} hidden={!open}>
        <ul className="dropdown__list">
          {servicePages.map((s) => (
            <li key={s.slug}>
              <Link className="dropdown__link" href={serviceHref(s.name)} aria-current={current(serviceHref(s.name), path)}>
                <span className="dropdown__icon" aria-hidden="true"><Icon name={s.icon} size={20} /></span>
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
        <Link className="dropdown__overview btn" href={href} aria-current={current(href, path)}>{header.servicesOverview}</Link>
      </div>
    </li>
  )
}
