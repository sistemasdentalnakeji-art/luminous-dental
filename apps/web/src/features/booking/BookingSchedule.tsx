import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { addDays, dateRange, isBookable, slotsFor, timeLabel, todayLV, weekday } from '@/config/schedule'
import { home } from '@/content/home'

const t = home.appointment.when
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const utcFmt = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', ...o })
const monthFmt = utcFmt({ month: 'long', year: 'numeric' })
const fullFmt = utcFmt({ weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
const asDate = (ymd: string) => new Date(`${ymd}T00:00:00Z`)
const monthKey = (ymd: string) => ymd.slice(0, 7)
const clamp = (v: string, min: string, max: string) => (v < min ? min : v > max ? max : v)

/** Mueve la fecha enfocada un mes (conserva el día si existe en ese mes). */
function addMonths(ymd: string, n: number) {
  const d = asDate(ymd)
  const day = d.getUTCDate()
  d.setUTCDate(1)
  d.setUTCMonth(d.getUTCMonth() + n + 1, 0) // último día del mes destino
  d.setUTCDate(Math.min(day, d.getUTCDate()))
  return d.toISOString().slice(0, 10)
}

type Props = { date: string; time: string; onDate: (d: string) => void; onTime: (t: string) => void; errDate?: string; errTime?: string }

/** Calendario de mes + horarios del día. Cumple el patrón «date picker grid» de WAI-ARIA; los datos del horario salen de config/schedule.ts. */
export function BookingSchedule({ date, time, onDate, onTime, errDate, errTime }: Props) {
  const today = todayLV()
  const { min, max } = dateRange(today)
  const [focus, setFocus] = useState(() => clamp(date || min, min, max))
  const view = monthKey(focus) // el mes visible siempre es el del día enfocado
  const grid = useRef<HTMLTableElement>(null)
  const moved = useRef(false) // solo se mueve el foco real tras una tecla, no al pintar
  const id = useId()

  useEffect(() => {
    if (!moved.current) return
    moved.current = false
    grid.current?.querySelector<HTMLElement>(`[data-d="${focus}"]`)?.focus()
  }, [focus])

  const go = (to: string) => { moved.current = true; setFocus(clamp(to, min, max)) }

  function onKey(e: KeyboardEvent) {
    const step: Record<string, string> = {
      ArrowLeft: addDays(focus, -1),
      ArrowRight: addDays(focus, 1),
      ArrowUp: addDays(focus, -7),
      ArrowDown: addDays(focus, 7),
      Home: addDays(focus, -weekday(focus)),
      End: addDays(focus, 6 - weekday(focus)),
      PageUp: addMonths(focus, e.shiftKey ? -12 : -1),
      PageDown: addMonths(focus, e.shiftKey ? 12 : 1),
    }
    if (!(e.key in step)) return
    e.preventDefault()
    go(step[e.key])
  }

  // Semanas del mes visible (domingo primero); null = hueco fuera del mes.
  const first = `${view}-01`
  const length = asDate(addMonths(first, 1)).getTime() - asDate(first).getTime()
  const cells: (string | null)[] = [...Array(weekday(first)).fill(null), ...Array.from({ length: Math.round(length / 864e5) }, (_, i) => addDays(first, i))]
  while (cells.length % 7) cells.push(null)
  const weeks = Array.from({ length: cells.length / 7 }, (_, i) => cells.slice(i * 7, i * 7 + 7))

  const slots = date ? slotsFor(date) : []
  const pick = (d: string) => { if (isBookable(d)) { onDate(d); if (time && !slotsFor(d).includes(time)) onTime('') } }

  return (
    <>
      <div className={`f w2${errDate ? ' bad' : ''}`}>
        <span className="lbl" id={`${id}-l`}>{t.legend}</span>
        <div className="cal" role="group" aria-labelledby={`${id}-l`}>
          <div className="cal-head">
            <button type="button" className="cal-nav" aria-label={t.prev} disabled={view <= monthKey(min)} onClick={() => go(addMonths(focus, -1))}>‹</button>
            <div className="cal-title" id={`${id}-m`} aria-live="polite">{monthFmt.format(asDate(first))}</div>
            <button type="button" className="cal-nav" aria-label={t.next} disabled={view >= monthKey(max)} onClick={() => go(addMonths(focus, 1))}>›</button>
          </div>
          <table className="cal-grid" role="grid" ref={grid} aria-labelledby={`${id}-m`} aria-describedby="e-preferredDate" onKeyDown={onKey}>
            <thead>
              <tr>{DAYS.map((d) => <th key={d} scope="col" abbr={d}>{d.slice(0, 3)}</th>)}</tr>
            </thead>
            <tbody>
              {weeks.map((w, i) => (
                <tr key={i}>
                  {w.map((d, j) => {
                    if (!d) return <td key={j} />
                    const ok = isBookable(d, today)
                    const sel = d === date
                    return (
                      <td key={j} role="gridcell" aria-selected={ok ? sel : undefined}>
                        <button
                          type="button"
                          className={`cal-day${sel ? ' on' : ''}${d === today ? ' today' : ''}`}
                          data-d={d}
                          data-focus={d === focus ? 'preferredDate' : undefined}
                          tabIndex={d === focus ? 0 : -1}
                          aria-label={`${fullFmt.format(asDate(d))}${ok ? '' : ', not available'}`}
                          aria-disabled={ok ? undefined : true}
                          aria-current={d === today ? 'date' : undefined}
                          onClick={() => { setFocus(d); pick(d) }}
                        >{Number(d.slice(8))}</button>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="err" id="e-preferredDate" role={errDate ? 'alert' : undefined}>{errDate}</p>
      </div>

      {slots.length > 0 && <div className={`f w2${errTime ? ' bad' : ''}`}>
        <span className="lbl" id={`${id}-t`}>{t.pickTime}</span>
        {(
          <div className="slots" role="radiogroup" aria-labelledby={`${id}-t`} aria-describedby="e-preferredTime">
            {slots.map((s, i) => (
              <label key={s} className="slot">
                <input type="radio" name="preferredTime" value={s} checked={s === time} data-focus={i === 0 ? 'preferredTime' : undefined} onChange={() => onTime(s)} />
                <span>{timeLabel(s)}</span>
              </label>
            ))}
          </div>
        )}
        <p className="err" id="e-preferredTime" role={errTime ? 'alert' : undefined}>{errTime}</p>
      </div>}
    </>
  )
}
