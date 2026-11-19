import { Appointment } from '@/components/Appointment'
import { home } from '@/content/home'

const { doctor, why } = home

export default function About() {
  return (
    <>
      <section className="sec wrap pg">
        <div className="doc">
          <div className="doc-l">
            <h1 className="h2">{doctor.heading}</h1>
            <p className="role">{doctor.role}</p>
          </div>
          <div className="doc-r">
            <p className="body">{doctor.text}</p>
            <p className="lang">{doctor.language}</p>
          </div>
        </div>
      </section>
      <section className="sec wrap" aria-labelledby="why-h">
        <h2 className="why-head" id="why-h">{why.heading}</h2>
        <ul className="why-small">
          {why.points.map((p) => <li key={p.title}><h3>{p.title}</h3><p>{p.text}</p></li>)}
        </ul>
      </section>
      <Appointment />
    </>
  )
}
