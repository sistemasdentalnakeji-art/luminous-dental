import { Link } from '@/lib/router'

// El logo real; la estrella se ilumina (CSS en site.css).
export function Logo({ large }: { large?: boolean }) {
  return (
    <Link className={large ? 'logo logo-lg' : 'logo'} href="/" aria-label="Luminous Dental, home">
      <span className="logo-base" />
      <span className="logo-sheen" />
      <span className="logo-star" />
      <span className="logo-halo" />
      <span className="logo-flare" />
    </Link>
  )
}
