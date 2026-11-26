import { clinicText } from '@/content/clinic'
import { useLang } from '@/lib/lang'

/** Horario de la clínica (content/clinic.ts, confirmado por la dueña el 25-11): Contact, ubicación y pie leen esta misma lista. */
export function Hours({ className = '' }: { className?: string }) {
  return (
    <dl className={`hours ${className}`.trim()}>
      {clinicText[useLang()].hours.map((r) => (
        <div key={r.days} className="hours__row">
          <dt>{r.days}</dt>
          <dd>{r.time}</dd>
        </div>
      ))}
    </dl>
  )
}
