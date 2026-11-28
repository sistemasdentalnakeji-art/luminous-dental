// Logos oficiales de redes sociales en sus colores originales, copiados de components/ui/BrandIcon.tsx de Dental Nakeji (solo Facebook e Instagram).
// Decorativos: el nombre accesible viene del enlace que los contiene.

import { useId } from 'react'

export type BrandName = 'facebook' | 'instagram'

interface BrandIconProps {
  name: BrandName
  size?: number
}

export function BrandIcon({ name, size = 20 }: BrandIconProps) {
  const gradientId = useId()

  if (name === 'facebook') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="12" fill="#1877F2" />
        <path
          fill="#FFFFFF"
          d="M13.6 19.5v-6h2.1l.3-2.5h-2.4V9.5c0-.7.2-1.2 1.2-1.2h1.3V6.1c-.2 0-1-.1-1.9-.1-1.9 0-3.2 1.2-3.2 3.3V11H8.9v2.5h2.1v6z"
        />
      </svg>
    )
  }

  if (name === 'instagram') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <defs>
          <radialGradient id={gradientId} cx="30%" cy="107%" r="150%">
            <stop offset="0%" stopColor="#FED576" />
            <stop offset="26%" stopColor="#F47133" />
            <stop offset="61%" stopColor="#BC3081" />
            <stop offset="100%" stopColor="#4C63D2" />
          </radialGradient>
        </defs>
        <circle cx="12" cy="12" r="12" fill={`url(#${gradientId})`} />
        <rect x="6.2" y="6.2" width="11.6" height="11.6" rx="3.4" fill="none" stroke="#FFFFFF" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="2.8" fill="none" stroke="#FFFFFF" strokeWidth="1.8" />
        <circle cx="15.9" cy="8.1" r="0.9" fill="#FFFFFF" />
      </svg>
    )
  }

  return null
}
