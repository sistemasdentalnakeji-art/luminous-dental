import type { L10n } from '@/lib/lang'

// Planes de seguro que se muestran en la página de beneficios (/en/insurance · /es/seguros-y-financiamiento). Los mismos 24 logos y orden que Dental Nakeji, por decisión del dueño (19-11-2026).
// La clínica aún debe confirmar que esta lista aplica a Luminous Dental (docs/datos.md, POR CONFIRMAR). La lista oficial de Luminous es distinta.
// Los archivos están en public/insurers/ (algunos nombres tienen errores de ortografía; son internos). Cada fila: [nombre, archivo, ancho, alto, accent].
// accent = color dominante del logo real (medido en los píxeles de public/insurers/). HealthComp (negro) y Dental Health Services (multicolor) no tienen uno claro: usan el celeste del sitio.
export const insurers: [string, string, number, number, string][] = [
  ['Aetna', 'aetna', 480, 124, '#754099'],
  ['AlwaysCare', 'alwayscare', 480, 115, '#012454'],
  ['Ameritas', 'ameritas', 480, 99, '#d42229'],
  ['Anthem', 'anthem', 480, 109, '#0062a6'],
  ['BeneSys', 'benesys', 480, 113, '#024932'],
  ['Cigna', 'cigna', 480, 161, '#0383cd'],
  ['Delta Dental', 'delta-dental', 480, 54, '#33aa14'],
  ['Dental Health Services', 'dental-health-services', 480, 76, 'var(--color-sky)'],
  ['Guardian', 'guardian', 480, 89, '#0b4161'],
  ['HealthSCOPE Benefits', 'healt-scope-benefits', 365, 138, '#5aa94b'],
  ['HealthComp', 'health-comp', 480, 78, 'var(--color-sky)'],
  ['Horizon', 'horizon', 480, 119, '#0162b3'],
  ['Humana', 'humana', 480, 99, '#66af03'],
  ['Lincoln Financial Group', 'lincon-financial-group', 480, 154, '#970a2c'],
  ['MetLife', 'metlife', 480, 104, '#0085ce'],
  ['Premera Blue Cross', 'premera-blue-cross', 480, 128, '#0195d9'],
  ['Premier Insurance Company', 'premier-insurance-company', 480, 100, '#fbaa0a'],
  ['Principal', 'principal', 480, 135, '#31b1d8'],
  ['Regence', 'regence', 480, 113, '#0289e3'],
  ['Renaissance', 'renaissance', 480, 90, '#064b8b'],
  ['Summit', 'summit', 480, 146, '#004778'],
  ['UFCW', 'ufcw', 480, 131, '#014990'],
  ['UnitedHealthcare', 'united-healthcare', 480, 151, '#012678'],
  ['Unum', 'unum', 480, 144, '#005197'],
]

// Textos NUEVOS, para aprobación (docs/datos.md). No dicen «we accept»: la clínica no lo ha confirmado.
const en = {
  eyebrow: 'Insurance',
  title: 'Benefits',
  lead: 'Not sure if your plan is on the list? Call or text us before your visit and we will go over it with you.',
  steps: ['Tell us your plan', 'Our team goes over it with you', 'Request your appointment'],
  book: 'Request an appointment',
  // POR CONFIRMAR con la clínica: este texto es nuevo («bring your insurance card» sale de A Great Smile, no de Luminous).
  step2: 'Bring your insurance card to your visit. We check your plan with you and explain what to expect before any treatment.',
  // Texto de la maqueta aprobada por la dueña.
  step3: 'Prefer to talk first? Call or text us and we will find a time with you.',
  note: 'Logos belong to their owners. Ask us to confirm your plan.',
  payment: 'Questions about payment? Ask our team.',
  // Buscador «Find your plan» (components/InsurancePlans.tsx)
  findLabel: 'Find your plan',
  findPlaceholder: 'Type your plan, e.g. Cigna',
  countAll: (n: number) => `${n} plans on our list`,
  countSome: (n: number, q: string) => `${n} ${n === 1 ? 'plan matches' : 'plans match'} “${q}”`,
  countNone: (q: string) => `No plans match “${q}”`,
  emptyTitle: (q: string) => `We do not see “${q}” on our list yet.`,
  emptyText: 'Call or text us and we will check it with you.',
  showAll: 'Show all plans',
  // NUEVOS, POR APROBAR (24-11): texto y botón bajo la tarjeta de la home; el botón lleva a /insurance.
  help: "Questions about your insurance? We'll help you check your plan.",
  seeAll: 'See all insurance plans',
  wallLabel: 'Insurance plans on our list',
}
const es: typeof en = {
  eyebrow: 'Seguros',
  title: 'Beneficios',
  lead: 'Si no estás seguro de que tu plan esté en la lista, llámanos o envíanos un mensaje antes de tu visita y lo revisamos contigo.',
  steps: ['Cuéntanos cuál es tu plan', 'Nuestro equipo lo revisa contigo', 'Solicita tu cita'],
  book: 'Solicita tu cita',
  step2: 'Trae tu tarjeta del seguro a tu visita. Revisamos tu plan contigo y te explicamos qué esperar antes de cualquier tratamiento.',
  step3: '¿Prefieres hablar primero? Llámanos o envíanos un mensaje y encontramos un horario contigo.',
  note: 'Los logotipos pertenecen a sus dueños. Pídenos que confirmemos tu plan.',
  payment: '¿Dudas sobre el pago? Pregunta a nuestro equipo.',
  findLabel: 'Encuentra tu plan',
  findPlaceholder: 'Escribe tu plan, p. ej. Cigna',
  countAll: (n) => `${n} planes en nuestra lista`,
  countSome: (n, q) => `${n} ${n === 1 ? 'plan coincide' : 'planes coinciden'} con “${q}”`,
  countNone: (q) => `Ningún plan coincide con “${q}”`,
  emptyTitle: (q) => `Todavía no vemos “${q}” en nuestra lista.`,
  emptyText: 'Llámanos o envíanos un mensaje y lo revisamos contigo.',
  showAll: 'Mostrar todos los planes',
  help: '¿Dudas sobre tu seguro? Te ayudamos a revisar tu plan.',
  seeAll: 'Ver todos los planes de seguro',
  wallLabel: 'Planes de seguro en nuestra lista',
}
export const insuranceText: L10n<typeof en> = { en, es }
