// Casos del antes/después del héroe. Fotos del archivo de referencia de la dueña:
// permiso de pacientes POR CONFIRMAR; no publicar en la página pública sin ese permiso (docs/datos.md).
const base = import.meta.env.BASE_URL
export interface SmileCase { title: string; before: string; after: string; altBefore: string; altAfter: string }

export const smileCases: SmileCase[] = [
  { title: 'A different future.', before: `${base}smiles/caso1-antes.jpg`, after: `${base}smiles/caso1-despues.jpg`,
    altBefore: 'Close-up of a smile before treatment: worn, short, uneven front teeth with stained, chipped edges.',
    altAfter: 'The same smile after treatment: bright, even, smoothly shaped front teeth.' },
  { title: 'No longer hidden.', before: `${base}smiles/caso2-antes.jpg`, after: `${base}smiles/caso2-despues.jpg`,
    altBefore: 'Close-up of a smile before treatment: chipped, uneven teeth with gaps and dark spots.',
    altAfter: 'The same smile after treatment: bright, evenly aligned, natural-looking front teeth.' },
]

export const smileText = {
  region: 'Smile gallery: before and after',
  compare: 'Compare before and after',
  hint: 'Use the left and right arrow keys, or drag, to compare the smile before and after treatment.',
  before: 'Before', after: 'After',
  cases: 'Cases', showCase: 'Show case:', note: 'Individual results vary.',
}
