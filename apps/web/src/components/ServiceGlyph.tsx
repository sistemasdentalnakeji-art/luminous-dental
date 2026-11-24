// Dibujos de los 5 servicios destacados, copiados tal cual de Dental Nakeji (components/ui/Icon.tsx: braces, implant, denture, crown, sparkle), con su mismo
// montaje de trazo (viewBox 24, trazo currentColor de 1.7). Se usan dentro de la baldosa «.icon-badge siri» de FeaturedServices.
const PATHS = {
  braces: (
    <>
      <rect x="2.5" y="5" width="5.5" height="13" rx="2.3" />
      <rect x="9.25" y="5" width="5.5" height="13" rx="2.3" />
      <rect x="16" y="5" width="5.5" height="13" rx="2.3" />
      <path d="M1.5 11.5h21" />
      <rect x="4" y="10.2" width="2.5" height="2.6" rx=".5" fill="currentColor" />
      <rect x="10.75" y="10.2" width="2.5" height="2.6" rx=".5" fill="currentColor" />
      <rect x="17.5" y="10.2" width="2.5" height="2.6" rx=".5" fill="currentColor" />
    </>
  ),
  implants: (
    <>
      <path d="M7.2 4.6c0-.9.8-1.6 1.7-1.6h6.2c.9 0 1.7.7 1.7 1.6 0 2.1-1 3.9-2.1 3.9H9.3c-1.1 0-2.1-1.8-2.1-3.9z" />
      <path d="M9.6 8.5h4.8l-.5 9.6L12 21l-1.9-2.9z" />
      <path d="M9.8 11.6h4.4M10 14.4h4M10.2 17.1h3.6" />
    </>
  ),
  bridges: (
    <>
      <path d="M3.2 4.5h17.6l-1.9 14.7a2 2 0 0 1-2 1.8H7.1a2 2 0 0 1-2-1.8z" />
      <rect x="6.5" y="7.6" width="11" height="2.8" rx="1.4" />
      <path d="M6.7 10.4v2.1a1.2 1.2 0 0 0 2.4 0v-2.1M9.5 10.4v2.1a1.2 1.2 0 0 0 2.4 0v-2.1M12.3 10.4v2.1a1.2 1.2 0 0 0 2.4 0v-2.1M15.1 10.4v2.1a1.2 1.2 0 0 0 2.4 0v-2.1" strokeWidth={1.2} />
      <path d="M4.4 15.6c1.9-1.1 3.8-1.1 5.7 0s3.8 1.1 5.7 0 2.8-.9 3.9-.3" strokeWidth={1.3} />
    </>
  ),
  crowns: (
    <>
      <path d="M5 18.5L3.5 9.5 8 13l4-7 4 7 4.5-3.5L19 18.5z" />
      <path d="M6 21.5h12" />
    </>
  ),
  whitening: (
    <>
      <path d="M11 3.5l1.7 4.9 4.8 1.7-4.8 1.7L11 16.7l-1.7-4.9-4.8-1.7 4.8-1.7z" />
      <path d="M18 14.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z" />
    </>
  ),
}

export type ServiceGlyphId = keyof typeof PATHS

export function ServiceGlyph({ id, size = 28 }: { id: ServiceGlyphId; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {PATHS[id]}
    </svg>
  )
}
