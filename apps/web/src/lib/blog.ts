// Blog data (copied from Dental Nakeji's blog and adapted; see docs/datos.md). English only.
import data from '@/content/blog.en.json'

export type Article = (typeof data.articles)[number]
export type Category = (typeof data.categories)[number]
export const blog = data

export const categoryOf = (key: string) => data.categories.find((c) => c.key === key)
export const articleOf = (key: string) => data.articles.find((a) => a.key === key)
export const articlesIn = (category: Category) => data.articles.filter((a) => a.category === category.key)
export const blogPath = (key?: string) => (key ? `/blog/${key}` : '/blog')

/** Minutes of reading at 200 words per minute, at least 1. */
export function readingMinutes(article: Article) {
  const words = [article.lead, article.answer, ...article.sections.flatMap((s) => [s.title, ...s.paragraphs])].join(' ').split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

/** "[text](url)" links of the sources line. */
export const linksIn = (text: string) => [...text.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)].map((m) => ({ label: m[1], href: m[2] }))

export const blogText = {
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
