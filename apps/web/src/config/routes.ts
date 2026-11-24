import { serviceHref } from '@/content/clinic'
import { home } from '@/content/home'
import { servicePages } from '@/content/services'

// Una dirección por página (las páginas propias del blog están en pages/BlogRoute.tsx, así este archivo no arrastra los textos del blog). Una página solo tiene ruta cuando tiene contenido real; las páginas legales (/privacy-policy y /terms-and-conditions) llevan texto por revisar con abogado (docs/datos.md).
const name = 'Luminous Dental'
export const routes: { path: string; title: string; description?: string }[] = [
  { path: '/', title: home.seo.title },
  { path: '/about', title: `About | ${name}` },
  { path: '/services', title: `Services | ${name}` },
  ...servicePages.map((s) => ({ path: serviceHref(s.name), title: `${s.name} | ${name}` })),
  { path: '/insurance-financing', title: `Insurance & Financing | ${name}` },
  { path: '/contact', title: `Contact | ${name}` },
  { path: '/privacy-policy', title: `Privacy Policy | ${name}`, description: `${name} privacy policy: what we collect, how we use it, who we share it with, and your choices.` },
  { path: '/terms-and-conditions', title: `Terms and Conditions | ${name}`, description: `${name} terms and conditions: use of the website, appointment requests, insurance, and text messages.` },
]

export const notFoundTitle = `Page not found | ${name}`
