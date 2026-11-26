// Textos del hub de Beneficios (/en/benefits · /es/beneficios) y de la página de Convenios (/en/agreements · /es/convenios). Las páginas de Seguros y Financiamiento
// siguen leyendo content/insurers.ts y content/financing.ts. Todo texto nuevo es POR APROBAR (docs/datos.md). Sin datos de Dental Nakeji.
import type { IconName } from '@/components/Icon'
import type { RouteKey } from '@/config/routes'
import type { L10n } from '@/lib/lang'

interface Card { to: RouteKey; icon: IconName; title: string; text: string; cta: string }

const en = {
  hub: {
    title: 'Benefits that make your care',
    accent: 'easier to manage',
    lead: 'Check your insurance, learn about financing, and see the partner benefits we offer our patients. Pick the one you need.',
    cardsLabel: 'Benefits',
    cards: [
      { to: 'insurance', icon: 'shield', title: 'Insurance', text: 'See the plans on our list and how our team checks your coverage with you before treatment.', cta: 'See insurance' },
      { to: 'financing', icon: 'card', title: 'Financing', text: 'Learn about the financing companies we list and how each one fits into your visit.', cta: 'See financing' },
      { to: 'agreements', icon: 'star', title: 'Agreements', text: 'Partner benefits for our patients, including SAHARA Las Vegas for guests visiting from out of town.', cta: 'See agreements' },
    ] as Card[],
    help: 'Not sure which one fits you? Call or text us and we will help you choose.',
  },
  agreements: {
    lead: 'Partner benefits for patients of Luminous Dental.',
    name: 'SAHARA Las Vegas',
  },
  // Puntos del encabezado (sin cifras; POR APROBAR)
  points: [
    { icon: 'shield', title: 'Coverage, explained', text: 'We go over your insurance plan with you before treatment.' },
    { icon: 'card', title: 'Ways to pay', text: 'Financing companies you can apply with, so you can plan your care.' },
    { icon: 'star', title: 'Partner benefits', text: 'Special offers for our patients, like SAHARA Las Vegas.' },
  ] as { icon: IconName; title: string; text: string }[],
  how: 'How it works',
  hubSteps: [
    { title: 'Pick a benefit', text: 'Look at insurance, financing or our partner agreement, whichever fits you.' },
    { title: 'Talk with our team', text: 'Call or text us. We go over your plan or your options with you before any treatment.' },
    { title: 'Book your visit', text: 'Choose a day and time on our online booking page.' },
  ],
  financingSteps: [
    { title: 'Ask our team', text: 'Tell us you are interested in financing and we point you to the right company.' },
    { title: 'Apply with the company', text: 'The financing company reviews your application and decides on approval and terms.' },
    { title: 'Schedule your treatment', text: 'Once you know your options, we plan your visit together.' },
  ],
  band: { title: 'Ready to take the next step?', text: 'Book online in a few clicks, or call or text us and we will help you.' },
  seePlans: 'See the plans',
  nav: 'Benefits pages',
  hubLink: 'All benefits',
}
const es: typeof en = {
  hub: {
    title: 'Beneficios que hacen tu atención',
    accent: 'más sencilla',
    lead: 'Revisa tu seguro, conoce las opciones de financiamiento y mira los convenios que ofrecemos a nuestros pacientes. Elige el que necesitas.',
    cardsLabel: 'Beneficios',
    cards: [
      { to: 'insurance', icon: 'shield', title: 'Seguros', text: 'Mira los planes de nuestra lista y cómo nuestro equipo revisa tu cobertura contigo antes del tratamiento.', cta: 'Ver seguros' },
      { to: 'financing', icon: 'card', title: 'Financiamiento', text: 'Conoce las empresas de financiamiento con las que trabajamos y cómo encaja cada una en tu visita.', cta: 'Ver financiamiento' },
      { to: 'agreements', icon: 'star', title: 'Convenios', text: 'Convenios para nuestros pacientes, incluido SAHARA Las Vegas para quienes nos visitan de fuera de la ciudad.', cta: 'Ver convenios' },
    ],
    help: '¿No sabes cuál te conviene? Llámanos o escríbenos y te ayudamos a elegir.',
  },
  agreements: {
    lead: 'Convenios para los pacientes de Luminous Dental.',
    name: 'SAHARA Las Vegas',
  },
  points: [
    { icon: 'shield', title: 'Tu cobertura, explicada', text: 'Revisamos contigo tu plan de seguro antes del tratamiento.' },
    { icon: 'card', title: 'Formas de pago', text: 'Empresas de financiamiento con las que puedes solicitar, para planear tu atención.' },
    { icon: 'star', title: 'Beneficios de convenio', text: 'Ofertas especiales para nuestros pacientes, como SAHARA Las Vegas.' },
  ],
  how: 'Cómo funciona',
  hubSteps: [
    { title: 'Elige un beneficio', text: 'Mira seguros, financiamiento o nuestros convenios, el que más te convenga.' },
    { title: 'Habla con nuestro equipo', text: 'Llámanos o escríbenos. Revisamos contigo tu plan o tus opciones antes de cualquier tratamiento.' },
    { title: 'Reserva tu visita', text: 'Elige un día y una hora en nuestra página de reservas en línea.' },
  ],
  financingSteps: [
    { title: 'Pregunta a nuestro equipo', text: 'Dinos que te interesa el financiamiento y te orientamos hacia la empresa adecuada.' },
    { title: 'Solicítalo con la empresa', text: 'La empresa de financiamiento revisa tu solicitud y decide la aprobación y las condiciones.' },
    { title: 'Agenda tu tratamiento', text: 'Cuando conozcas tus opciones, planeamos tu visita juntos.' },
  ],
  band: { title: '¿Listo para dar el siguiente paso?', text: 'Reserva en línea en pocos clics, o llámanos o escríbenos y te ayudamos.' },
  seePlans: 'Ver los planes',
  nav: 'Páginas de beneficios',
  hubLink: 'Todos los beneficios',
}
export const benefitsHubText: L10n<typeof en> = { en, es }
