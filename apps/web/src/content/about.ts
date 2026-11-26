import { clinic, clinicText, services } from '@/content/clinic'
import { financers } from '@/content/financing'
import { home } from '@/content/home'
import { servicesOf } from '@/content/services'
import { hrefOf } from '@/config/routes'
import type { L10n, Lang } from '@/lib/lang'

// About rehecha por tercera vez (26-11-2026, ronda 3, Diseñador UI-UX 2): héroe editorial con la frase aprobada y la foto del Dr. Hahn, fila de datos reales,
// una creencia en grande, tres valores con presencia y cierre con botón a cita. Textos nuevos POR APROBAR (docs/datos.md).
// Regla: lo que aún no está confirmado se omite (la página NO escribe «POR CONFIRMAR»). Para que crezca, añade un elemento al arreglo en los dos idiomas.
// POR CONFIRMAR: cómo y cuándo empezó la clínica (año, fundador), misión y visión escritas por la clínica, más integrantes del equipo y sus fotos, años de la clínica,
// y si la lista de 24 aseguradoras aplica a Luminous (por eso la fila de datos habla de financiamiento y NO cuenta aseguradoras).

// Trazos de los íconos (viewBox 24, línea).
const tooth = ['M7 4c-2 0-3.5 1.6-3.5 4 0 2 1 3 1.5 5s.7 7 2.5 7c1.5 0 1.5-4 4.5-4s3 4 4.5 4c1.8 0 2-5 2.5-7s1.5-3 1.5-5c0-2.4-1.5-4-3.5-4-2 0-3 1-5 1S9 4 7 4z']
const heart = ['M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z']
const house = ['M3 11l9-7 9 7v9H3zM10 20v-6h4v6']

export type Icon = readonly string[]

const en = {
  pill: 'About us',
  title: ['Your teeth should', 'last a lifetime.'],
  lead: 'A general and cosmetic dental office in Las Vegas, built around keeping your natural teeth.',
  experience: 'Experience', years: '4 years', training: 'Training', school: 'UNLV', language: 'Language',
  photoAlt: 'Dr. Christian Hahn, general dentist, in a white coat',
  factsLabel: 'Luminous Dental at a glance',
  emergencyLabel: 'dental emergencies, any day, any hour',
  cityLabel: 'Open in Google Maps',
  servicesLabel: 'dental services in one office',
  financeLabel: 'financing partners, and we go over your insurance with you',
  believe: 'What we believe',
  believeText: 'Nothing can truly replace the function of your natural teeth. Keeping them as long as possible comes first in every plan.',
  valuesHeading: 'What we stand for',
  values: ['We help you keep your own teeth', 'Care that feels comfortable', 'One office for your dental care'],
  closeTitle: 'Ready for your visit?',
  closeText: 'Request your appointment online or call us. For a dental emergency, call before you come, any day and at any hour.',
  closeCta: 'Request an appointment',
  newTab: '(opens in a new tab)',
  // Ronda 3 (D2): secciones nuevas, textos POR APROBAR. Todo lo demás (bio, horario, emergencias, servicios) sale de clinic.ts / services.ts.
  doctorHeading: 'Your dentist',
  stepsHeading: 'How your visit works',
  steps: [
    ['Request your appointment', 'Book online or call us. For a dental emergency, call before you come.'],
    ['We go over your coverage', 'Tell us your plan and our team goes over it with you before treatment.'],
    ['Meet Dr. Hahn', 'He goes over your options and plans your care around keeping your natural teeth.'],
  ],
  servicesHeading: 'Our services, in one office',
  servicesAll: 'See all services',
  emergencyHeading: 'Dental emergency?',
  emergencyMore: 'Emergency details',
  officeHeading: 'Visit the office',
  hoursLabel: 'Hours',
  addressLabel: 'Address',
  contactLabel: 'Contact',
  outOfTown: 'Visiting from out of town? See our partner agreement with SAHARA Las Vegas.',
  coverHeading: 'Insurance and financing',
  coverText: 'Not sure if your plan is on the list? Call or text us before your visit and we will go over it with you. Ask us about financing partners to spread the cost of care over time.',
  coverLinks: ['Insurance', 'Financing', 'All benefits'],
}
const es: typeof en = {
  pill: 'Nosotros',
  title: ['Tus dientes deben', 'durar toda la vida.'],
  lead: 'Un consultorio dental general y estético en Las Vegas, pensado para conservar tus dientes naturales.',
  experience: 'Experiencia', years: '4 años', training: 'Formación', school: 'UNLV', language: 'Idioma',
  photoAlt: 'El Dr. Christian Hahn, dentista general, con bata blanca',
  factsLabel: 'Luminous Dental de un vistazo',
  emergencyLabel: 'emergencias dentales, cualquier día, a cualquier hora',
  cityLabel: 'Abrir en Google Maps',
  servicesLabel: 'servicios dentales en un solo consultorio',
  financeLabel: 'aliados de financiamiento, y revisamos tu seguro contigo',
  believe: 'Lo que creemos',
  believeText: 'Nada puede reemplazar realmente la función de tus dientes naturales. Conservarlos el mayor tiempo posible es lo primero en cada plan.',
  valuesHeading: 'Lo que nos importa',
  values: ['Te ayudamos a conservar tus propios dientes', 'Atención en la que te sientes cómodo', 'Un solo consultorio para tu atención dental'],
  closeTitle: '¿Listo para tu visita?',
  closeText: 'Solicita tu cita en línea o llámanos. Si es una emergencia dental, llama antes de venir, cualquier día y a cualquier hora.',
  closeCta: 'Solicita tu cita',
  newTab: '(se abre en una pestaña nueva)',
  doctorHeading: 'Tu dentista',
  stepsHeading: 'Cómo es tu visita',
  steps: [
    ['Solicita tu cita', 'Reserva en línea o llámanos. Si es una emergencia dental, llama antes de venir.'],
    ['Revisamos tu cobertura', 'Dinos cuál es tu plan y nuestro equipo lo revisa contigo antes del tratamiento.'],
    ['Conoce al Dr. Hahn', 'Revisa contigo tus opciones y planea tu atención para conservar tus dientes naturales.'],
  ],
  servicesHeading: 'Nuestros servicios, en un solo consultorio',
  servicesAll: 'Ver todos los servicios',
  emergencyHeading: '¿Emergencia dental?',
  emergencyMore: 'Detalles de emergencias',
  officeHeading: 'Visita el consultorio',
  hoursLabel: 'Horario',
  addressLabel: 'Dirección',
  contactLabel: 'Contacto',
  outOfTown: '¿Nos visitas desde fuera de la ciudad? Mira nuestro convenio con SAHARA Las Vegas.',
  coverHeading: 'Seguros y financiamiento',
  coverText: '¿No sabes si tu plan está en la lista? Llámanos o escríbenos por mensaje antes de tu visita y lo revisamos contigo. Pregúntanos por los aliados de financiamiento para repartir el costo de tu atención en el tiempo.',
  coverLinks: ['Seguros', 'Financiamiento', 'Todos los beneficios'],
}

const make = (lang: Lang) => {
  const w = ({ en, es } as const)[lang], all = clinicText[lang], doc = all.doctor
  return {
    pill: w.pill,
    title: w.title,
    lead: w.lead,
    doctor: {
      name: clinic.doctor.name,
      role: doc.role,
      photo: { src: 'dr-hahn.jpg', alt: w.photoAlt, width: 734, height: 737 },
      facts: [
        { label: w.experience, value: w.years },
        { label: w.training, value: w.school },
        { label: w.language, value: doc.languages.join(', ') },
      ],
    },
    // Fila de datos reales: cada valor sale de clinic.ts / financing.ts. `href` solo en la ciudad (abre el mapa).
    factsLabel: w.factsLabel,
    facts: [
      { value: '24/7', label: w.emergencyLabel, href: null as string | null, sr: '' },
      { value: clinic.address.city, label: `${clinic.address.street}, ${clinic.address.state}`, href: clinic.mapsUrl as string | null, sr: w.cityLabel },
      { value: String(services.length), label: w.servicesLabel, href: null as string | null, sr: '' },
      { value: String(financers.length), label: w.financeLabel, href: null as string | null, sr: '' },
    ],
    believe: { heading: w.believe, text: w.believeText },
    values: { heading: w.valuesHeading, items: w.values.map((title, n) => ({ title, icon: ([tooth, heart, house] as Icon[])[n] })) },
    doctorSection: { heading: w.doctorHeading, bio: doc.bio },
    steps: { heading: w.stepsHeading, items: w.steps.map(([title, text]) => ({ title, text })) },
    servicesSection: {
      heading: w.servicesHeading, all: w.servicesAll, allHref: hrefOf('services', lang),
      groups: [...new Set(servicesOf(lang).map((x) => x.group))].map((g) => ({ name: g, items: servicesOf(lang).filter((x) => x.group === g).map((x) => ({ name: x.name, href: hrefOf(`service:${x.id}`, lang) })) })),
    },
    emergency: { heading: w.emergencyHeading, title: all.emergency.title, text: all.emergency.text, examples: all.emergency.examples, more: w.emergencyMore, moreHref: hrefOf('contact', lang, 'emergencies'), call: all.emergency.cta },
    office: { heading: w.officeHeading, hoursLabel: w.hoursLabel, addressLabel: w.addressLabel, contactLabel: w.contactLabel, hours: all.hours, outOfTown: w.outOfTown, outOfTownHref: hrefOf('agreements', lang) },
    cover: { heading: w.coverHeading, text: w.coverText, partners: financers.map((f) => f.name), links: [hrefOf('insurance', lang), hrefOf('financing', lang), hrefOf('benefits', lang)].map((href, n) => ({ href, label: w.coverLinks[n] })) },
    close: { title: w.closeTitle, text: w.closeText, cta: w.closeCta, newTab: w.newTab, phone: home[lang].header.phone.label },
  }
}

export const about: L10n<ReturnType<typeof make>> = { en: make('en'), es: make('es') }
