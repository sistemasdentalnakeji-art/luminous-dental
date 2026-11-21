import { BrandIcon, type BrandName } from '@/components/BrandIcon'
import { clinic } from '@/content/clinic'

// Mismo componente que el de Dental Nakeji (components/ui/SocialLinks.tsx): logos oficiales, área táctil de 44 px, nombre accesible en cada enlace.
const links: { id: BrandName; label: string; href: string }[] = [
  { id: 'instagram', label: 'Instagram', href: clinic.social.instagram },
  { id: 'facebook', label: 'Facebook', href: clinic.social.facebook },
]

export function SocialLinks({ iconSize = 32 }: { iconSize?: number }) {
  return (
    <ul className="social-links" aria-label="Social media">
      {links.map((l) => (
        <li key={l.id}>
          <a className="icon-button" href={l.href} target="_blank" rel="noopener noreferrer" aria-label={`${clinic.name} on ${l.label}`}>
            <BrandIcon name={l.id} size={iconSize} />
          </a>
        </li>
      ))}
    </ul>
  )
}
