import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react'
import { Icon, type IconName } from '@/components/Icon'
import { SoftBlurIn } from '@/components/SoftBlurIn'
import type { LegalBlock, LegalDoc } from '@/content/legal'
import '@/styles/soft-blur.css'

// Estructura y animación de Dental Nakeji (pages/legal/LegalDocument.tsx): encabezado con fecha en chip, índice con marcas y una carta con ícono por sección.
// Escritorio (≥960 px, ≥600 px de alto, sin «reducir movimiento» ni pausa): las cartas se apilan dentro de una ventana con su propio scroll (solo CSS: sticky + animation-timeline: view()).
// Sin soporte de animation-timeline, con movimiento reducido, en pantalla baja o en celular y tableta es una lista normal (en celular, desplegables con la primera abierta).
// Un ícono por id de sección; si llega uno nuevo, usa «document».
const ICONS: Record<string, IconName> = {
  who: 'shield', collect: 'document', info: 'document', use: 'check', requests: 'calendar', health: 'lock', share: 'share', texts: 'message', cookies: 'search',
  security: 'lock', keep: 'clock', children: 'users', changes: 'refresh', contact: 'mail', cancel: 'clock', pricing: 'scale', insurance: 'shield', results: 'help', ip: 'star', liability: 'scale', law: 'scale',
}

function Block({ block }: { block: LegalBlock }) {
  if (typeof block === 'string') return <p>{block}</p>
  if ('h' in block) return <h3>{block.h}</h3>
  return <ul>{block.ul.map((item) => <li key={item}>{item}</li>)}</ul>
}

// Misma condición que el apilado de legal.css.
const STACK_QUERY = '(min-width: 960px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)'
const MIN_CARD = 176 // px: alto mínimo de una carta (encabezado + unas líneas)

// Cada carta mide lo que pide su texto (con tope en el alto máximo de legal.css) en vez de ser todas igual de altas y quedar vacías.
// Una carta tapada se recorta por abajo (--cut) hasta quedar por encima del borde inferior de la que la cubre, para que nunca asome (técnica de Nakeji).
function fitCards(deck: HTMLElement) {
  const cards = Array.from(deck.querySelectorAll<HTMLElement>(':scope > .legal-card'))
  deck.style.removeProperty('--card-fit')
  deck.style.removeProperty('--h-last')
  cards.forEach((card) => ['--h', '--h-prev', '--cut', '--cut-at'].forEach((p) => card.style.removeProperty(p)))
  if (!window.matchMedia(STACK_QUERY).matches || cards.length < 2) return

  const cap = cards[0].offsetHeight // sin --h, cada carta mide el tope
  const off = parseFloat(getComputedStyle(deck).getPropertyValue('--off')) || 18
  cards.forEach((card) => (card.style.height = 'auto'))
  const natural = cards.map((card) => card.offsetHeight)
  cards.forEach((card) => card.style.removeProperty('height'))

  const heights = natural.map((px) => Math.min(cap, Math.max(MIN_CARD, Math.ceil(px))))
  const last = cards.length - 1
  const fit = Math.max(...heights)
  let bound = last * off + heights[last]
  for (let i = last - 1; i >= 0; i--) {
    const scale = 1 - (cards.length - i) * 0.018
    const cut = Math.max(0, heights[i] - (bound - 4 - i * off) / scale)
    cards[i].style.setProperty('--cut', `${cut}px`)
    cards[i].style.setProperty('--cut-at', `${fit + last * off - (i * off + heights[i])}px`)
    bound = i * off + (heights[i] - cut) * scale
  }
  cards.forEach((card, i) => {
    card.style.setProperty('--h', `${heights[i]}px`)
    if (i > 0) card.style.setProperty('--h-prev', `${heights[i - 1]}px`)
  })
  deck.style.setProperty('--card-fit', `${fit}px`)
  deck.style.setProperty('--h-last', `${heights[last]}px`)
}

export function LegalDocument({ doc }: { doc: LegalDoc }) {
  const { sections } = doc
  const [active, setActive] = useState(sections[0].id)
  const [open, setOpen] = useState<string | null>(sections[0].id)
  const [stacked, setStacked] = useState(false)
  const [scrollable, setScrollable] = useState<string[]>([]) // cartas cuyo texto no cabe: solo ellas necesitan foco para leerse con el teclado
  const deckRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const deck = deckRef.current
    if (!deck) return
    // Hay apilado cuando la ventana tiene scroll propio (el CSS solo se lo da en escritorio).
    const range = () => deck.scrollHeight - deck.clientHeight
    let width = 0
    const resize = new ResizeObserver(() => {
      if (deck.clientWidth !== width) { width = deck.clientWidth; fitCards(deck) }
      setStacked(range() > 1)
      setScrollable(Array.from(deck.querySelectorAll<HTMLElement>('.legal-card__body')).flatMap((el) => (el.scrollHeight > el.clientHeight + 1 ? [el.closest('section')!.id] : [])))
    })
    resize.observe(deck)
    void document.fonts?.ready.then(() => { fitCards(deck); setScrollable(Array.from(deck.querySelectorAll<HTMLElement>('.legal-card__body')).flatMap((el) => (el.scrollHeight > el.clientHeight + 1 ? [el.closest('section')!.id] : []))) })
    // Con apilado la carta activa sale del scroll de la ventana (la carta i queda fija en i/(n-1) del recorrido)...
    const onScroll = () => {
      const last = sections.length - 1
      if (range() > 1) setActive(sections[Math.min(last, Math.max(0, Math.round((deck.scrollTop / range()) * last)))].id)
    }
    deck.addEventListener('scroll', onScroll, { passive: true })
    // ...y sin apilado, la que cruza la franja de arriba (bajo el menú).
    const observer = new IntersectionObserver(
      (entries) => { const hit = entries.find((e) => e.isIntersecting); if (hit && range() <= 1) setActive(hit.target.id) },
      { rootMargin: '-20% 0px -70% 0px' },
    )
    deck.querySelectorAll('section').forEach((el) => observer.observe(el))
    return () => { resize.disconnect(); deck.removeEventListener('scroll', onScroll); observer.disconnect() }
  }, [sections])

  // Con apilado un ancla normal solo funcionaría una vez (la ventana tiene su scroll): se lleva la ventana a la carta elegida.
  function goTo(event: MouseEvent<HTMLAnchorElement>, index: number) {
    setActive(sections[index].id)
    setOpen(sections[index].id)
    if (showCard(index)) event.preventDefault()
  }

  // Lleva la ventana apilada a la carta; false si no hay apilado.
  function showCard(index: number) {
    const deck = deckRef.current
    const max = deck ? deck.scrollHeight - deck.clientHeight : 0
    if (!deck || max <= 1) return false
    const behavior = document.documentElement.hasAttribute('data-motion-paused') ? 'auto' : 'smooth'
    deck.scrollIntoView({ block: 'center', behavior })
    deck.scrollTo({ top: (max / (sections.length - 1)) * index, behavior })
    return true
  }

  return (
    <section className="sec wrap pg legal" aria-labelledby="legal-h">
      <header className="legal-head">
        <p className="pill">{doc.eyebrow}</p>
        <h1 className="h2" id="legal-h"><SoftBlurIn>{doc.title}</SoftBlurIn></h1>
        <p className="legal-lead">{doc.lead}</p>
        {doc.updated && <p className="legal-date"><Icon name="calendar" size={18} />{doc.updated}</p>}
      </header>
      <div className="legal-doc">
        <nav className="legal-toc" aria-label={doc.tocLabel}>
          <p className="legal-toc__label">{doc.tocLabel}</p>
          <ol>
            {sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} aria-current={active === s.id ? 'location' : undefined} onClick={(e) => goTo(e, i)}><span className="legal-toc__tick" aria-hidden="true" />{s.title}</a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="legal-body legal-deck" role="region" tabIndex={0} aria-label={doc.tocLabel} ref={deckRef} style={{ '--n': sections.length } as CSSProperties}>
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="legal-card" data-open={open === s.id ? '' : undefined} aria-labelledby={`${s.id}-h`}
              // Con Tab, al enfocar el texto de una carta tapada la ventana se desplaza hasta ella.
              onFocus={() => { if (stacked && active !== s.id) { setActive(s.id); showCard(i) } }}
              style={{ '--i': i, '--tl': `--lg${i}`, '--tl-next': `--lg${i + 1}`, '--scale': 1 - (sections.length - i) * 0.018 } as CSSProperties}>
              <header className="legal-card__head">
                <span className="legal-card__icon" aria-hidden="true"><Icon name={ICONS[s.id] ?? 'document'} size={24} /></span>
                <h2 id={`${s.id}-h`}>{s.title}</h2>
                {/* Solo celular y tableta (en escritorio está oculto): abre y cierra la sección. */}
                <button type="button" className="legal-card__toggle" aria-expanded={open === s.id} aria-labelledby={`${s.id}-h`} onClick={() => setOpen(open === s.id ? null : s.id)}>
                  <Icon name="chevronDown" size={22} />
                </button>
              </header>
              {/* Con apilado el texto largo se desplaza por dentro de la carta (enfocable para el teclado). */}
              <div className="legal-card__body" tabIndex={stacked && scrollable.includes(s.id) ? 0 : undefined}>{s.blocks.map((b, j) => <Block key={j} block={b} />)}</div>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}
