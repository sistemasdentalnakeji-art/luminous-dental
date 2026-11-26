import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/fonts.css'
import '@/styles/tokens.css'
import '@/styles/site.css'
import '@/styles/featured.css'
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
import '@/styles/home-lines.css' // prueba r6: inicio sin fondos de tarjeta (solo bajo .home)
import App from '@/app/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
