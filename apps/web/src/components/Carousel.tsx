import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from 'react'
import { Icon } from '@/components/Icon'
import { ui } from '@/content/ui'
import { useLang } from '@/lib/lang'

// Basado en components/ui/Carousel.tsx de Dental Nakeji: pista con scroll-snap que se puede deslizar, desplazar, mover con las flechas del teclado (cuando la
// pista tiene el foco), con los botones de abajo o con los puntos. Si se da `tabs` es la variante «riel» (23-11-2026, r3): una pestaña con nombre por diapositiva en una lista vertical a la
// izquierda (fila deslizable arriba en celular), sin botones ni puntos; cada `item` aporta los dos hijos de su diapositiva (texto y figura). Una diapositiva por vista. Sin autoplay (así no hace falta control de pausa).
export function Carousel({ label, items, className, tabs }: { label: string; items: ReactNode[]; className?: string; tabs?: readonly string[] }) {
  const t = ui[useLang()].carousel
  const trackRef = useRef<HTMLUListElement>(null)
  const tabsRef = useRef<HTMLUListElement>(null)
  const [current, setCurrent] = useState(0)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const update = () => {
      const first = track.children[0] as HTMLElement | undefined
      const second = track.children[1] as HTMLElement | undefined
      const step = first && second ? second.offsetLeft - first.offsetLeft : track.clientWidth
      setCurrent(Math.min(items.length - 1, Math.max(0, Math.round(track.scrollLeft / step))))
      const max = track.scrollWidth - track.clientWidth
      track.parentElement?.style.setProperty('--p', String(max > 0 ? Math.min(1, Math.max(0, track.scrollLeft / max)) : 0))
      setCanPrev(track.scrollLeft > 2)
      setCanNext(track.scrollLeft < track.scrollWidth - track.clientWidth - 2)
    }
    const observer = new ResizeObserver(update)
    observer.observe(track)
    track.addEventListener('scroll', update, { passive: true })
    return () => {
      observer.disconnect()
      track.removeEventListener('scroll', update)
    }
  }, [items.length])

  // Con pestañas con nombre en pantalla angosta la fila se desplaza de lado: mantiene a la vista la pestaña actual (solo la fila, nunca la página).
  useEffect(() => {
    const row = tabsRef.current
    const tab = row?.children[current] as HTMLElement | undefined
    if (row && tab) row.scrollTo({ left: tab.offsetLeft - (row.clientWidth - tab.offsetWidth) / 2, behavior: 'auto' })
  }, [current])

  const behavior = () => (tabs || matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth') // con pestañas el cambio es directo más un fundido (D2, 26-11 r2)
  const goTo = (index: number) => {
    const track = trackRef.current
    const slide = track?.children[index] as HTMLElement | undefined
    if (track && slide) track.scrollTo({ left: slide.offsetLeft - track.offsetLeft - parseFloat(getComputedStyle(track).paddingLeft), behavior: behavior() })
  }

  // Riel: ↑ ↓ ← → mueven el foco y la diapositiva, Inicio y Fin van a la primera y la última.
  const onTabKeys = (event: KeyboardEvent<HTMLUListElement>) => {
    // Parte de la pestaña con el foco, no de `current`: con el desplazamiento suave `current` tarda en cambiar y dos pulsaciones seguidas se quedarían en una.
    const at = Array.from(tabsRef.current?.children ?? []).findIndex((li) => li.contains(document.activeElement))
    const keys: Record<string, number> = { ArrowDown: at + 1, ArrowRight: at + 1, ArrowUp: at - 1, ArrowLeft: at - 1, Home: 0, End: items.length - 1 }
    if (!(event.key in keys)) return
    event.preventDefault()
    const next = Math.min(items.length - 1, Math.max(0, keys[event.key]))
    ;(tabsRef.current?.children[next]?.firstElementChild as HTMLElement | undefined)?.focus()
    goTo(next)
  }

  if (tabs) {
    return (
      <div className={`sc${className ? ` ${className}` : ''}`} role="region" aria-roledescription="carousel" aria-label={label} style={{ '--i': current } as CSSProperties}>
        {/* El riel va primero en el DOM: el orden de Tab sigue al visual (riel, pista, botón de la diapositiva). */}
        <div className="sc__rail">
          <ul ref={tabsRef} className="sc__tabs" aria-label={t.slidesOf(label)} onKeyDown={onTabKeys}>
            {tabs.map((name, index) => (
              <li key={name}>
                <button type="button" className="sc__tab" tabIndex={index === current ? 0 : -1} aria-current={index === current ? 'true' : undefined} onClick={() => goTo(index)}>
                  <span>{name}</span>
                  <Icon name="chevronRight" size={18} />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="sc__view">
          <ul ref={trackRef} className="sc__track" tabIndex={0} aria-label={t.list(label)}>
            {items.map((item, index) => (
              <li key={index} className="sc__slide" data-on={index === current ? '' : undefined} inert={index !== current} aria-roledescription="slide" aria-label={t.slide(index + 1, items.length)}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className={`carousel${className ? ` ${className}` : ''}`} role="region" aria-roledescription="carousel" aria-label={label}>
      {/* Solo entra en el orden de Tab cuando hay algo que desplazar. */}
      <ul ref={trackRef} className="carousel__track" tabIndex={canPrev || canNext ? 0 : undefined} aria-label={t.list(label)}>
        {items.map((item, index) => (
          <li key={index} className="carousel__item" aria-roledescription="slide" aria-label={t.slide(index + 1, items.length)}>{item}</li>
        ))}
      </ul>
      <div className="carousel__controls" hidden={!canPrev && !canNext}>
        {/* aria-disabled (no disabled): el botón presionado conserva el foco cuando llega al final. */}
        <button type="button" className="carousel__button" onClick={() => canPrev && goTo(current - 1)} aria-disabled={!canPrev}>
          <Icon name="chevronLeft" size={20} />
          <span className="sr-only">{t.previous(label)}</span>
        </button>
        <ul className="carousel__dots" aria-label={t.slidesOf(label)}>
          {items.map((_, index) => (
            <li key={index}>
              <button type="button" className="carousel__dot" aria-label={t.goTo(index + 1, items.length)} aria-current={index === current ? 'true' : undefined} onClick={() => goTo(index)} />
            </li>
          ))}
        </ul>
        <button type="button" className="carousel__button" onClick={() => canNext && goTo(current + 1)} aria-disabled={!canNext}>
          <Icon name="chevronRight" size={20} />
          <span className="sr-only">{t.next(label)}</span>
        </button>
      </div>
    </div>
  )
}
