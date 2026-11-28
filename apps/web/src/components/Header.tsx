// Header: misma estructura que el de Dental Nakeji (components/layout/Header.tsx): logo, menú principal con submenús "Services" y "More",
// y en celulares un panel que se abre debajo de la barra (botón de menú, submenú tipo acordeón). Teclado: Enter/Espacio abre,
// las flechas mueven, Escape cierra. Estilos: styles/site.css (bloque "header menu").
import { useEffect, useRef, useState, type FocusEvent, type KeyboardEvent, type PointerEvent as ReactPointerEvent } from 'react'
import { flushSync } from 'react-dom'
import { Icon, type IconName } from '@/components/Icon'
import { LanguageSwitch } from '@/components/LanguageSwitch'
import { NeonLogo } from '@/components/NeonLogo'
import { hrefOf } from '@/config/routes'
import { home } from '@/content/home'
import { servicesOf } from '@/content/services'
import { ui } from '@/content/ui'
import { useLang } from '@/lib/lang'
import { Link } from '@/lib/router'

const MENU_ID = 'main-menu'
const DESKTOP = '(min-width: 1280px)'
const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ')
const current = (href: string, path: string) => (href === path ? 'page' : undefined)

export function Header({ path, appointmentHref }: { path: string; appointmentHref: string }) {
  const lang = useLang()
  const { header } = home[lang]
  const t = ui[lang]
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
    const covered = document.querySelectorAll<HTMLElement>('main, footer, .skip, .actionbar, .float-contact')
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
          <NeonLogo />
          <div id={MENU_ID} className={cx('site-menu', menuOpen && 'is-open')}>
            <nav className="nav" aria-label={t.mainNav}>
              <ul className="nav-list">
                {header.nav.map((n) => {
                  const menu = 'items' in n ? { id: 'id' in n ? n.id : 'more', items: n.items.map((i) => ({ label: i.label, href: hrefOf(i.to, lang), icon: i.icon })), overview: 'overview' in n ? { label: n.overview, href: hrefOf(n.to, lang) } : undefined } : n.menu ? { id: 'services', items: servicesOf(lang).map((s) => ({ label: s.name, href: hrefOf(`service:${s.id}`, lang), icon: s.icon })), overview: { label: header.servicesOverview, href: hrefOf(n.to, lang) } } : null
                  return menu ? (
                    <NavDropdown
                      key={n.label}
                      {...menu}
                      label={n.label}
                      path={path}
                      open={openId === menu.id}
                      onToggle={() => setOpenId((id) => (id === menu.id ? null : menu.id))}
                      onOpen={() => setOpenId(menu.id)}
                      onClose={() => setOpenId((id) => (id === menu.id ? null : id))}
                    />
                  ) : 'to' in n && (
                    <li key={n.to} className="nav-item">
                      <Link className="nav-link" href={hrefOf(n.to, lang)} aria-current={current(hrefOf(n.to, lang), path)}>{n.label}</Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
            <div className="site-menu__row">
              <Link className="btn site-menu__cta" href={appointmentHref} onClick={() => setMenuOpen(false)}>{header.cta.label}</Link>
              <div className="site-menu__lang"><LanguageSwitch path={path} /></div>
            </div>
          </div>
          <div className="hdr-r">
            <LanguageSwitch className="lang-switch--bar" path={path} />
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
              <span className="sr-only">{t.menu}</span>
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
  items: readonly { label: string; href: string; icon: IconName }[]
  /** Botón de ancho completo al pie del panel (solo Services: «View all services»). */
  overview?: { label: string; href: string }
  path: string
  open: boolean
  onToggle: () => void
  onOpen: () => void
  onClose: () => void
}

function NavDropdown({ id, label, items, overview, path, open, onToggle, onOpen, onClose }: DropdownProps) {
  const active = [overview?.href, ...items.map((i) => i.href)].some((h) => h && (path === h || path.startsWith(h + '/')))
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
        onClick={() => { if (!hovering.current || !matchMedia(DESKTOP).matches) onToggle() }}
      >
        {label}
        <Icon name="chevronDown" size={16} className="nav-chevron" />
      </button>
      <div id={`nav-${id}-panel`} className={`dropdown dropdown--${id}`} hidden={!open}>
        <ul className="dropdown__list">
          {items.map((it) => (
            <li key={it.href}>
              <Link className="dropdown__link" href={it.href} aria-current={current(it.href, path)}>
                <span className="dropdown__icon" aria-hidden="true"><Icon name={it.icon} size={20} /></span>
                {it.label}
              </Link>
            </li>
          ))}
        </ul>
        {overview && <Link className="dropdown__overview btn" href={overview.href} aria-current={current(overview.href, path)}>{overview.label}</Link>}
      </div>
    </li>
  )
}
