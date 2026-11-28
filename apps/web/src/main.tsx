import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/fonts.css'
import '@/styles/tokens.css'
import '@/styles/site.css'
import '@/styles/featured.css'
import '@/styles/icon-aura.css' // r11d: ícono con aura (menú, hub de Servicios, destacados, Beneficios)
import '@/styles/titles.css'
import '@/styles/hero.css'
import '@/styles/insurance.css'
import '@/styles/benefits.css'
import '@/styles/benefits-r2.css'
import '@/styles/services-hub.css'
import '@/styles/reviews.css'
import '@/styles/location-map.css'
import '@/styles/floating-contact.css'
import '@/styles/footer-city.css'
import '@/styles/legal.css'
import '@/styles/home-b1.css'
import '@/styles/lines.css' // r7: estilo «sin tarjetas, con líneas» común (clase .lines)
import '@/styles/home-lines.css' // r6-r7: lo específico del inicio (solo bajo .home)
import '@/styles/a11y-targets.css' // r9b: zonas táctiles >= 44 px
import App from '@/app/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
