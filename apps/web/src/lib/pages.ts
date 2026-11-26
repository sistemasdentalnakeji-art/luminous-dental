import { lazy } from 'react'
import { blogLang, findRoute } from '@/config/routes'

// Las páginas que no son el inicio cargan aparte (en su propio archivo), así la primera visita no las descarga.
// prefetch() inicia la descarga cuando el cursor, un dedo o el teclado llega a un enlace a la página, así el clic se siente instantáneo.
const load = {
  about: () => import('@/pages/About'),
  faq: () => import('@/pages/Faq'),
  services: () => import('@/pages/Services'),
  service: () => import('@/pages/Service'),
  benefits: () => import('@/pages/Benefits'),
  insurance: () => import('@/pages/Insurance'),
  financingHub: () => import('@/pages/FinancingHub'),
  agreements: () => import('@/pages/Agreements'),
  financing: () => import('@/pages/Financing'),
  blog: () => import('@/pages/BlogRoute'),
  privacy: () => import('@/pages/Privacy'),
  terms: () => import('@/pages/Terms'),
}

export const About = lazy(load.about)
export const Faq = lazy(load.faq)
export const Services = lazy(load.services)
export const Service = lazy(load.service)
export const Benefits = lazy(load.benefits)
export const Insurance = lazy(load.insurance)
export const FinancingHub = lazy(load.financingHub)
export const Agreements = lazy(load.agreements)
export const Financing = lazy(load.financing)
export const BlogRoute = lazy(load.blog)
export const Privacy = lazy(load.privacy)
export const Terms = lazy(load.terms)

export function prefetch(href: string) {
  const path = href.split(/[?#]/)[0]
  if (blogLang(path)) return void load.blog()
  const key = findRoute(path)?.key
  if (key === 'about') void load.about()
  else if (key === 'faq') void load.faq()
  else if (key === 'services') void load.services()
  else if (key === 'benefits') void load.benefits()
  else if (key === 'insurance') void load.insurance()
  else if (key === 'financing') void load.financingHub()
  else if (key === 'agreements') void load.agreements()
  else if (key?.startsWith('financing:')) void load.financing()
  else if (key === 'privacy') void load.privacy()
  else if (key === 'terms') void load.terms()
  else if (key?.startsWith('service:')) void load.service()
}
