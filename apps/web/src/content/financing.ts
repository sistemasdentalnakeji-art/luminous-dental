// Financiamiento (página de beneficios y una página por empresa en /<lang>/financing/<slug>). Los textos van en { en, es } (L10n); logo, color y sitio son los mismos en los dos idiomas.
// Logos OFICIALES en public/benefits/ (URL de origen de cada uno en docs/datos.md). Sin tasas, plazos, montos ni requisitos: no son verificables aquí.
// Las descripciones salen de lo que dice el sitio oficial de cada empresa; los pasos y los textos de la página son NUEVOS, POR APROBAR (docs/datos.md). Español: traducción nueva (26-11), POR APROBAR.
import type { L10n } from '@/lib/lang'

export type Financer = {
  slug: string
  name: string
  logo: string
  w: number
  h: number
  accent: string // color de marca, solo para la barrita de la tarjeta
  site: string // sitio oficial
  blurb: L10n<string> // una línea para la tarjeta
  about: L10n<string> // qué es
}

export const financers: Financer[] = [
  {
    slug: 'sunbit', name: 'Sunbit', logo: 'sunbit.svg', w: 140, h: 39, accent: '#3155a5', site: 'https://sunbit.com',
    blurb: { en: 'Pay over time for the care you need.', es: 'Paga con el tiempo la atención que necesitas.' },
    about: {
      en: 'Sunbit is a pay-over-time service that lets you spread the cost of care into payments. Financing is offered by Transportation Alliance Bank Inc. dba TAB Bank; Sunbit is not the lender.',
      es: 'Sunbit es un servicio de pago a plazos que te permite repartir el costo de la atención en pagos. El financiamiento lo ofrece Transportation Alliance Bank Inc. dba TAB Bank; Sunbit no es el prestamista.',
    },
  },
  {
    slug: 'cherry', name: 'Cherry', logo: 'cherry.svg', w: 437, h: 122, accent: '#e0273f', site: 'https://withcherry.com',
    blurb: { en: 'Payment plans that let you pay over time.', es: 'Planes de pago para que pagues con el tiempo.' },
    about: {
      en: 'Cherry offers payment plans for care, so patients can pay over time instead of all at once.',
      es: 'Cherry ofrece planes de pago para la atención, para que los pacientes paguen con el tiempo en lugar de todo de una vez.',
    },
  },
  {
    slug: 'plexpay', name: 'PlexPay', logo: 'plexpay.png', w: 2485, h: 570, accent: '#f6931d', site: 'https://plexpay.com',
    blurb: { en: 'Patient finance that makes care more accessible.', es: 'Financiamiento para pacientes que hace la atención más accesible.' },
    about: {
      en: 'PlexPay is a patient finance and payments platform that helps make care more accessible.',
      es: 'PlexPay es una plataforma de financiamiento y pagos para pacientes que ayuda a que la atención sea más accesible.',
    },
  },
  {
    slug: 'icreditworks', name: 'iCreditWorks', logo: 'icreditworks.png', w: 330, h: 75, accent: '#6b7f94', site: 'https://www.icreditworks.com',
    blurb: { en: 'Point-of-care lending for your visit.', es: 'Crédito en el punto de atención para tu visita.' },
    about: {
      en: 'iCreditWorks is a point-of-care lending company that offers financing for care.',
      es: 'iCreditWorks es una empresa de crédito en el punto de atención que ofrece financiamiento para la atención.',
    },
  },
]

const finEn = {
  eyebrow: 'Financing',
  title: 'Financing',
  lead: 'Ask us about financing partners that can help you spread the cost of care over time.',
  more: 'Learn more',
  note: 'Logos belong to their owners. Approval and terms are set by each company.',
  back: 'Benefits',
  heading: 'How it works at our office',
  steps: (n: string) => [
    `Ask our team whether ${n} is a fit for your treatment plan.`,
    `Our team tells you how to apply with ${n}.`,
    `${n} reviews your application and decides on approval and terms.`,
    'Schedule your treatment with our team.',
  ],
  disclaimer: (n: string) => `Approval, rates, and terms are set by ${n}. Visit their official site for current details.`,
  official: (n: string) => `Visit ${n}`,
  book: 'Request an appointment',
  others: 'Other financing options',
}
const finEs: typeof finEn = {
  eyebrow: 'Financiamiento',
  title: 'Financiamiento',
  lead: 'Pregúntanos por las empresas de financiamiento que pueden ayudarte a repartir el costo de la atención en el tiempo.',
  more: 'Conocer más',
  note: 'Los logotipos pertenecen a sus dueños. La aprobación y las condiciones las define cada empresa.',
  back: 'Beneficios',
  heading: 'Cómo funciona en nuestro consultorio',
  steps: (n) => [
    `Pregunta a nuestro equipo si ${n} es una buena opción para tu plan de tratamiento.`,
    `Nuestro equipo te indica cómo solicitar el financiamiento con ${n}.`,
    `${n} revisa tu solicitud y decide la aprobación y las condiciones.`,
    'Agenda tu tratamiento con nuestro equipo.',
  ],
  disclaimer: (n) => `La aprobación, las tasas y las condiciones las define ${n}. Visita su sitio oficial para conocer los detalles actuales.`,
  official: (n) => `Visitar ${n}`,
  book: 'Solicita tu cita',
  others: 'Otras opciones de financiamiento',
}
export const financeText: L10n<typeof finEn> = { en: finEn, es: finEs }

const benEn = {
  eyebrow: 'Benefits',
  title: 'Benefits',
  lead: 'Insurance, financing, and partner benefits that make your care easier to manage.',
  tabs: [
    { id: 'insurance', label: 'Insurance' },
    { id: 'financing', label: 'Financing' },
    { id: 'agreements', label: 'Agreements' },
  ],
  agreements: { eyebrow: 'Agreements', title: 'Agreements', badge: 'Partner benefit' },
  sections: 'Benefits sections',
}
const benEs: typeof benEn = {
  eyebrow: 'Beneficios',
  title: 'Beneficios',
  lead: 'Seguros, financiamiento y convenios que hacen más sencillo manejar el costo de tu atención.',
  tabs: [
    { id: 'insurance', label: 'Seguros' },
    { id: 'financing', label: 'Financiamiento' },
    { id: 'agreements', label: 'Convenios' },
  ],
  agreements: { eyebrow: 'Convenios', title: 'Convenios', badge: 'Convenio con SAHARA' },
  sections: 'Secciones de beneficios',
}
export const benefitsText: L10n<typeof benEn> = { en: benEn, es: benEs }
