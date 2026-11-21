import { Appointment } from '@/components/Appointment'
import { ContactLocation } from '@/components/ContactLocation'
import { FeaturedServices } from '@/components/FeaturedServices'
import { Hero } from '@/components/Hero'
import { RevealText } from '@/components/RevealText'
import { Reviews } from '@/components/Reviews'
import { home } from '@/content/home'
import { Link } from '@/lib/router'

const { services, why, doctor, smile, coverage } = home
const arcs = ['gen', 'cos', 'ort', 'ped'] as const // mismo orden que services.groups
const whyIcons = [
  <><circle cx="12" cy="12" r="9" /><path d="M8 14c1 1.5 2.3 2.2 4 2.2s3-.7 4-2.2M9 9.5h.01M15 9.5h.01" /></>,
  <><circle cx="8" cy="8" r="2.5" /><circle cx="17" cy="9.5" r="2" /><path d="M3 19c0-3 2.2-5 5-5s5 2 5 5M14.5 14.5c.8-.4 1.5-.5 2.5-.5 2.2 0 4 1.6 4 4.5" /></>,
  <><path d="M12 3l8 3v6c0 4.5-3.4 7.8-8 9-4.6-1.2-8-4.5-8-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>,
]

export default function Home() {
  return (
    <>
      <Hero />

      <section className="wrap ringsec" id="doctor">
        <div className="stage">
          <div className="ringbox">
            <div className="glow" aria-hidden="true" />
            <svg className="ring" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
              {[184.5, 274.5, 4.5, 94.5].map((deg, i) => (
                <circle key={deg} className={`arc arc-${arcs[i]}`} cx="50" cy="50" r="47" pathLength="100" strokeDasharray="22.5 77.5" transform={`rotate(${deg} 50 50)`} />
              ))}
            </svg>
            <div className="portrait"><img src={`${import.meta.env.BASE_URL}dr-hahn.jpg`} alt={doctor.photoAlt} width="734" height="737" /></div>
            <span className="key" aria-hidden="true" />
          </div>
          {services.groups.map((g, i) => (
            <Link key={g.name} className={`lbl l-${arcs[i]}`} href={g.href}><strong>{g.name}</strong></Link>
          ))}
        </div>
        <p className="ring-cap"><strong>{doctor.name}, {doctor.role}</strong><Link className="tlink" href={doctor.meet.href}>{doctor.meet.label}</Link></p>
      </section>

      <Appointment />

      <svg className="ridge" viewBox="0 30 1440 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="rf" x1="0" y1="0" x2="0" y2="1"><stop offset=".3" stopColor="#0e1d38" /><stop offset="1" stopColor="#0e1d38" stopOpacity="0" /></linearGradient>
          <linearGradient id="rn" x1="0" y1="0" x2="0" y2="1"><stop offset=".2" stopColor="#0a1529" /><stop offset="1" stopColor="#0a1529" stopOpacity="0" /></linearGradient>
        </defs>
        <path className="ridge-far ridge-farfade" style={{ stroke: 'none' }} d="M0 92 L80 70 L170 86 L260 52 L350 80 L450 40 L540 72 L640 58 L740 88 L850 48 L950 76 L1060 36 L1160 74 L1260 56 L1350 82 L1440 62 L1440 130 L0 130Z" />
        <path className="ridge-line" d="M0 92 L80 70 L170 86 L260 52 L350 80 L450 40 L540 72 L640 58 L740 88 L850 48 L950 76 L1060 36 L1160 74 L1260 56 L1350 82 L1440 62" />
        <path className="ridge-near ridge-fade" d="M0 114 L120 96 L230 110 L340 90 L470 112 L600 98 L720 116 L860 94 L980 110 L1100 92 L1230 112 L1340 98 L1440 110 L1440 130 L0 130Z" />
      </svg>

      <section className="sec wrap" id="services" aria-labelledby="svc-h">
        <RevealText className="h2" id="svc-h" style={{ maxWidth: '14em' }} accent="whole family">{services.heading}</RevealText>
        <ul className="svc-list">
          {services.groups.map((g) => (
            <li key={g.name}><Link className="row" href={g.href}><h3>{g.name}</h3><p>{g.line}</p></Link></li>
          ))}
        </ul>
        <div className="svc-more"><Link className="btn btn-ghost" href={services.cta.href}>{services.cta.label}</Link></div>
      </section>

      <FeaturedServices />

      <section className="sec wrap" aria-labelledby="why-h">
        <RevealText className="why-head" id="why-h" accent="Luminous Dental">{why.heading}</RevealText>
        <div className="why-big">
          <h3>{why.points[0].title}</h3>
          <p>{why.points[0].text}</p>
        </div>
        <ul className="why-small">
          {why.points.slice(1).map((p, i) => (
            <li key={p.title}>
              <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">{whyIcons[i]}</svg>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap smile-sec">
        <div className="smile">
          <RevealText className="h2" accent="smile?">{smile.heading}</RevealText>
          <div className="smile-r">
            <p>{smile.text}</p>
            <div className="smile-cta">
              <a className="btn" href={smile.cta.href}>{smile.cta.label}</a>
              <Link className="tlink" href={smile.more.href}>{smile.more.label}</Link>
            </div>
            <p className="disc">{smile.disclaimer}</p>
          </div>
        </div>
      </section>

      <section className="wrap cov-sec" id="insurance">
        <div className="cov">
          <div className="cov-ins">
            <RevealText>{coverage.insurance.heading}</RevealText>
            <p>{coverage.insurance.text}</p>
            <Link className="tlink" href={coverage.insurance.cta.href}>{coverage.insurance.cta.label}</Link>
          </div>
          <div className="cov-out">
            <RevealText accent="out of town?">{coverage.outOfTown.heading}</RevealText>
            <p>{coverage.outOfTown.text}</p>
            <div><a className="tlink" href={coverage.outOfTown.cta.href} target="_blank" rel="noopener noreferrer">{coverage.outOfTown.cta.label}</a></div>
          </div>
        </div>
      </section>

      <Reviews />

      <ContactLocation />
    </>
  )
}
