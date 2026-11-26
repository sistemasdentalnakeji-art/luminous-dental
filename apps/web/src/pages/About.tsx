import { about as aboutText, type Icon } from '@/content/about'
import { clinic } from '@/content/clinic'
import { useLang } from '@/lib/lang'
import { Link } from '@/lib/router'
import { SoftBlurIn } from '@/components/SoftBlurIn'
import '@/styles/about.css'
import '@/styles/soft-blur.css'

// Tercera versión (26-11, ronda 3): héroe editorial (frase + retrato en arco con el nombre encima), fila de datos reales, creencia en grande, valores y cierre.
/** Icono de línea (decorativo). */
function Glyph({ icon }: { icon: Icon }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true">{icon.map((d) => <path key={d} d={d} />)}</svg>
}

export default function About() {
  const lang = useLang()
  const t = aboutText[lang]
  const dr = t.doctor

  return (
    <>
      <header className="wrap ab-hero">
        <div className="ab-hero__copy">
          <p className="pill">{t.pill}</p>
          <h1>
            {t.title.map((l, n) => <span key={l} className={n ? 'ab-ln ab-ln--em' : 'ab-ln'}>{l}</span>)}
          </h1>
          <p className="ab-lead">{t.lead}</p>
          <dl className="ab-creds">
            {dr.facts.map((f) => <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>)}
          </dl>
        </div>
        <figure className="ab-portrait">
          <div className="ab-portrait__arch">
            <img src={`${import.meta.env.BASE_URL}${dr.photo.src}`} alt={dr.photo.alt} width={dr.photo.width} height={dr.photo.height} fetchPriority="high" />
          </div>
          <figcaption>
            <span className="ab-portrait__name">{dr.name}</span>
            <span className="ab-portrait__role">{dr.role}</span>
          </figcaption>
        </figure>
      </header>

      <section className="wrap ab-facts" aria-label={t.factsLabel}>
        <ul>
          {t.facts.map((f) => {
            const body = (
              <>
                <span className="ab-facts__v">{f.value}</span>
                <span className="ab-facts__l">{f.label}{f.sr && <span className="sr-only"> · {f.sr} {t.close.newTab}</span>}</span>
              </>
            )
            return <li key={f.value}>{f.href ? <a href={f.href} target="_blank" rel="noopener noreferrer">{body}</a> : <div>{body}</div>}</li>
          })}
        </ul>
      </section>

      <section className="wrap ab-believe" aria-labelledby="believe-h">
        <h2 className="ab-believe__h" id="believe-h">{t.believe.heading}</h2>
        <p className="ab-believe__q">{t.believe.text}</p>
      </section>

      <section className="wrap ab-vals" aria-labelledby="vals-h">
        <h2 className="h2" id="vals-h"><SoftBlurIn>{t.values.heading}</SoftBlurIn></h2>
        <ul>
          {t.values.items.map((v) => (
            <li key={v.title}><span className="ab-vals__ico"><Glyph icon={v.icon} /></span><h3>{v.title}</h3></li>
          ))}
        </ul>
      </section>

      <section className="wrap ab-doc" aria-labelledby="doc-h">
        <h2 className="h2" id="doc-h"><SoftBlurIn>{t.doctorSection.heading}</SoftBlurIn></h2>
        <p className="ab-doc__bio">{t.doctorSection.bio}</p>
      </section>

      <section className="wrap ab-steps" aria-labelledby="steps-h">
        <h2 className="h2" id="steps-h"><SoftBlurIn>{t.steps.heading}</SoftBlurIn></h2>
        <ol>
          {t.steps.items.map((s) => <li key={s.title}><h3>{s.title}</h3><p>{s.text}</p></li>)}
        </ol>
      </section>

      <section className="wrap ab-svc" aria-labelledby="svc-h">
        <h2 className="h2" id="svc-h"><SoftBlurIn>{t.servicesSection.heading}</SoftBlurIn></h2>
        <div className="ab-svc__cols">
          {t.servicesSection.groups.map((g) => (
            <div key={g.name}>
              <h3>{g.name}</h3>
              <ul>{g.items.map((s) => <li key={s.href}><Link href={s.href}>{s.name}</Link></li>)}</ul>
            </div>
          ))}
        </div>
        <Link className="tlink" href={t.servicesSection.allHref}>{t.servicesSection.all}</Link>
      </section>

      <section className="wrap ab-emg" aria-labelledby="emg-h2">
        <div className="ab-emg__panel">
          <div>
            <h2 id="emg-h2">{t.emergency.heading}</h2>
            <p className="ab-emg__t">{t.emergency.title}</p>
          </div>
          <div className="ab-emg__r">
            <p>{t.emergency.text}</p>
            <ul>{t.emergency.examples.map((x) => <li key={x}>{x}</li>)}</ul>
            <div className="ab-close__row">
              <a className="btn" href={clinic.phone.href}>{t.emergency.call} · {clinic.phone.label}</a>
              <Link className="tlink" href={t.emergency.moreHref}>{t.emergency.more}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap ab-office" aria-labelledby="office-h">
        <h2 className="h2" id="office-h"><SoftBlurIn>{t.office.heading}</SoftBlurIn></h2>
        <div className="ab-office__grid">
          <div>
            <h3>{t.office.addressLabel}</h3>
            <p><a href={clinic.mapsUrl} target="_blank" rel="noopener noreferrer">{clinic.address.street}<br />{clinic.address.city}, {clinic.address.state}<span className="sr-only"> {t.close.newTab}</span></a></p>
            <h3>{t.office.contactLabel}</h3>
            <p><a href={clinic.phone.href}>{clinic.phone.label}</a><br /><a href={`mailto:${clinic.email}`}>{clinic.email}</a></p>
          </div>
          <div>
            <h3>{t.office.hoursLabel}</h3>
            <dl className="ab-office__hours">
              {t.office.hours.map((h) => <div key={h.days}><dt>{h.days}</dt><dd>{h.time}</dd></div>)}
            </dl>
          </div>
        </div>
        <p className="ab-office__note"><Link className="tlink" href={t.office.outOfTownHref}>{t.office.outOfTown}</Link></p>
      </section>

      <section className="wrap ab-cover" aria-labelledby="cover-h">
        <h2 className="h2" id="cover-h"><SoftBlurIn>{t.cover.heading}</SoftBlurIn></h2>
        <div className="ab-cover__r">
          <p>{t.cover.text}</p>
          <p className="ab-cover__partners">{t.cover.partners.join(' · ')}</p>
          <div className="ab-close__row">
            {t.cover.links.map((l) => <Link key={l.href} className="tlink" href={l.href}>{l.label}</Link>)}
          </div>
        </div>
      </section>

      <section className="wrap ab-close" aria-labelledby="close-h">
        <div className="ab-close__panel">
          <h2 className="ab-close__t" id="close-h">{t.close.title}</h2>
          <div className="ab-close__r">
            <p>{t.close.text}</p>
            <div className="ab-close__row">
              <a className="btn" href={clinic.bookingUrl} target="_blank" rel="noopener noreferrer">{t.close.cta}<span className="sr-only"> {t.close.newTab}</span></a>
              <a className="tlink" href={clinic.phone.href}>{t.close.phone}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
