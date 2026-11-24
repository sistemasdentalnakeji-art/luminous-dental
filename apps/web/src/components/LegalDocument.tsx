import { useEffect, useState } from 'react'
import type { LegalBlock, LegalDoc } from '@/content/legal'

// Estructura de Dental Nakeji (pages/legal/LegalDocument.tsx): encabezado, índice a la izquierda y una tarjeta por sección.
// Sin el apilado de cartas de Nakeji (necesita animation-timeline y un scroll interno): aquí es una lista normal, igual en todos los tamaños.
function Block({ block }: { block: LegalBlock }) {
  if (typeof block === 'string') return <p>{block}</p>
  if ('h' in block) return <h3>{block.h}</h3>
  return <ul>{block.ul.map((item) => <li key={item}>{item}</li>)}</ul>
}

export function LegalDocument({ doc }: { doc: LegalDoc }) {
  const [active, setActive] = useState(doc.sections[0].id)

  // La sección que cruza la franja de arriba (bajo el menú) marca el índice.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { const hit = entries.find((e) => e.isIntersecting); if (hit) setActive(hit.target.id) },
      { rootMargin: '-20% 0px -70% 0px' },
    )
    document.querySelectorAll('.legal-card').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [doc])

  return (
    <>
      <section className="sec wrap pg legal" aria-labelledby="legal-h">
        <header className="legal-head">
          <p className="pill">{doc.eyebrow}</p>
          <h1 className="h2" id="legal-h">{doc.title}</h1>
          <p className="legal-lead">{doc.lead}</p>
          {doc.updated && <p className="legal-date">{doc.updated}</p>}
        </header>
        <div className="legal-doc">
          <nav className="legal-toc" aria-label={doc.tocLabel}>
            <p className="legal-toc__label">{doc.tocLabel}</p>
            <ol>
              {doc.sections.map((s) => (
                <li key={s.id}><a href={`#${s.id}`} aria-current={active === s.id ? 'location' : undefined}>{s.title}</a></li>
              ))}
            </ol>
          </nav>
          <div className="legal-body">
            {doc.sections.map((s) => (
              <section key={s.id} id={s.id} className="legal-card" aria-labelledby={`${s.id}-h`}>
                <h2 id={`${s.id}-h`}>{s.title}</h2>
                {s.blocks.map((b, i) => <Block key={i} block={b} />)}
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
