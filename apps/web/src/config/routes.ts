import { home } from '@/content/home'

// One page per menu item. A page only gets a route when it has real content; "Privacy Policy" has none yet (docs/datos.md), so it is not linked.
export const routes = [
  { path: '/', title: home.seo.title },
  { path: '/about', title: 'About | Luminous Dental' },
  { path: '/services', title: 'Services | Luminous Dental' },
  { path: '/insurance-financing', title: 'Insurance & Financing | Luminous Dental' },
  { path: '/contact', title: 'Contact | Luminous Dental' },
] as const

export const hasRoute = (href: string) => routes.some((r) => r.path === href.split('#')[0])
