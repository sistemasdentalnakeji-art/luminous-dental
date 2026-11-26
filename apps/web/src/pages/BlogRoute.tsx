import { useEffect } from 'react'
import { blogKeyOf, langOfPath, notFoundTitle } from '@/config/routes'
import { blogApi } from '@/lib/blog'
import { BlogArticle, BlogCategory, BlogHub } from '@/pages/Blog'
import NotFound from '@/pages/NotFound'

// Todo lo que está bajo /en/blog y /es/blog, en un archivo aparte del resto del sitio (los textos del blog son los datos más pesados).
const name = 'Luminous Dental'

export default function BlogRoute({ path }: { path: string }) {
  const lang = langOfPath(path)
  const slug = path.split('/')[3] ?? '' // /<lang>/blog/<slug>
  const key = slug ? blogKeyOf(lang, slug) : undefined
  const { categoryOf, articleOf } = blogApi(lang)
  const category = key ? categoryOf(key) : undefined
  const article = key ? articleOf(key) : undefined
  const found = !slug || !!category || !!article
  const blogName = lang === 'es' ? `Blog de ${name}` : `${name} Blog`
  const title = category ? `${category.name} | ${blogName}` : article ? `${article.title} | ${name}` : found ? `Blog | ${name}` : notFoundTitle[lang]
  useEffect(() => {
    document.title = title
  }, [title])
  if (category) return <BlogCategory category={category} />
  if (article) return <BlogArticle article={article} />
  return found ? <BlogHub /> : <NotFound />
}
