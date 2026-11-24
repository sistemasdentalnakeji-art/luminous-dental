import { useState, type ChangeEvent } from 'react'
import { dateRange, isBookable, slotsFor, timeLabel, todayLV } from '@/config/schedule'
import { home } from '@/content/home'
import { TimePicker } from './TimePicker'

const { when: t, errors } = home.appointment

type Props = { date: string; time: string; onDate: (d: string) => void; onTime: (t: string) => void; errDate?: string; errTime?: string }

/**
 * Día y hora de la cita, como en Dental Nakeji: campo de fecha del navegador (calendario nativo) + selector de hora en cuadrícula Morning / Afternoon.
 * Las reglas salen de config/schedule.ts: un día cerrado o festivo se vacía al instante con su aviso, y la hora depende del día elegido.
 */
export function BookingSchedule({ date, time, onDate, onTime, errDate, errTime }: Props) {
  const today = todayLV()
  const { min, max } = dateRange(today)
  const [closed, setClosed] = useState(false) // el día que eligió está cerrado (el campo se vació)
  const dateMsg = closed ? errors.dateInvalid : errDate // el aviso del día cerrado manda sobre el del envío anterior

  function onPickDate(e: ChangeEvent<HTMLInputElement>) {
    const input = e.currentTarget
    const ok = !input.value || isBookable(input.value, today)
    if (!ok) input.value = '' // día cerrado: el campo no se queda con un valor que no se puede pedir
    setClosed(!ok)
    onDate(ok ? input.value : '')
    if (time && !slotsFor(input.value, today).includes(time)) onTime('')
  }

  const slots = slotsFor(date, today) // vacío si aún no hay día
  const group = (label: string, list: string[]) => ({ label, options: list.map((s) => ({ value: s, label: timeLabel(s) })) })

  return (
    <>
      <div className={`f w2${dateMsg ? ' bad' : ''}`}>
        <label htmlFor="b-preferredDate">{t.legend}</label>
        <input id="b-preferredDate" name="preferredDate" type="date" min={min} max={max} required aria-describedby="e-preferredDate" aria-invalid={dateMsg ? true : undefined} onChange={onPickDate} />
        <p className="err" id="e-preferredDate" role={dateMsg ? 'alert' : undefined}>{dateMsg}</p>
      </div>
      <div className={`f w2${errTime ? ' bad' : ''}`}>
        <label htmlFor="b-preferredTime">{t.pickTime}</label>
        <TimePicker
          id="b-preferredTime"
          value={time}
          disabled={!slots.length}
          invalid={Boolean(errTime)}
          describedBy="e-preferredTime"
          placeholder={slots.length ? t.chooseTime : t.chooseDayFirst}
          groups={[group(t.morning, slots.filter((s) => s < '12:00')), group(t.afternoon, slots.filter((s) => s >= '12:00'))].filter((g) => g.options.length)}
          onChange={onTime}
        />
        <p className="err" id="e-preferredTime" role={errTime ? 'alert' : undefined}>{errTime}</p>
      </div>
    </>
  )
}
