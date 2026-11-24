// Selector de hora del formulario de citas, como el de Dental Nakeji (features/booking/Picker.tsx): un botón que abre una cuadrícula de horarios agrupada en Morning / Afternoon.
// Patrón ARIA «select-only combobox»: botón con role="combobox" + role="listbox". Teclado: flechas, Inicio/Fin, Enter o Espacio, Esc. La hora elegida la guarda el formulario (no hay campo oculto).
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import '@/styles/time-picker.css'

export type TimeGroup = { label: string; options: { value: string; label: string }[] }

type Props = {
  id: string
  value: string
  groups: TimeGroup[]
  placeholder: string
  disabled?: boolean
  invalid?: boolean
  describedBy?: string
  onChange: (value: string) => void
}

const COLS = 3 // columnas de la cuadrícula (time-picker.css): las flechas arriba y abajo saltan de 3 en 3

export function TimePicker({ id, value, groups, placeholder, disabled, invalid, describedBy, onChange }: Props) {
  const listId = useId()
  const options = groups.flatMap((g) => g.options)
  const selected = options.find((o) => o.value === value)
  const [wantsOpen, setOpen] = useState(false)
  const open = wantsOpen && !disabled
  const [active, setActive] = useState(0)
  const root = useRef<HTMLDivElement>(null)
  const button = useRef<HTMLButtonElement>(null)
  const list = useRef<HTMLDivElement>(null)
  const byPointer = useRef(false) // la opción activa la movió el mouse: ya está a la vista, no hay que desplazar nada
  const optionId = (i: number) => `${listId}-${i}`

  // Clic o toque fuera: se cierra.
  useEffect(() => {
    if (!open) return
    const close = (e: PointerEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [open])

  // Al abrir, el foco pasa a la lista (sin saltar la página); al mover la opción activa, se mantiene a la vista.
  useEffect(() => { if (open) list.current?.focus({ preventScroll: true }) }, [open])
  useEffect(() => {
    if (open && !byPointer.current) document.getElementById(`${listId}-${active}`)?.scrollIntoView({ block: 'nearest' })
  }, [open, active, listId])

  const show = () => { byPointer.current = false; setActive(Math.max(0, options.findIndex((o) => o.value === value))); setOpen(true) }
  const pick = (i: number) => {
    const o = options[i]
    if (!o) return
    setOpen(false)
    button.current?.focus()
    onChange(o.value)
  }

  function onButtonKey(e: KeyboardEvent) {
    if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) { e.preventDefault(); show() }
  }

  function onListKey(e: KeyboardEvent) {
    const last = options.length - 1
    const move: Record<string, number> = { ArrowDown: COLS, ArrowUp: -COLS, ArrowRight: 1, ArrowLeft: -1 }
    byPointer.current = false
    if (e.key in move) { e.preventDefault(); setActive((i) => Math.min(last, Math.max(0, i + move[e.key]))) }
    else if (e.key === 'Home' || e.key === 'End') { e.preventDefault(); setActive(e.key === 'Home' ? 0 : last) }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(active) }
    else if (e.key === 'Escape') { e.preventDefault(); setOpen(false); button.current?.focus() }
    else if (e.key === 'Tab') setOpen(false)
  }

  let n = -1
  return (
    <div ref={root} className={`tp${open ? ' is-open' : ''}`}>
      <button
        ref={button}
        id={id}
        type="button"
        className={`tp-trigger${selected ? '' : ' is-empty'}`}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        disabled={disabled}
        data-focus="preferredTime"
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={onButtonKey}
      >{selected?.label ?? placeholder}</button>
      {open && (
        <div ref={list} id={listId} role="listbox" aria-labelledby={id} aria-activedescendant={optionId(active)} tabIndex={-1} className="tp-list" onKeyDown={onListKey}>
          {groups.map((g) => (
            <div key={g.label} role="group" aria-label={g.label} className="tp-group">
              <p className="tp-group-title" aria-hidden="true">{g.label}</p>
              <div className="tp-options">
                {g.options.map((o) => {
                  const i = ++n
                  return (
                    <div
                      key={o.value}
                      id={optionId(i)}
                      role="option"
                      aria-selected={o.value === value}
                      className={`tp-option${i === active ? ' is-active' : ''}`}
                      onPointerEnter={() => { byPointer.current = true; setActive(i) }}
                      onClick={() => pick(i)}
                    >{o.label}</div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
