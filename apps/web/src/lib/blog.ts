// Datos del blog en dos idiomas (content/blog.en.json y content/blog.es.json, mismas claves y estructura; ver docs/datos.md). Lo usa solo la ruta del blog (carga aparte).
// Las direcciones (/en/blog/<clave>, /es/blog/<slug>) están en config/routes.ts (blogHref / blogSlugs), que no arrastra estos textos.
import en from '@/content/blog.en.json'
import es from '@/content/blog.es.json'
import { blogHref } from '@/config/routes'
import type { L10n, Lang } from '@/lib/lang'

export type Article = (typeof en.articles)[number]
export type Category = (typeof en.categories)[number]
const data: L10n<typeof en> = { en, es }

/** Todo lo del blog en un idioma: los datos y las búsquedas por clave. */
export function blogApi(lang: Lang) {
  const blog = data[lang]
  return {
    blog,
    categoryOf: (key: string) => blog.categories.find((c) => c.key === key),
    articleOf: (key: string) => blog.articles.find((a) => a.key === key),
    articlesIn: (category: Category) => blog.articles.filter((a) => a.category === category.key),
    path: (key?: string) => blogHref(lang, key) ?? blogHref(lang)!,
  }
}

/** Minutos de lectura a 200 palabras por minuto, mínimo 1. */
export function readingMinutes(article: Article) {
  const words = [article.lead, article.answer, ...article.sections.flatMap((s) => [s.title, ...s.paragraphs])].join(' ').split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

/** Enlaces "[texto](url)" de la línea de fuentes. */
export const linksIn = (text: string) => [...text.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)].map((m) => ({ label: m[1], href: m[2] }))

const textEn = {
  explore: 'Browse articles',
  allServices: 'See all services',
  book: 'Request an appointment',
  minutes: (n: number) => `${n} min read`,
  answer: 'Short answer',
  sources: 'Sources',
  crumbs: 'Breadcrumb',
  topicsNav: 'Blog topics',
  articleCount: (n: number) => (n === 1 ? '1 article' : `${n} articles`),
  inCategory: 'In this topic',
  moreTopics: 'Other topics',
  step: (i: number, n: number) => `${i} of ${n}`,
  nextInTopic: 'Next in this topic',
  nextTopic: 'Next topic',
}
const textEs: typeof textEn = {
  explore: 'Ver artículos',
  allServices: 'Ver todos los servicios',
  book: 'Solicita tu cita',
  minutes: (n) => `${n} min de lectura`,
  answer: 'Respuesta corta',
  sources: 'Fuentes',
  crumbs: 'Ruta de navegación',
  topicsNav: 'Temas del blog',
  articleCount: (n) => (n === 1 ? '1 artículo' : `${n} artículos`),
  inCategory: 'En este tema',
  moreTopics: 'Otros temas',
  step: (i, n) => `${i} de ${n}`,
  nextInTopic: 'Siguiente en este tema',
  nextTopic: 'Siguiente tema',
}
export const blogText: L10n<typeof textEn> = { en: textEn, es: textEs }
