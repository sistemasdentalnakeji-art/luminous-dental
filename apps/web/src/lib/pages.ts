import { lazy } from 'react'

// Las páginas que no son el inicio cargan aparte (en su propio archivo), así la primera visita no las descarga.
// prefetch() inicia la descarga cuando el cursor, un dedo o el teclado llega a un enlace a la página, así el clic se siente instantáneo.
const load = {
  about: () => import('@/pages/About'),
  services: () => import('@/pages/Services'),
  service: () => import('@/pages/Service'),
  insurance: () => import('@/pages/Insurance'),
  blog: () => import('@/pages/BlogRoute'),
}

export const About = lazy(load.about)
export const Services = lazy(load.services)
export const Service = lazy(load.service)
export const Insurance = lazy(load.insurance)
export const BlogRoute = lazy(load.blog)

export function prefetch(href: string) {
  const path = href.split(/[?#]/)[0]
  if (path === '/about') void load.about()
  else if (path === '/services') void load.services()
  else if (path === '/insurance-financing') void load.insurance()
  else if (path === '/blog' || path.startsWith('/blog/')) void load.blog()
  else if (path.startsWith('/') && path !== '/' && path !== '/contact') void load.service()
}
