// Casos del antes/después del héroe. Fotos del archivo de referencia de la dueña:
// permiso de pacientes POR CONFIRMAR; no publicar en la página pública sin ese permiso (docs/datos.md).
// Fotos y orden iguales en los dos idiomas; título y descripciones van en { en, es }.
import type { L10n } from '@/lib/lang'

const base = import.meta.env.BASE_URL
export interface SmileCase { title: string; before: string; after: string; altBefore: string; altAfter: string }

const photos = [
  { before: `${base}smiles/caso1-antes.jpg`, after: `${base}smiles/caso1-despues.jpg` },
  { before: `${base}smiles/caso2-antes.jpg`, after: `${base}smiles/caso2-despues.jpg` },
]

export const smileCases: L10n<SmileCase[]> = {
  en: [
    { ...photos[0], title: 'A different future.',
      altBefore: 'Close-up of a smile before treatment: worn, short, uneven front teeth with stained, chipped edges.',
      altAfter: 'The same smile after treatment: bright, even, smoothly shaped front teeth.' },
    { ...photos[1], title: 'No longer hidden.',
      altBefore: 'Close-up of a smile before treatment: chipped, uneven teeth with gaps and dark spots.',
      altAfter: 'The same smile after treatment: bright, evenly aligned, natural-looking front teeth.' },
  ],
  es: [
    { ...photos[0], title: 'Un futuro distinto.',
      altBefore: 'Primer plano de una sonrisa antes del tratamiento: dientes frontales desgastados, cortos y disparejos, con bordes manchados y astillados.',
      altAfter: 'La misma sonrisa después del tratamiento: dientes frontales luminosos, parejos y con una forma suave.' },
    { ...photos[1], title: 'Ya sin esconderla.',
      altBefore: 'Primer plano de una sonrisa antes del tratamiento: dientes astillados y disparejos, con espacios y manchas oscuras.',
      altAfter: 'La misma sonrisa después del tratamiento: dientes frontales luminosos, bien alineados y de aspecto natural.' },
  ],
}

const en = {
  region: 'Smile gallery: before and after',
  compare: 'Compare before and after',
  hint: 'Use the left and right arrow keys, or drag, to compare the smile before and after treatment.',
  before: 'Before', after: 'After',
  cases: 'Cases', showCase: 'Show case:', note: 'Individual results vary.',
  show: 'Show',
  pause: 'Pause', play: 'Resume',
  showingBefore: 'Showing before', showingAfter: 'Showing after',
  split: (b: number, a: number) => `Before ${b}% on the left, after ${a}% on the right`,
}
const es: typeof en = {
  region: 'Galería de sonrisas: antes y después',
  compare: 'Comparar el antes y el después',
  hint: 'Usa las flechas izquierda y derecha del teclado, o arrastra, para comparar la sonrisa antes y después del tratamiento.',
  before: 'Antes', after: 'Después',
  cases: 'Casos', showCase: 'Ver el caso:', note: 'Los resultados varían de una persona a otra.',
  show: 'Mostrar',
  pause: 'Pausar', play: 'Reanudar',
  showingBefore: 'Se muestra el antes', showingAfter: 'Se muestra el después',
  split: (b, a) => `Antes ${b}% a la izquierda, después ${a}% a la derecha`,
}
export const smileText: L10n<typeof en> = { en, es }
