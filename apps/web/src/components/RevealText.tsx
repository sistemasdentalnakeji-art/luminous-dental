import { useEffect, useRef, useState, type ElementType } from 'react'

// Entrada de títulos y subtítulos, una sola vez al llegar a pantalla. Ideas: React Bits «Split Text» / Magic UI «Word Pull Up» (palabras que suben dentro de una
// máscara), Magic UI «Animated Shiny Text» (brillo menta que recorre la palabra de acento) y React Bits «Blur Text» (subtítulos: de borroso a nítido).
// El texto real queda en el DOM (solo se parte en <span>); sin CSS de ocultar cuando hay movimiento reducido o pausa (styles/titles.css).
// shortcut: no se vuelve a ocultar si la pausa se apaga después de entrar; sobra para una sola entrada.
type Props = { as?: ElementType; mode?: 'words' | 'blur'; accent?: string; line?: boolean; children: string } & Record<string, unknown>

export function RevealText({ as: Tag = 'h2', mode = 'words', accent = '', line = false, children, className = '', ...rest }: Props) {
  const ref = useRef<HTMLElement>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return setSeen(true)
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } }, { rootMargin: '0px 0px -10% 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const shiny = new Set(accent.toLowerCase().split(' ').filter(Boolean))
  const cls = `rv rv--${mode}${seen ? ' rv--in' : ''}${line ? ' rv--line' : ''} ${className}`
  return (
    <Tag ref={ref} className={cls} {...rest}>
      {mode === 'words'
        ? children.split(' ').map((w, i, all) => (
            <span key={i}>
              <span className="rv__mask"><span className={`rv__w${shiny.has(w.toLowerCase().replace(/[.,]$/, '')) ? ' rv__shine' : ''}`} style={{ '--i': Math.min(i, 12) } as React.CSSProperties}>{w}</span></span>
              {i < all.length - 1 ? ' ' : ''}
            </span>
          ))
        : children}
    </Tag>
  )
}
