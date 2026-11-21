import { serviceHref } from '@/content/clinic'
import { home } from '@/content/home'
import { servicePages } from '@/content/services'

// Una dirección por página (las páginas propias del blog están en pages/BlogRoute.tsx, así este archivo no arrastra los textos del blog). Una página solo tiene ruta cuando tiene contenido real; «Privacy Policy» aún no lo tiene (docs/datos.md), por eso no se enlaza.
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
