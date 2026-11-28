// Hub de servicios (r10): sección nueva desde cero. Las tres categorías (General, Cosmética, Ortodoncia) y un clic a cada servicio; sin tarjetas de color, sin filas de línea ni tabla (r8c, r9).
// Cada grupo conserva su ancla (/en/services#cosmetic). Textos de la página en content/services.ts (serviceText); la línea de relleno en content/servicesHub.ts. Estilos: styles/services-lines.css (bloque «r10»).
import { Icon } from '@/components/Icon'
import { hrefOf } from '@/config/routes'
import { home } from '@/content/home'
import { servicesOf, serviceText } from '@/content/services'
import { servicesHubText } from '@/content/servicesHub'
import { useLang } from '@/lib/lang'
import { Link } from '@/lib/router'
import '@/styles/services-lines.css'

export default function Services() {
  const lang = useLang()
  const T = serviceText[lang], H = servicesHubText[lang]
  const groups = home[lang].services.groups
  const all = servicesOf(lang)
  return (
    <section className="sec wrap pg lines svx hx" aria-labelledby="svc-hub-h">
      <header className="hub-hero">
        <p className="pill">{T.eyebrow}</p>
        <h1 className="h2" id="svc-hub-h">{T.hub.title} <span className="accent">{T.hub.accent}</span></h1>
        <p className="hub-lead">{T.hub.lead}</p>
      </header>
      <div className="hx-groups">
        {groups.map((g) => (
          <section className="hx-group" id={g.id} key={g.id} aria-labelledby={`${g.id}-h`}>
            <h2 className="hx-title" id={`${g.id}-h`}>{g.name}</h2>
            <p className="hx-intro">{g.line}</p>
            <ul className="hx-list">
              {all.filter((s) => s.groupId === g.id).map((s) => (
                <li key={s.id}>
                  <Link className="hx-link" href={hrefOf(`service:${s.id}`, lang)}>
                    <span className="hx-star aura" aria-hidden="true"><Icon name={s.icon} size={24} /></span>
                    <span className="hx-name">{s.name}</span>
                    <span className="hx-line">{s.subtitle || H.noLine}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  )
}
