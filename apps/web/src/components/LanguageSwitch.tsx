import type { ReactElement } from 'react'
import { counterpart } from '@/config/routes'
import { ui } from '@/content/ui'
import { useLang } from '@/lib/lang'
import { Link } from '@/lib/router'

// Banderas de Dental Nakeji (simplificadas: a 22 px no se distinguirían escudo ni estrellas). Se muestra la del idioma al que se cambia.
const FLAG: Record<string, ReactElement> = {
  en: (
    <svg viewBox="0 0 7410 3900" aria-hidden="true" focusable="false" preserveAspectRatio="none">
      <rect width="7410" height="3900" fill="#fff" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => <rect key={i} y={i * 600} width="7410" height="300" fill="#b22234" />)}
      <rect width="2964" height="2100" fill="#3c3b6e" />
    </svg>
  ),
  es: (
    <svg viewBox="0 0 3 2" aria-hidden="true" focusable="false" preserveAspectRatio="none">
      <rect width="1" height="2" fill="#006847" />
      <rect x="1" width="1" height="2" fill="#fff" />
      <rect x="2" width="1" height="2" fill="#ce1126" />
      <circle cx="1.5" cy="1" r="0.25" fill="#8a5a2b" />
    </svg>
  ),
}

/** Enlace a la MISMA página en el otro idioma (counterpart de config/routes.ts). Muestra el nombre del otro idioma en ese idioma ("Español" / "English"); `lang` y `hrefLang` lo marcan para lectores de pantalla. Estilos: .lang-switch en styles/site.css. */
export function LanguageSwitch({ path, className = '' }: { path: string; className?: string }) {
  const t = ui[useLang()].switchTo
  return (
    <Link className={`lang-switch ${className}`.trim()} href={counterpart(path)} hrefLang={t.hreflang} lang={t.lang} aria-label={t.label}>
      <span className="lang-switch__flag">{FLAG[t.lang]}</span>
      {t.name}
    </Link>
  )
}
