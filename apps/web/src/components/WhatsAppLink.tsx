import { BrandIcon } from '@/components/BrandIcon'
import { clinic } from '@/content/clinic'
import { ui } from '@/content/ui'
import { useLang } from '@/lib/lang'

/** Ícono de WhatsApp: enlace a wa.me cuando la clínica tenga número; mientras no, elemento no interactivo (sin enlace muerto). */
export function WhatsAppLink({ className, size }: { className?: string; size: number }) {
  const t = ui[useLang()]
  const number = clinic.whatsapp?.replace(/\D/g, '')
  if (!number) {
    return <span className={className ? `${className} wa-soon` : 'wa-soon'} role="img" aria-label={t.whatsappSoon}><BrandIcon name="whatsapp" size={size} /></span>
  }
  return (
    <a className={className} href={`https://wa.me/${number}`} target="_blank" rel="noopener noreferrer" aria-label={t.socialOn(clinic.name, 'WhatsApp')}>
      <BrandIcon name="whatsapp" size={size} />
    </a>
  )
}
