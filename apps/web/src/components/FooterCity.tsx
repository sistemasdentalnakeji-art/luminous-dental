import { useSeenOnce } from '@/components/NeonLogo'
import cityMarkup from './footer-city/city.svg?raw'

// Maqueta de Las Vegas al final del pie (el letrero de neón ahora está arriba, en NeonLogo.tsx) (docs/recorrido-cielo-vegas.md). La ciudad ya viene generada del prototipo: no se calcula nada en el navegador.
// Se dibuja una sola vez al entrar en pantalla; con «reducir movimiento» o la pausa queda dibujada (todo en footer-city.css).
export default function FooterCity() {
  const [scene, drawn] = useSeenOnce<HTMLDivElement>(0.2)
  return (
    <div className={`fcity${drawn ? ' is-drawn' : ''}`} ref={scene}>
      <div className="fcity-art" aria-hidden="true" dangerouslySetInnerHTML={{ __html: cityMarkup }} />
    </div>
  )
}
