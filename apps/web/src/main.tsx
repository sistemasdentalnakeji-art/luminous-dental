import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/fonts.css'
import '@/styles/tokens.css'
import '@/styles/site.css'
import '@/styles/featured.css'
import '@/styles/titles.css'
import '@/styles/hero.css'
import '@/styles/insurance.css'
import '@/styles/reviews.css'
import '@/styles/location-map.css'
import '@/styles/floating-contact.css'
import '@/styles/footer-city.css'
import '@/styles/legal.css'
import App from '@/app/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
