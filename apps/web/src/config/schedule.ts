/**
 * Horario de la clínica para el selector de fecha y hora de la cita: UN solo lugar.
 * Todo se calcula en hora de Las Vegas, aunque el visitante esté en otra zona.
 * Las fechas viajan como texto «AAAA-MM-DD» y las horas como «HH:MM» (24 h).
 */
export const schedule = {
  timeZone: 'America/Los_Angeles',
  // POR CONFIRMAR: horario real de la clínica (hay tres versiones en datos.md). Valores de ejemplo.
  // Días abiertos: 0 = domingo … 6 = sábado. Un día que no está aquí está cerrado.
  hours: {
    2: { open: '08:00', close: '17:00' },
    3: { open: '08:00', close: '17:00' },
    4: { open: '08:00', close: '17:00' },
    5: { open: '08:00', close: '17:00' },
    6: { open: '08:00', close: '13:00' },
  } as Record<number, { open: string; close: string }>,
  slotMinutes: 30, // duración de cada espacio; el último termina a la hora de cierre
  holidays: ['2026-11-26', '2026-12-25', '2027-01-01'] as string[], // POR CONFIRMAR: días festivos cerrados
  minDaysAhead: 1, // 1 = no se puede el mismo día
  maxDaysAhead: 60,
}

const DATE_OK = /^\d{4}-\d{2}-\d{2}$/
const TIME_OK = /^\d{2}:\d{2}$/
const utc = (ymd: string) => { const [y, m, d] = ymd.split('-').map(Number); return new Date(Date.UTC(y, m - 1, d)) }
const ymdOf = (d: Date) => d.toISOString().slice(0, 10)
const toMin = (hm: string) => { const [h, m] = hm.split(':').map(Number); return h * 60 + m }

/** Suma días a una fecha «AAAA-MM-DD». */
export const addDays = (ymd: string, n: number) => ymdOf(new Date(utc(ymd).getTime() + n * 864e5))
/** Día de la semana de una fecha (0 = domingo). */
export const weekday = (ymd: string) => utc(ymd).getUTCDay()

/** «Hoy» en Las Vegas. */
export const todayLV = () => new Intl.DateTimeFormat('en-CA', { timeZone: schedule.timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date())

/** Primera y última fecha que se pueden pedir. */
export function dateRange(today = todayLV()) {
  return { min: addDays(today, schedule.minDaysAhead), max: addDays(today, schedule.maxDaysAhead) }
}

/** ¿Se puede pedir cita ese día? (formato válido, dentro del rango, día abierto y no festivo). */
export function isBookable(ymd: string, today = todayLV()) {
  if (!DATE_OK.test(ymd) || ymdOf(utc(ymd)) !== ymd) return false
  const { min, max } = dateRange(today)
  return ymd >= min && ymd <= max && !schedule.holidays.includes(ymd) && weekday(ymd) in schedule.hours
}

/** Horas «HH:MM» disponibles ese día (vacío si está cerrado). */
export function slotsFor(ymd: string, today = todayLV()): string[] {
  if (!isBookable(ymd, today)) return []
  const { open, close } = schedule.hours[weekday(ymd)]
  const out: string[] = []
  for (let t = toMin(open); t + schedule.slotMinutes <= toMin(close); t += schedule.slotMinutes) {
    out.push(`${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`)
  }
  return out
}

/** «14:30» → «2:30 PM». */
export function timeLabel(hm: string) {
  const [h, m] = hm.split(':').map(Number)
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`
}

/** Revisa la pareja fecha + hora; devuelve el primer problema o null. */
export function checkSlot(date: string, time: string): 'dateMissing' | 'dateInvalid' | 'timeMissing' | 'timeInvalid' | null {
  if (!date) return 'dateMissing'
  if (!isBookable(date)) return 'dateInvalid'
  if (!time) return 'timeMissing'
  return TIME_OK.test(time) && slotsFor(date).includes(time) ? null : 'timeInvalid'
}
