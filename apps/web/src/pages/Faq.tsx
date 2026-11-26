import { useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { Icon } from '@/components/Icon'
import { clinic } from '@/content/clinic'
import { faq as faqText } from '@/content/faq'
import { useLang, type Lang } from '@/lib/lang'
import '@/styles/faq.css'

// Estructura de Dental Nakeji (pages/faq/FaqPage.tsx, «Slit Type FAQ» de kedhareswer en 21st.dev): título que sube letra por letra, buscador, filtros por tema,
// contador y acordeón con barrido de relleno. Colores de Luminous (blanco sobre noche y azul medicina, sin el dorado, que es solo de piezas físicas).
const normalize = (text: string) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLocaleLowerCase()

export default function Faq() {
  const lang = useLang()
  return <FaqContent key={lang} lang={lang} />
}

function FaqContent({ lang }: { lang: Lang }) {
  const t = faqText[lang]
  const groups = t.groups(lang)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [open, setOpen] = useState<string | null>('appointments-1')
  const searchRef = useRef<HTMLInputElement>(null)
  const buttons = useRef(new Map<string, HTMLButtonElement>())
  const items = groups.flatMap((g) => g.items.map((item, i) => ({ ...item, id: `${g.id}-${i + 1}`, category: g.id, topic: g.title })))
  const words = normalize(query).trim().split(/\s+/).filter(Boolean)
  const visible = items.filter((item) => (category === 'all' || item.category === category) && words.every((w) => normalize(`${item.question} ${item.answer} ${item.topic}`).includes(w)))
  const reset = () => { setQuery(''); setCategory('all'); setOpen(null) }
  const onKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number
    if (event.key === 'ArrowDown') next = (index + 1) % visible.length
    else if (event.key === 'ArrowUp') next = (index - 1 + visible.length) % visible.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = visible.length - 1
    else return
    event.preventDefault()
    buttons.current.get(visible[next].id)?.focus()
  }

  return (
    <section className="sec wrap pg faq" aria-labelledby="faq-h">
      <header className="faq-head">
        <p className="pill">{t.eyebrow}</p>
        <h1 id="faq-h" className="faq-title">
          <span className="sr-only">{t.title}</span>
          {t.headline.map((line, l) => (
            <span className="faq-title__line" key={line} aria-hidden="true">
              {Array.from(line).map((ch, i) => <span className="faq-title__letter" key={i} style={{ '--letter': i + l * 8 } as CSSProperties}>{ch === ' ' ? ' ' : ch}</span>)}
            </span>
          ))}
        </h1>
        <div className="faq-intro">
          <p className="faq-intro__text">{t.lead}</p>
          <div className="faq-search" role="search" aria-label={t.search}>
            <label htmlFor="faq-search">{t.search}</label>
            <div className="faq-search__field">
              <Icon name="search" size={24} />
              <input id="faq-search" type="search" ref={searchRef} value={query} placeholder={t.placeholder} aria-controls="faq-results" onChange={(e) => { setQuery(e.target.value); setOpen(null) }} />
              {query && <button type="button" className="faq-search__clear" aria-label={t.clear} onClick={() => { setQuery(''); searchRef.current?.focus() }}><Icon name="close" size={22} /></button>}
            </div>
          </div>
        </div>
      </header>

      <div className="faq-filters" role="group" aria-label={t.categories}>
        {[{ id: 'all', title: t.all }, ...groups].map((g) => (
          <button key={g.id} type="button" aria-pressed={category === g.id} onClick={() => { setCategory(g.id); setOpen(null) }}>{g.title}</button>
        ))}
      </div>
      <p className="faq-count" role="status" aria-live="polite" aria-atomic="true">{`${String(visible.length).padStart(2, '0')} ${t.results}`}</p>

      <div className="faq-list" id="faq-results">
        {visible.map((item, index) => {
          const expanded = open === item.id
          return (
            <article className="faq-item" data-open={expanded} key={item.id}>
              <div className="faq-item__fill" aria-hidden="true" />
              <h2 className="faq-item__heading">
                <button className="faq-item__question" type="button" id={`q-${item.id}`} aria-expanded={expanded} aria-controls={`a-${item.id}`}
                  ref={(node) => { if (node) buttons.current.set(item.id, node); else buttons.current.delete(item.id) }}
                  onKeyDown={(e) => onKey(e, index)} onClick={() => setOpen(expanded ? null : item.id)}>
                  <span className="faq-item__row"><span>{item.question}</span><span className="faq-item__plus" aria-hidden="true">+</span></span>
                  <span className="faq-item__row faq-item__row--inverse" aria-hidden="true"><span>{item.question}</span><span className="faq-item__plus">+</span></span>
                </button>
              </h2>
              <div className="faq-item__panel" id={`a-${item.id}`} aria-labelledby={`q-${item.id}`} role="region" inert={!expanded}>
                <div className="faq-item__panel-inner"><p className="faq-item__answer">{item.answer}</p></div>
              </div>
            </article>
          )
        })}
        {visible.length === 0 && (
          <div className="faq-empty">
            <h2>{t.empty}</h2>
            <p>{t.emptyText}</p>
            <button type="button" className="btn btn-ghost" onClick={reset}>{t.reset}</button>
          </div>
        )}
      </div>

      <aside className="faq-help" aria-labelledby="faq-help-h">
        <div><h2 id="faq-help-h">{t.helpTitle}</h2><p>{t.helpText}</p></div>
        <div className="faq-help__cta">
          <a className="btn" href={clinic.phone.href}><Icon name="phone" size={20} />{t.call} {clinic.phone.label}</a>
          <a className="btn btn-ghost" href={clinic.bookingUrl} target="_blank" rel="noopener noreferrer">{t.book}<span className="sr-only"> {t.newTab}</span></a>
        </div>
      </aside>
    </section>
  )
}
