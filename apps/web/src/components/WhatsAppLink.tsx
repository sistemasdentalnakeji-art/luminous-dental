import { BrandIcon } from '@/components/BrandIcon'
import { clinic } from '@/content/clinic'

/** Ícono de WhatsApp: enlace a wa.me cuando la clínica tenga número; mientras no, elemento no interactivo (sin enlace muerto). */
export function WhatsAppLink({ className, size }: { className?: string; size: number }) {
  const number = clinic.whatsapp?.replace(/\D/g, '')
  if (!number) {
    return <span className={`${className} wa-soon`} role="img" aria-label="WhatsApp (coming soon)"><BrandIcon name="whatsapp" size={size} /></span>
  }
  return (
    <a className={className} href={`https://wa.me/${number}`} target="_blank" rel="noopener noreferrer" aria-label={`${clinic.name} on WhatsApp`}>
      <BrandIcon name="whatsapp" size={size} />
    </a>
  )
}
