import { lazy } from 'react'

// Pages that are not the home page load apart (own file), so the first visit does not download them.
// prefetch() starts the download when the pointer, a finger or the keyboard reaches a link to the page, so the click feels instant.
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
