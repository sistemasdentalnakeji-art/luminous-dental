import { clinic } from '@/content/clinic'
import { hrefOf } from '@/config/routes'
import { home } from '@/content/home'
import { ui } from '@/content/ui'
import { useLang } from '@/lib/lang'
import { Link } from '@/lib/router'

export default function NotFound() {
  const lang = useLang()
  const t = ui[lang].notFound
  const pages = home[lang].header.nav.flatMap((n) => ('items' in n ? n.items : [n])).filter((n) => n.to !== 'home' && n.to !== 'about').map((n) => ({ label: n.label, href: hrefOf(n.to, lang) }))
  return (
    <section className="sec wrap pg">
      <h1 className="h2">{t.title}</h1>
      <p className="nf-text">{t.text}</p>
      <div className="hero-cta nf-cta">
        <Link className="btn" href={hrefOf('home', lang)}>{t.back}</Link>
        <Link className="btn btn-ghost" href={clinic.bookingUrl}>{t.request}</Link>
      </div>
      <nav className="nf-pages" aria-label={t.try}>
        <p>{t.try}</p>
        <ul>{pages.map((n) => <li key={n.href}><Link href={n.href}>{n.label}</Link></li>)}</ul>
      </nav>
    </section>
  )
}
