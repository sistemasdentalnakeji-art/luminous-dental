import { useEffect, useState, type AnchorHTMLAttributes, type MouseEvent } from 'react'
import { prefetch } from '@/lib/pages'

// Tiny router (no dependency): clean paths with the History API. The host must send every path to index.html.
const EVENT = 'ld:navigate'
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '') // '' locally, '/luminous-dental' on GitHub Pages
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

export function navigate(to: string) {
  history.pushState(null, '', internal(to) ? BASE + to : to)
  dispatchEvent(new Event(EVENT))
}

const internal = (href: string) => href.startsWith('/') && !href.startsWith('//')

/** Link that stays inside the site when the address is a path ("/about", "/services#cosmetic"); anchors and outside links work as usual. */
export function Link({ href, onClick, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const go = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || rest.target || !internal(href)) return
    e.preventDefault()
    navigate(href)
  }
  const warm = () => { if (internal(href)) prefetch(href) } // start loading the page before the click
  return <a href={internal(href) ? BASE + href : href} onClick={go} onPointerEnter={warm} onFocus={warm} onTouchStart={warm} {...rest} />
}
