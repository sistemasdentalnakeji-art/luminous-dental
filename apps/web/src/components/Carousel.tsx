import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Icon } from '@/components/Icon'

// Based on Dental Nakeji's components/ui/Carousel.tsx: scroll-snap track that can be swiped, scrolled, moved with the arrow keys (when the
// track has focus), with the buttons underneath or with the dots (or, when `tabs` is given, with one named tab per slide). One slide per view. No autoplay (so no pause control is needed).
export function Carousel({ label, items, className, tabs }: { label: string; items: ReactNode[]; className?: string; tabs?: readonly string[] }) {
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

  // With named tabs on a narrow screen the row scrolls sideways: keep the current tab in view (the row only, never the page).
  useEffect(() => {
    const row = tabsRef.current
    const tab = row?.children[current] as HTMLElement | undefined
    if (row && tab) row.scrollTo({ left: tab.offsetLeft - (row.clientWidth - tab.offsetWidth) / 2, behavior: 'auto' })
  }, [current])

  const behavior = () => (matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth')
  const goTo = (index: number) => {
    const track = trackRef.current
    const slide = track?.children[index] as HTMLElement | undefined
    if (track && slide) track.scrollTo({ left: slide.offsetLeft - track.offsetLeft - parseFloat(getComputedStyle(track).paddingLeft), behavior: behavior() })
  }

  return (
    <div className={`carousel${className ? ` ${className}` : ''}`} role="region" aria-roledescription="carousel" aria-label={label}>
      {/* Only in the Tab order when there is something to scroll. */}
      <ul ref={trackRef} className="carousel__track" tabIndex={canPrev || canNext ? 0 : undefined} aria-label={`List: ${label}`}>
        {items.map((item, index) => (
          <li key={index} className="carousel__item" role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${items.length}`}>{item}</li>
        ))}
      </ul>
      <div className="carousel__controls" hidden={!canPrev && !canNext && !tabs}>
        {/* aria-disabled (not disabled): the pressed button keeps focus when it reaches the end. */}
        <button type="button" className="carousel__button" onClick={() => canPrev && goTo(current - 1)} aria-disabled={!canPrev}>
          <Icon name="chevronLeft" size={20} />
          <span className="sr-only">{`Previous: ${label}`}</span>
        </button>
        {tabs ? (
          <ul ref={tabsRef} className="carousel__tabs" aria-label={`Slides of ${label}`}>
            {tabs.map((name, index) => (
              <li key={name}>
                <button type="button" className="carousel__tab" aria-current={index === current ? 'true' : undefined} onClick={() => goTo(index)}>{name}</button>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="carousel__dots" aria-label={`Slides of ${label}`}>
            {items.map((_, index) => (
              <li key={index}>
                <button type="button" className="carousel__dot" aria-label={`Go to slide ${index + 1} of ${items.length}`} aria-current={index === current ? 'true' : undefined} onClick={() => goTo(index)} />
              </li>
            ))}
          </ul>
        )}
        <button type="button" className="carousel__button" onClick={() => canNext && goTo(current + 1)} aria-disabled={!canNext}>
          <Icon name="chevronRight" size={20} />
          <span className="sr-only">{`Next: ${label}`}</span>
        </button>
      </div>
    </div>
  )
}
