// Insurance & Financing, «El camino» (docs/diseno-aseguranzas-fuentes.md): una lista ordenada de 3 pasos unidos por una línea celeste.
// Paso 1 = buscador + muro de logos (components/InsurancePlans.tsx), paso 2 = el equipo lo revisa, paso 3 = pedir cita. Sin WhatsApp.
// La barra fija «Request / Call» del celular ya existe en todo el sitio (ActionBar de Layout.tsx); aquí no se repite.
import { InsurancePlans } from '@/components/InsurancePlans'
import { clinic } from '@/content/clinic'
import { home } from '@/content/home'
import { insuranceText as T } from '@/content/insurers'
import { Link } from '@/lib/router'

const { outOfTown } = home.coverage

function Actions() {
  return (
    <div className="ins-actions">
      <Link className="btn" href="/contact#appointment">{T.book}</Link>
      <a className="tlink" href={clinic.phone.href}>{home.footer.phone.label}</a>
    </div>
  )
}

export default function Insurance() {
  return (
    <>
      <section className="sec wrap pg" aria-labelledby="ins-h">
        <div className="ins-head">
          <p className="pill">{T.eyebrow}</p>
          <h1 className="h2" id="ins-h">{T.title}</h1>
          <p className="ins-lead">{T.lead}</p>
          <Actions />
        </div>
        <ol className="ins-path">
          <li className="ins-step">
            <span className="ins-dot" aria-hidden="true">1</span>
            <div>
              <h2 id="ins-grid-h">{T.steps[0]}</h2>
              <InsurancePlans variant="full" />
              <p className="ins-small">{T.note}</p>
            </div>
          </li>
          <li className="ins-step">
            <span className="ins-dot" aria-hidden="true">2</span>
            <div>
              <h2>{T.steps[1]}</h2>
              <p className="ins-text">{T.step2}</p>
              <p className="ins-small">{T.payment}</p>
            </div>
          </li>
          <li className="ins-step">
            <span className="ins-dot" aria-hidden="true">3</span>
            <div>
              <h2>{T.steps[2]}</h2>
              <p className="ins-text">{T.step3}</p>
              <Actions />
            </div>
          </li>
        </ol>
        <div className="cov-out ins-sahara">
          <h2>{outOfTown.heading}</h2>
          <p>{outOfTown.text}</p>
          <div><a className="tlink" href={outOfTown.cta.href} target="_blank" rel="noopener noreferrer">{outOfTown.cta.label}</a></div>
        </div>
      </section>
    </>
  )
}
