// Textos cortos que se repiten en varios componentes (etiquetas de accesibilidad, botones sueltos, página 404), en dos idiomas: ui.en / ui.es.
// Un texto de una sola página o sección va en su archivo de content/; solo lo compartido va aquí. Español: traducción nueva (26-11), POR APROBAR.
import type { L10n } from '@/lib/lang'

const en = {
  menu: 'Menu',
  mainNav: 'Main',
  social: 'Social media',
  socialOn: (name: string, network: string) => `${name} on ${network}`,
  homeAria: 'Luminous Dental, home',
  callOrText: 'Call or text',
  stars: (rating: number) => `${rating} out of 5 stars`,
  backToTop: 'Back to top',
  opensNewTab: '(opens in a new tab)',
  services: 'Services',
  carousel: {
    slidesOf: (label: string) => `Slides of ${label}`,
    list: (label: string) => `List: ${label}`,
    previous: (label: string) => `Previous: ${label}`,
    next: (label: string) => `Next: ${label}`,
    goTo: (i: number, n: number) => `Go to slide ${i} of ${n}`,
    slide: (i: number, n: number) => `${i} of ${n}`,
  },
  // Selector de idioma: el texto visible es el nombre del OTRO idioma (en su propio idioma); el aria-label va en el idioma de la página.
  switchTo: { name: 'Español', label: 'Ver esta página en español', hreflang: 'es-MX', lang: 'es' },
  notFound: {
    title: 'Page not found',
    text: 'We could not find that page. It may have moved, or the address may have a typo.',
    back: 'Back to Home',
    request: 'Request an appointment',
    try: 'Try one of these pages.',
  },
}
const es: typeof en = {
  menu: 'Menú',
  mainNav: 'Principal',
  social: 'Redes sociales',
  socialOn: (name, network) => `${name} en ${network}`,
  homeAria: 'Luminous Dental, inicio',
  callOrText: 'Llamar o escribir',
  stars: (rating) => `${rating} de 5 estrellas`,
  backToTop: 'Volver arriba',
  opensNewTab: '(se abre en una pestaña nueva)',
  services: 'Servicios',
  carousel: {
    slidesOf: (label) => `Diapositivas de ${label}`,
    list: (label) => `Lista: ${label}`,
    previous: (label) => `Anterior: ${label}`,
    next: (label) => `Siguiente: ${label}`,
    goTo: (i, n) => `Ir a la diapositiva ${i} de ${n}`,
    slide: (i, n) => `${i} de ${n}`,
  },
  switchTo: { name: 'English', label: 'View this page in English', hreflang: 'en', lang: 'en' },
  notFound: {
    title: 'Página no encontrada',
    text: 'No encontramos esa página. Puede que se haya movido o que la dirección tenga un error.',
    back: 'Volver al inicio',
    request: 'Solicita tu cita',
    try: 'Prueba con una de estas páginas.',
  },
}
export const ui: L10n<typeof en> = { en, es }
