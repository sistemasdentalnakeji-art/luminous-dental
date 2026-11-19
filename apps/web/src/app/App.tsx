import { useEffect, type ComponentType } from 'react'
import { Layout } from '@/components/Layout'
import { routes } from '@/config/routes'
import { useLocation } from '@/lib/router'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import Home from '@/pages/Home'
import Insurance from '@/pages/Insurance'
import Services from '@/pages/Services'

const pages: Record<(typeof routes)[number]['path'], ComponentType> = {
  '/': Home,
  '/about': About,
  '/services': Services,
  '/insurance-financing': Insurance,
  '/contact': Contact,
}

export default function App() {
  const { path, hash } = useLocation()
  const route = routes.find((r) => r.path === path)
  const Page = route ? pages[route.path] : Home // unknown address: show the home page (a real 404 page has no design yet)
  useEffect(() => {
    document.title = route?.title ?? routes[0].title
  }, [route])
  useEffect(() => {
    // Scroll after the new page is drawn: to the anchor if there is one, else to the top.
    const id = requestAnimationFrame(() => {
      const target = hash && document.getElementById(decodeURIComponent(hash.slice(1)))
      if (target) target.scrollIntoView()
      else if (!hash) scrollTo({ top: 0, behavior: 'instant' })
    })
    return () => cancelAnimationFrame(id)
  }, [path, hash])
  return (
    <Layout path={route ? path : '/'}>
      <Page />
    </Layout>
  )
}
