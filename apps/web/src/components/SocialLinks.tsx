import { BrandIcon, type BrandName } from '@/components/BrandIcon'
import { clinic } from '@/content/clinic'

// Same component as Dental Nakeji's (components/ui/SocialLinks.tsx): official logos, 44 px target, accessible name on each link.
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
