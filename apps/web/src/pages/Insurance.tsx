import { Appointment } from '@/components/Appointment'
import { home } from '@/content/home'

const { insurance, outOfTown } = home.coverage

export default function Insurance() {
  return (
    <>
      <section className="sec wrap pg">
        <h1 className="h2">Insurance &amp; Financing</h1>
        <div className="cov" style={{ marginTop: 'clamp(32px,4vw,56px)' }}>
          <div className="cov-ins">
            <h2>{insurance.heading}</h2>
            <p>{insurance.text}</p>
          </div>
          <div className="cov-out">
            <h2>{outOfTown.heading}</h2>
            <p>{outOfTown.text}</p>
            <div><a className="tlink" href={outOfTown.cta.href} rel="noopener">{outOfTown.cta.label}</a></div>
          </div>
        </div>
      </section>
      <Appointment />
    </>
  )
}
