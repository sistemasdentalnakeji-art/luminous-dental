import { home } from '@/content/home'
import { Link } from '@/lib/router'

const pages = home.header.nav.filter((n) => n.href !== '/' && n.href !== '/about')

export default function NotFound() {
  return (
    <section className="sec wrap pg">
      <h1 className="h2">Page not found</h1>
      <p className="nf-text">We could not find that page. It may have moved, or the address may have a typo.</p>
      <div className="hero-cta nf-cta">
        <Link className="btn" href="/">Back to Home</Link>
        <Link className="btn btn-ghost" href="/contact#appointment">Request an appointment</Link>
      </div>
      {/* NUEVO, para aprobación: "Try one of these pages." */}
      <nav className="nf-pages" aria-label="Try one of these pages.">
        <p>Try one of these pages.</p>
        <ul>{pages.map((n) => <li key={n.href}><Link href={n.href}>{n.label}</Link></li>)}</ul>
      </nav>
    </section>
  )
}
