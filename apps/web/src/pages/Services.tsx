import { Appointment } from '@/components/Appointment'
import { serviceHref, services as list } from '@/content/clinic'
import { home } from '@/content/home'

const { services } = home

export default function Services() {
  return (
    <>
      <section className="sec wrap pg">
        <h1 className="h2" style={{ maxWidth: '14em' }}>{services.heading}</h1>
        {services.groups.map((g) => {
          const id = g.href.split('#')[1]
          return (
            <div className="svc-group" id={id} key={id}>
              <h2>{g.name}</h2>
              <p>{g.line}</p>
              <ul>{list.filter((s) => s.group === g.name).map((s) => <li key={s.name} id={serviceHref(s.name).split('#')[1]}>{s.name}</li>)}</ul>
            </div>
          )
        })}
      </section>
      <Appointment />
    </>
  )
}
