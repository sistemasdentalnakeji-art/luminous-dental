import { about, type Icon } from '@/content/about'
import { clinic } from '@/content/clinic'
import { home } from '@/content/home'
import { Link } from '@/lib/router'
import '@/styles/about.css'

const links = home.header.nav.filter((n) => n.href === '/services' || n.href === '/insurance-financing')

/** Icono de línea en un cuadro de vidrio (decorativo). */
function Tile({ icon }: { icon: Icon }) {
  return <span className="ab-tile" aria-hidden="true"><svg viewBox="0 0 24 24">{icon.map((d) => <path key={d} d={d} />)}</svg></span>
}

export default function About() {
  const items = about.story.items.filter((i) => i.text)
  const cards = about.purpose.cards.filter((c) => c.text)
  const members = about.team.members

  return (
    <>
      <header className="wrap pg">
        <h1 className="h2">{about.title}</h1>
        <p className="ab-lead">{about.lead}</p>
      </header>

      <section className="wrap ab-sec ab-story" aria-labelledby="story-h">
        <div className="ab-story__intro">
          <h2 className="h2" id="story-h">{about.story.heading}</h2>
          <p className="ab-lead">{about.story.lead}</p>
        </div>
        <ol className="ab-steps">
          {items.map((i) => (
            <li className="ab-card ab-st" key={i.id}>
              <Tile icon={i.icon} />
              <div className="ab-st__cap">
                <h3>{i.title}</h3>
                <p>{i.text}</p>
                {'maps' in i && <a href={clinic.mapsUrl} target="_blank" rel="noopener noreferrer">{home.appointment.location.mapLabel}</a>}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap ab-sec ab-sec--flush" aria-label="Our purpose">
        <div className="ab-sign"><p>{about.purpose.sign}</p></div>
        <div className="ab-purpose" style={{ '--n': cards.length } as React.CSSProperties}>
          {cards.map((c) => <article className="ab-pc" key={c.id}><h3>{c.title}</h3><p>{c.text}</p></article>)}
        </div>
      </section>

      <section className="wrap ab-sec ab-sec--flush" aria-labelledby="vals-h">
        <h2 className="h2" id="vals-h">{about.values.heading}</h2>
        <ul className="ab-vals" style={{ '--n': home.why.points.length } as React.CSSProperties}>
          {home.why.points.map((p, n) => (
            <li className="ab-card ab-val" key={p.title}>
              <Tile icon={about.values.icons[n]} />
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap ab-sec ab-sec--flush" aria-labelledby="team-h">
        <h2 className="h2" id="team-h">{about.team.heading}</h2>
        <div className={`ab-team${members.length === 1 ? ' ab-team--solo' : ''}`}>
          {members.map((m) => (
            <article className={`ab-card ab-dr${m.photo ? '' : ' ab-dr--nophoto'}`} key={m.name}>
              {m.photo && <div className="ab-dr__photo"><img src={`${import.meta.env.BASE_URL}${m.photo.src}`} alt={m.photo.alt} width={m.photo.width} height={m.photo.height} /></div>}
              <div className="ab-dr__body">
                <h3>{m.name}</h3>
                <p className="ab-dr__role">{m.role}</p>
                <p>{m.text}</p>
                <dl className="ab-facts">{m.facts.map((f) => <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>)}</dl>
              </div>
            </article>
          ))}
        </div>
        <p className="ab-end">
          {links.map((l) => <Link key={l.href} className="tlink" href={l.href}>{l.label}</Link>)}
          <span>{about.callLabel} <a className="tlink" href={clinic.phone.href}>{clinic.phone.label}</a></span>
        </p>
      </section>
    </>
  )
}
