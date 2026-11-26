import { Agreements } from '@/components/Agreements'
import { ContactLocation } from '@/components/ContactLocation'
import { FeaturedServices } from '@/components/FeaturedServices'
import { FamilyCare } from '@/components/FamilyCare'
import { InsurancePlans } from '@/components/InsurancePlans'
import { RevealText } from '@/components/RevealText'
import { home } from '@/content/home'
import { useLang } from '@/lib/lang'
import { Hero } from '@/components/Hero'
import { BookVisit } from '@/components/BookVisit'
import { Reviews } from '@/components/Reviews'

export default function Home() {
  const lang = useLang()
  const { coverage } = home[lang]
  // Orden del inicio (dueña, 26-11): para mover un bloque basta cambiar su línea de lugar.
  return (
    <div className="home">
      <Hero />

      <FamilyCare />

      <FeaturedServices />

      <BookVisit />

      <section className="wrap ins" id="insurance" aria-labelledby="ins-h">
        <header className="ins__top">
          <RevealText className="ins__title" id="ins-h">{coverage.insurance.heading}</RevealText>
        </header>
        <InsurancePlans variant="home" />
      </section>

      <Agreements />

      <Reviews />

      <ContactLocation />
    </div>
  )
}
