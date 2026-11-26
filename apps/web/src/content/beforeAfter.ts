// Antes/después por servicio (páginas /services/<id>). Fotos copiadas de Dental Nakeji, clínica hermana (misma dueña); la dueña ordenó usarlas el 26-11-2026.
// Cada lado es un recorte (x, y, w, h en px de la foto original); antes y después comparten w/h. Fotos en public/images/antes-despues/.
// Casos: carillas, coronas, blanqueamiento, ortodoncia e implantes. Sin All-on-4/6 ni limpieza.
import type { L10n } from '@/lib/lang'

export interface Crop { src: string; width: number; height: number; x: number; y: number; w: number; h: number }
export interface BeforeAfterCase { before: Crop; after: Crop; alt: L10n<string> }

const crop = (src: string, width: number, height: number, x: number, y: number, w: number, h: number): Crop => ({ src: `/images/antes-despues/${src}`, width, height, x, y, w, h })
const nakeji = (es: string, en: string): L10n<string> => ({ es: `Caso de Dental Nakeji, clínica hermana: ${es}`, en: `Dental Nakeji patient (our sister clinic): ${en}` })

const veneers: BeforeAfterCase = {
  before: crop('carillas.webp', 1350, 1688, 0, 40, 1350, 700),
  after: crop('carillas.webp', 1350, 1688, 0, 960, 1350, 700),
  alt: nakeji('sonrisa antes y después de sus carillas', 'smile before and after veneers'),
}
const crowns: BeforeAfterCase = {
  before: crop('coronas.jpg', 1080, 1080, 0, 78, 1080, 420),
  after: crop('coronas.jpg', 1080, 1080, 0, 580, 1080, 420),
  alt: nakeji('coronas anteriores antes y coronas de zirconia después', 'old crowns before and zirconia crowns after'),
}

/** Por id de servicio (= `ServicePage.id`). */
export const beforeAfter: Record<string, BeforeAfterCase[]> = {
  'porcelain-veneers-and-crowns': [veneers, crowns],
  'teeth-whitening': [{
    before: crop('blanqueamiento-antes.jpg', 1440, 1080, 120, 330, 1200, 400),
    after: crop('blanqueamiento-despues.jpg', 1440, 1080, 120, 330, 1200, 400),
    alt: nakeji('dientes manchados antes y más blancos después', 'stained teeth before and whiter teeth after'),
  }],
  'invisalign-and-braces': [{
    before: crop('ortodoncia.jpg', 640, 640, 0, 20, 640, 255),
    after: crop('ortodoncia.jpg', 640, 640, 0, 385, 640, 255),
    alt: nakeji('con brackets antes y con los dientes alineados después', 'with braces before and aligned teeth after'),
  }],
  'dental-implants': [{
    before: crop('implantes.jpg', 2048, 2048, 520, 380, 1000, 540),
    after: crop('implantes.jpg', 2048, 2048, 530, 1070, 1000, 540),
    alt: nakeji('sin dientes antes y con implantes después', 'without teeth before and with implants after'),
  }],
}

export const beforeAfterText: L10n<{ eyebrow: string; title: string; before: string; after: string; slider: string; note: string }> = {
  en: { eyebrow: 'Real results', title: 'See the difference', before: 'Before', after: 'After', slider: 'Slide to compare before and after', note: 'Case from Dental Nakeji, our sister clinic. Results vary.' },
  es: { eyebrow: 'Resultados reales', title: 'Mira la diferencia', before: 'Antes', after: 'Después', slider: 'Desliza para comparar antes y después', note: 'Caso de Dental Nakeji, nuestra clínica hermana. Los resultados varían.' },
}
