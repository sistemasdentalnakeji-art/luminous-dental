import { hrefOf } from '@/config/routes'
import { useSeenOnce } from '@/components/NeonLogo'
import { ui } from '@/content/ui'
import { useLang } from '@/lib/lang'
import { Link } from '@/lib/router'

// Logo del pie (r8): el logo oficial tal cual, quieto, y la estrella se ilumina al entrar en pantalla y luego late despacio.
// La estrella es una copia recortada del mismo logo (clip-path) con halo; solo cambian opacity y scale. Estilos: footer-city.css (.starlogo).
const logo = `${import.meta.env.BASE_URL}logo.webp`

export function StarLogo() {
  const lang = useLang()
  const [ref, lit] = useSeenOnce<HTMLDivElement>(0.6)
  return (
    <div ref={ref} className={`starlogo ${lit ? 'lit' : 'unlit'}`}>
      <Link href={hrefOf('home', lang)} aria-label={ui[lang].homeAria}>
        <img className="starlogo__base" src={logo} alt="" width={520} height={297} />
        <span className="starlogo__star" aria-hidden="true"><img src={logo} alt="" width={520} height={297} /></span>
      </Link>
    </div>
  )
}
