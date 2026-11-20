import { serviceHref } from '@/content/clinic'
import { home } from '@/content/home'
import { servicePages } from '@/content/services'

// One address per page (the blog's own pages are in pages/BlogRoute.tsx, so this file does not pull in the blog texts). A page only gets a route when it has real content; "Privacy Policy" has none yet (docs/datos.md), so it is not linked.
const name = 'Luminous Dental'
export const routes: { path: string; title: string }[] = [
  { path: '/', title: home.seo.title },
  { path: '/about', title: `About | ${name}` },
  { path: '/services', title: `Services | ${name}` },
  ...servicePages.map((s) => ({ path: serviceHref(s.name), title: `${s.name} | ${name}` })),
  { path: '/insurance-financing', title: `Insurance & Financing | ${name}` },
  { path: '/contact', title: `Contact | ${name}` },
]

export const notFoundTitle = `Page not found | ${name}`
