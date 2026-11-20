import { Appointment } from '@/components/Appointment'
import { home } from '@/content/home'
import { Link } from '@/lib/router'

const { doctor, why, header } = home
const links = header.nav.filter((n) => n.href === '/services' || n.href === '/insurance-financing')

export default function About() {
  return (
    <>
      <section className="sec wrap pg">
        <div className="doc">
          <div className="doc-l">
            <h1 className="h2">{doctor.heading}</h1>
            <p className="role">{doctor.role}</p>
            <div className="doc-photo"><img src={`${import.meta.env.BASE_URL}dr-hahn.jpg`} alt={doctor.photoAlt} width="734" height="737" /></div>
          </div>
          <div className="doc-r">
            <p className="body">{doctor.text}</p>
            <p className="lang">{doctor.language}</p>
          </div>
        </div>
      </section>
      <section className="sec wrap about-why" aria-labelledby="why-h">
        <h2 className="why-head" id="why-h">{why.heading}</h2>
        <ul className="why-small">
          {why.points.map((p) => <li key={p.title}><h3>{p.title}</h3><p>{p.text}</p></li>)}
        </ul>
        <p className="about-links">{links.map((l) => <Link key={l.href} className="tlink" href={l.href}>{l.label}</Link>)}</p>
      </section>
      <Appointment />
    </>
  )
}
