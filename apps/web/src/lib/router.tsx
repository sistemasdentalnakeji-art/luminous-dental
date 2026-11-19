import { useEffect, useState, type AnchorHTMLAttributes, type MouseEvent } from 'react'

// Tiny router (no dependency): clean paths with the History API. The host must send every path to index.html.
const EVENT = 'ld:navigate'
const read = () => ({ path: location.pathname.replace(/(.)\/$/, '$1'), hash: location.hash })

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
  history.pushState(null, '', to)
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
  return <a href={href} onClick={go} {...rest} />
}
