import { useEffect } from 'react'
import { notFoundTitle } from '@/config/routes'
import { articleOf, blogPath, categoryOf } from '@/lib/blog'
import { BlogArticle, BlogCategory, BlogHub } from '@/pages/Blog'
import NotFound from '@/pages/NotFound'

// Todo lo que está bajo /blog, en un archivo aparte del resto del sitio (los textos del blog son los datos más pesados).
const name = 'Luminous Dental'

export default function BlogRoute({ path }: { path: string }) {
  const key = path.startsWith('/blog/') ? path.slice('/blog/'.length) : ''
  const category = categoryOf(key)
  const article = articleOf(key)
  const found = path === blogPath() || !!category || !!article
  const title = category ? `${category.name} | ${name} Blog` : article ? `${article.title} | ${name}` : found ? `Blog | ${name}` : notFoundTitle
  useEffect(() => {
    document.title = title
  }, [title])
  if (category) return <BlogCategory category={category} />
  if (article) return <BlogArticle article={article} />
  return found ? <BlogHub /> : <NotFound />
}

