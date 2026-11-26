// Fotos de las páginas de servicio (solo ahí). Son las de Dental Nakeji (clínica hermana, mismo dueño); la dueña pidió usarlas por ahora (26-11, r3).
// Clave = id del servicio (content/clinic.ts → serviceId). Sin entrada = esa página queda sin foto.
// El alt describe la foto y no dice de qué clínica es.
import type { L10n } from '@/lib/lang'

export interface ServicePhoto {
  file: string // nombre en public/images/servicios/ (hay copias en /640 y /1280)
  alt: L10n<string>
  position?: string // object-position
}

export const servicePhotos: Record<string, ServicePhoto> = {
  'dental-cleaning': { file: 'limpieza', alt: { en: 'Dental model, floss and cleaning instruments on a bright exam table next to a dental chair', es: 'Modelo dental, hilo e instrumentos de limpieza sobre una mesa luminosa junto a un sillón dental' }, position: '70% center' },
  'wisdom-tooth-removal': { file: 'extracciones', alt: { en: 'Models of teeth and a wisdom tooth in the jaw, with extraction instruments on an exam table', es: 'Modelos de dientes y de una muela del juicio en la mandíbula, con instrumentos de extracción sobre una mesa' }, position: '75% center' },
  'dental-implants': { file: 'implantes-dentales', alt: { en: 'A smiling patient reclined in a dental chair in a bright room with a city view', es: 'Una paciente sonriente reclinada en un sillón dental, en un consultorio luminoso con vista a la ciudad' }, position: '75% center' },
  'teeth-whitening': { file: 'blanqueamiento', alt: { en: 'A dentist and an assistant treating a patient under the exam light', es: 'Un dentista y una asistente atendiendo a un paciente bajo la lámpara dental' }, position: '60% center' },
  'invisalign-and-braces': { file: 'alineadores', alt: { en: 'Clear aligners next to a model of the teeth, with a 3D scanner in the background', es: 'Alineadores transparentes junto a un modelo de los dientes, con un escáner 3D al fondo' }, position: '70% center' },
  'dentures-and-bridges': { file: 'dentaduras', alt: { en: 'A dentist in gloves adjusting a denture with a dental instrument', es: 'Un dentista con guantes ajustando una dentadura con un instrumento dental' }, position: '70% center' },
  // 'porcelain-veneers-and-crowns': sin foto a propósito. Las fotos «carillas» y «coronas» de Nakeji muestran «Dental nakeji» bordado en la filipina; falta decisión de la dueña.
}
