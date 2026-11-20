// Insurance & Financing, same structure as Dental Nakeji's insurance page (eyebrow, title, lead, 3-step card, board of logos), adapted to
// Luminous: the button asks for an appointment (the form is on this page), no WhatsApp, no "Back to Benefits". SAHARA card goes under the board.
import { Appointment } from '@/components/Appointment'
import { InsuranceGrid } from '@/components/InsuranceGrid'
import { clinic } from '@/content/clinic'
import { home } from '@/content/home'
import { insuranceText as T } from '@/content/insurers'

const { outOfTown } = home.coverage

export default function Insurance() {
  return (
    <>
      <section className="sec wrap pg" aria-labelledby="ins-h">
        <div className="ins-head">
          <div>
            <p className="pill">{T.eyebrow}</p>
            <h1 className="h2" id="ins-h">{T.title}</h1>
            <p className="ins-lead">{T.lead}</p>
          </div>
          <div className="ins-steps-card">
            <ol className="ins-steps">{T.steps.map((s) => <li key={s}>{s}</li>)}</ol>
            <div className="ins-actions">
              <a className="btn" href="#appointment">{T.book}</a>
              <a className="tlink" href={clinic.phone.href}>{home.footer.phone.label}</a>
            </div>
          </div>
        </div>
        <section className="insurers" aria-labelledby="ins-grid-h">
          <h2 className="insurers__title" id="ins-grid-h">{T.gridTitle}</h2>
          <InsuranceGrid />
          <p className="insurers__note">{T.note}</p>
          <p className="ins-pay">{T.payment}</p>
        </section>
        <div className="cov-out ins-sahara">
          <h2>{outOfTown.heading}</h2>
          <p>{outOfTown.text}</p>
          <div><a className="tlink" href={outOfTown.cta.href} target="_blank" rel="noopener noreferrer">{outOfTown.cta.label}</a></div>
        </div>
      </section>
      <Appointment />
    </>
  )
}
