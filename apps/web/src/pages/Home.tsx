import { Appointment } from '@/components/Appointment'
import { ContactLocation } from '@/components/ContactLocation'
import { FeaturedServices } from '@/components/FeaturedServices'
import { FamilyCare } from '@/components/FamilyCare'
import { Hero } from '@/components/Hero'
import { InsurancePlans } from '@/components/InsurancePlans'
import { RevealText } from '@/components/RevealText'
import { Reviews } from '@/components/Reviews'
import { home } from '@/content/home'
import { Link } from '@/lib/router'

const { why, smile, coverage } = home
const whyIcons = [
  <><circle cx="12" cy="12" r="9" /><path d="M8 14c1 1.5 2.3 2.2 4 2.2s3-.7 4-2.2M9 9.5h.01M15 9.5h.01" /></>,
  <><circle cx="8" cy="8" r="2.5" /><circle cx="17" cy="9.5" r="2" /><path d="M3 19c0-3 2.2-5 5-5s5 2 5 5M14.5 14.5c.8-.4 1.5-.5 2.5-.5 2.2 0 4 1.6 4 4.5" /></>,
  <><path d="M12 3l8 3v6c0 4.5-3.4 7.8-8 9-4.6-1.2-8-4.5-8-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>,
]

export default function Home() {
  return (
    <>
      <Hero />

      <FamilyCare />

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

      <section className="wrap ins" id="insurance" aria-labelledby="ins-h">
        <header className="ins__top">
          <div>
            <RevealText className="ins__title" id="ins-h">{coverage.insurance.heading}</RevealText>
            <p className="ins__lead">{coverage.insurance.text}</p>
          </div>
          <Link className="tlink" href={coverage.insurance.cta.href}>{coverage.insurance.cta.label}</Link>
        </header>
        <InsurancePlans variant="home" />
        <div className="ins-out">
          <RevealText accent="out of town?">{coverage.outOfTown.heading}</RevealText>
          <div>
            <p>{coverage.outOfTown.text}</p>
            <a className="tlink" href={coverage.outOfTown.cta.href} target="_blank" rel="noopener noreferrer">{coverage.outOfTown.cta.label}</a>
          </div>
        </div>
      </section>

      <Reviews />

      <ContactLocation />
    </>
  )
}
