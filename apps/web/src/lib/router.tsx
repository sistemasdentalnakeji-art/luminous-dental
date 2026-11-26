import { useEffect, useState, type AnchorHTMLAttributes, type MouseEvent } from 'react'
import { prefetch } from '@/lib/pages'

// Router mínimo (sin dependencias): rutas limpias con la History API. El servidor debe enviar cada ruta a index.html.
const EVENT = 'ld:navigate'
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '') // '' en local, '/luminous-dental' en GitHub Pages
const strip = (p: string) => (BASE && p.startsWith(BASE) ? p.slice(BASE.length) || '/' : p)
const read = () => ({ path: strip(location.pathname).replace(/(.)\/$/, '$1'), hash: location.hash })

export function useLocation() {
  const [loc, setLoc] = useState(read)
  useEffect(() => {
    const on = () => setLoc(read())
    addEventListener('popstate', on)
    addEventListener(EVENT, on)
    return () => {
      removeEventListener('popstate', on)
      removeEventListener(EVENT, on)
    }
  }, [])
  return loc
}

export function navigate(to: string, replace = false) {
  history[replace ? 'replaceState' : 'pushState'](null, '', internal(to) ? BASE + to : to)
  dispatchEvent(new Event(EVENT))
}

const internal = (href: string) => href.startsWith('/') && !href.startsWith('//')
const external = (href: string) => /^https?:\/\//.test(href)

/** Enlace que se queda dentro del sitio cuando la dirección es una ruta ("/en/about", "/es/servicios#cosmetic"; sácala con hrefOf(clave, idioma) de config/routes.ts); las anclas funcionan como siempre y los enlaces externos (http/https) se abren en otra pestaña con noopener, salvo que se pida otra cosa. */
export function Link({ href, onClick, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const go = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || rest.target || !internal(href)) return
    e.preventDefault()
    navigate(href)
  }
  const warm = () => { if (internal(href)) prefetch(href) } // empieza a cargar la página antes del clic
  return <a href={internal(href) ? BASE + href : href} onClick={go} onPointerEnter={warm} onFocus={warm} onTouchStart={warm} {...(external(href) && !rest.target ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest} />
}
