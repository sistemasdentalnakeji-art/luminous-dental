// Textos del hub de Servicios interactivo (pages/Services.tsx): filtros «por necesidad» y tarjetas que se abren. Cada necesidad apunta a servicios reales por id
// (el mismo id que las rutas `service:<id>`). Sin diagnósticos ni promesas: solo orienta hacia dónde mirar. POR APROBAR (docs/datos.md).
import type { L10n } from '@/lib/lang'

const needs = [
  { id: 'pain', ids: ['routine-dental-care', 'wisdom-tooth-removal', 'porcelain-veneers-and-crowns'] },
  { id: 'smile', ids: ['porcelain-veneers-and-crowns', 'cosmetic-bonding', 'teeth-whitening', 'invisalign-and-braces'] },
  { id: 'missing', ids: ['dental-implants', 'all-on-4-implants', 'all-on-6-implants', 'dentures-and-bridges'] },
  { id: 'checkup', ids: ['routine-dental-care', 'dental-cleaning'] },
] as const
export type NeedId = (typeof needs)[number]['id']
export const needIds: Record<NeedId, readonly string[]> = Object.fromEntries(needs.map((n) => [n.id, n.ids])) as unknown as Record<NeedId, readonly string[]>

const en = {
  filterLabel: 'What do you need today?',
  all: 'Show all',
  needs: {
    pain: 'My tooth hurts',
    smile: 'I want a better smile',
    missing: 'I am missing a tooth',
    checkup: 'A checkup or cleaning',
  } as Record<NeedId, string>,
  count: (n: number, total: number) => `${n} of ${total} services highlighted`,
  countAll: (n: number) => `All ${n} services`,
  painNote: 'If it is an emergency, call us any day, at any hour.',
  open: 'Show details',
  view: 'View service',
  noLine: 'Ask our team about this service and we will go over it with you.', // POR CONFIRMAR: la clínica no publica descripción
  group: 'Category',
}
const es: typeof en = {
  filterLabel: '¿Qué necesitas hoy?',
  all: 'Ver todos',
  needs: {
    pain: 'Me duele un diente',
    smile: 'Quiero mejorar mi sonrisa',
    missing: 'Me falta un diente',
    checkup: 'Una revisión o limpieza',
  },
  count: (n, total) => `${n} de ${total} servicios resaltados`,
  countAll: (n) => `Los ${n} servicios`,
  painNote: 'Si es una emergencia, llámanos cualquier día, a cualquier hora.',
  open: 'Ver detalles',
  view: 'Ver servicio',
  noLine: 'Pregunta a nuestro equipo por este servicio y lo revisamos contigo.',
  group: 'Categoría',
}
export const servicesHubText: L10n<typeof en> = { en, es }
