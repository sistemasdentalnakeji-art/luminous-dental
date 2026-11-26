import type { ReactNode } from 'react'
import { Icon } from '@/components/Icon'
import { RevealText } from '@/components/RevealText'
import { clinic, clinicText } from '@/content/clinic'
import { bookVisitText } from '@/content/bookVisit'
import { financers } from '@/content/financing'
import { useLang } from '@/lib/lang'

/** bare: sin sección ni tarjeta (Contact la pone en su propia columna). */
function Outer({ bare, children, ...p }: { bare: boolean; children: ReactNode; className: string; id: string; "aria-labelledby": string }) {
  return bare ? <div>{children}</div> : <section {...p}>{children}</section>
}

/**
 * Sección informativa del inicio y de Contact (sin campos): qué pasa al reservar y un botón grande a la reserva de Adit (otra pestaña, noopener).
 * La clínica agenda y cobra en Adit (clinic.bookingUrl). Tarjeta de vidrio como el resto del inicio; estilos .bv* en styles/home-b1.css.
 */
export function BookVisit({ bare = false }: { bare?: boolean }) {
  const lang = useLang()
  const t = bookVisitText[lang]
  const hours = clinicText[lang].hours.slice(0, 2).map((r) => `${r.days}: ${r.time}`).join(' · ')
  const names = new Intl.ListFormat(lang, { style: 'long', type: 'conjunction' }).format(financers.map((f) => f.name))
  const points = [
    { icon: 'clock', title: t.points.hours, text: hours },
    { icon: 'shield', title: t.points.insurance.title, text: t.points.insurance.text },
    { icon: 'card', title: t.points.financing.title, text: t.points.financing.text(names) },
  ] as const
  return (
    <Outer bare={bare} className="wrap appt-sec" id={t.id} aria-labelledby="appt-h">
      <div className={bare ? "bv bv--bare" : "book bv"}>
        <svg className="bv__star" viewBox="-10 -10 120 120" aria-hidden="true" focusable="false">
          <defs><linearGradient id="bv-star" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff" /><stop offset=".45" stopColor="#8fe3e8" /><stop offset="1" stopColor="#34bfcc" /></linearGradient></defs>
          <path d="M50 0C54 30 70 46 100 50C70 54 54 70 50 100C46 70 30 54 0 50C30 46 46 30 50 0Z" fill="url(#bv-star)" />
        </svg>
        <div className="bv__intro">
          <RevealText className="h2" id="appt-h" accent={t.accent}>{t.heading}</RevealText>
          <p>{t.text}</p>
          <p className="bv__emg"><Icon name="phone" size={18} />{t.emergency}</p>
        </div>
        <div className="bv__main">
          <ul className="bv__points">
            {points.map((p) => (
              <li key={p.title}>
                <span className="bv__icon" aria-hidden="true"><Icon name={p.icon} size={22} /></span>
                <div><h3>{p.title}</h3><p>{p.text}</p></div>
              </li>
            ))}
          </ul>
          <div className="book__cta">
            <a className="btn bv__book" href={clinic.bookingUrl} target="_blank" rel="noopener noreferrer">{t.cta}<Icon name="arrowRight" size={20} /><span className="sr-only"> {t.newTab}</span></a>
            <a className="btn btn-ghost bv__call" href={clinic.phone.href}><span className="bv__call-l">{t.call}</span><span className="nw">{clinic.phone.label}</span></a>
          </div>
        </div>
      </div>
    </Outer>
  )
}
