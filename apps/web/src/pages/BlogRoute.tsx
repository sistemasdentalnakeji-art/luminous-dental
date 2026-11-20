import { useEffect } from 'react'
import { notFoundTitle } from '@/config/routes'
import { articleOf, blogPath, categoryOf } from '@/lib/blog'
import { BlogArticle, BlogCategory, BlogHub } from '@/pages/Blog'
import NotFound from '@/pages/NotFound'

// Everything under /blog, in one file apart from the rest of the site (the blog texts are the heaviest data).
const name = 'Luminous Dental'

/** `onMissing` tells the page frame when the address is not a real blog page, so its appointment buttons point to Contact like on any error page. */
export default function BlogRoute({ path, onMissing }: { path: string; onMissing: (path: string) => void }) {
  const key = path.startsWith('/blog/') ? path.slice('/blog/'.length) : ''
  const category = categoryOf(key)
  const article = articleOf(key)
  const found = path === blogPath() || !!category || !!article
  const title = category ? `${category.name} | ${name} Blog` : article ? `${article.title} | ${name}` : found ? `Blog | ${name}` : notFoundTitle
  useEffect(() => {
    document.title = title
    onMissing(found ? '' : path)
  }, [title, found, path, onMissing])
  if (category) return <BlogCategory category={category} />
  if (article) return <BlogArticle article={article} />
  return found ? <BlogHub /> : <NotFound />
}

