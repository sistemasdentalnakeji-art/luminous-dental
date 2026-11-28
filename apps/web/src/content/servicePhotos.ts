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
  'dental-implants': { file: 'implantes-dentales', alt: { en: 'A model of a dental implant with its crown between two teeth, in cross-section, on a dark counter', es: 'Un modelo de un implante dental con su corona entre dos dientes, en corte, sobre un mostrador oscuro' }, position: 'center' },
  'teeth-whitening': { file: 'blanqueamiento', alt: { en: 'A row of tooth shade samples on a light gray shade guide, used to choose the color of teeth', es: 'Una hilera de muestras de tono de dientes en una guía de color gris claro, usada para elegir el color de los dientes' }, position: 'center' },
  'invisalign-and-braces': { file: 'alineadores', alt: { en: 'Clear aligners next to a model of the teeth, with a 3D scanner in the background', es: 'Alineadores transparentes junto a un modelo de los dientes, con un escáner 3D al fondo' }, position: '70% center' },
  'dentures-and-bridges': { file: 'dentaduras', alt: { en: 'A dentist in gloves adjusting a denture with a dental instrument', es: 'Un dentista con guantes ajustando una dentadura con un instrumento dental' }, position: '70% center' },
  // r8c: las cinco que faltaban. 'revision' es foto propia de Luminous (recepción); las otras cuatro son de Unsplash (docs/fotos-servicios.md).
  // 'carillas' de Nakeji sigue sin usarse: muestra «Dental nakeji» bordado en la filipina.
  'routine-dental-care': { file: 'revision', alt: { en: 'The bright reception desk at Luminous Dental, with the clinic logo on the wall', es: 'La recepción luminosa de Luminous Dental, con el logo de la clínica en la pared' }, position: '65% center' },
  'dental-appliances': { file: 'aparatos', alt: { en: 'A model of the teeth with orthodontic wires and brackets on a light blue counter', es: 'Un modelo de los dientes con alambres y brackets de ortodoncia sobre un mostrador azul claro' }, position: '30% center' },
  'porcelain-veneers-and-crowns': { file: 'carillas-coronas', alt: { en: 'A row of porcelain veneer samples on a bright white background', es: 'Una hilera de muestras de carillas de porcelana sobre un fondo blanco luminoso' }, position: 'center' },
  'cosmetic-bonding': { file: 'resinas', alt: { en: 'Close-up of front teeth while a small brush applies bonding material', es: 'Primer plano de los dientes frontales mientras un pincel pequeño aplica el material de resina' }, position: 'center 50%' },
  // r13 (27-11): All-on-4 y All-on-6 separados, cada uno con su foto de Dental Nakeji (sin marca visible).
  'all-on-4-implants': { file: 'all-on-4', alt: { en: 'A model of four dental implants holding a fixed lower-arch prosthesis, on a white counter in a bright lab', es: 'Un modelo de cuatro implantes dentales que sostienen una prótesis fija de la arcada inferior, sobre un mostrador blanco en un laboratorio luminoso' }, position: 'center 55%' },
  'all-on-6-implants': { file: 'all-on-6', alt: { en: 'A model of six dental implants holding a fixed lower-arch prosthesis, on a white counter in a bright lab', es: 'Un modelo de seis implantes dentales que sostienen una prótesis fija de la arcada inferior, sobre un mostrador blanco en un laboratorio luminoso' }, position: 'center 55%' },
}
