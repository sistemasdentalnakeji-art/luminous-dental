import { clinic, clinicText } from '@/content/clinic'
import { financers } from '@/content/financing'
import { servicesOf } from '@/content/services'
import type { L10n, Lang } from '@/lib/lang'

// Preguntas frecuentes (26-11-2026, B3). Estructura copiada de Dental Nakeji (data/faq.ts, pages/faq/FaqPage.tsx): grupos con preguntas, buscador y acordeón.
// Solo datos de Luminous: horario, 24/7, Adit, seguros, financiamiento y dirección salen de content/clinic.ts y financing.ts. Textos NUEVOS, POR APROBAR (docs/datos.md).
// POR CONFIRMAR (no se escribieron, para no inventar): plazo de cancelación, tolerancia de llegada tarde, depósito, edad mínima de pacientes, garantías, formas de pago aceptadas, número de WhatsApp.
// Para agregar una pregunta: un objeto más en el grupo, en los dos idiomas (TypeScript avisa si falta uno).
export interface FaqItem { question: string; answer: string }
export interface FaqGroup { id: string; title: string; items: FaqItem[] }

const hoursOf = (lang: Lang) => clinicText[lang].hours.map((h) => `${h.days}: ${h.time}`).join('; ')
const address = `${clinic.address.street}, ${clinic.address.city}, ${clinic.address.state}`
const phone = clinic.phone.label

const en = {
  eyebrow: 'FAQ',
  title: 'Questions & answers',
  headline: ['Questions', '& answers'],
  lead: 'We want you to arrive at your appointment feeling at ease. Here you will find answers about appointments, treatments, payment and insurance. If you need anything else, call us and we will go over it with you.',
  search: 'Find your answer', placeholder: 'Appointments, insurance, emergencies…', clear: 'Clear search',
  all: 'All questions', categories: 'Filter questions by topic', results: 'questions',
  empty: 'We could not find that question.', emptyText: 'Try another word or call us. We are happy to help.', reset: 'View all questions',
  helpTitle: 'Can’t find your answer?', helpText: 'Call us and we will help you. For a dental emergency, call before you come, any day and at any hour.',
  call: 'Call', book: 'Request an appointment', newTab: '(opens in a new tab)',
  groups: (lang: Lang): FaqGroup[] => [
    { id: 'appointments', title: 'Appointments', items: [
      { question: 'How do I request an appointment?', answer: `Use the “Request an appointment” button on this site: it opens our online booking in a new tab. You can also call us at ${phone}.` },
      { question: 'What are your hours?', answer: `${hoursOf(lang)}. Dental emergencies are attended any day, at any hour.` },
      { question: 'Can I change my appointment?', answer: `Yes. Call us at ${phone} and we will help you find a new time.` },
    ] },
    { id: 'treatments', title: 'Services and treatments', items: [
      { question: 'How do I know what treatment I need?', answer: 'Request an evaluation so the dentist can review your case and recommend the right treatment.' },
      { question: 'What services do you offer?', answer: `We offer general dentistry, cosmetic dentistry and orthodontics: ${servicesOf(lang).map((s) => s.name).join(', ')}.` },
      { question: 'Can I get a quote before my visit?', answer: `To give you a quote, the dentist needs to review your case. Call us at ${phone} and we will tell you how to get started.` },
    ] },
    { id: 'payments', title: 'Payments and financing', items: [
      { question: 'Can I pay for treatment over time?', answer: `Ask us about our financing partners: ${financers.map((f) => f.name).join(', ')}. Approval and terms are set by each company.` },
      { question: 'Where can I read about financing?', answer: 'The Benefits section of this site explains each financing partner and how it works at our office.' },
    ] },
    { id: 'insurance', title: 'Insurance and agreements', items: [
      { question: 'Do you work with my insurance?', answer: `Our Benefits page lists the plans we show. If you are not sure yours is included, call or text us at ${phone} before your visit and we will go over it with you.` },
      { question: 'Do you have agreements with other businesses?', answer: 'Yes. We have partnered with SAHARA Las Vegas to offer exclusive benefits for our patients. See the Agreements page for details.' },
    ] },
    { id: 'emergencies', title: 'Dental emergencies', items: [
      { question: 'Do you treat dental emergencies?', answer: `Yes, 24/7. Dental emergencies are attended any day, at any hour. Please call ${phone} before you come.` },
      { question: 'Where are you?', answer: `We are at ${address}.` },
    ] },
  ],
}

const es: typeof en = {
  eyebrow: 'Preguntas frecuentes',
  title: 'Preguntas y respuestas',
  headline: ['Preguntas', 'y respuestas'],
  lead: 'Queremos que llegues a tu cita con tranquilidad. Aquí encontrarás respuestas sobre citas, tratamientos, pagos y seguros. Si necesitas algo más, llámanos y lo vemos contigo.',
  search: 'Busca tu pregunta', placeholder: 'Citas, seguros, emergencias…', clear: 'Borrar búsqueda',
  all: 'Todas', categories: 'Filtrar preguntas por tema', results: 'preguntas',
  empty: 'No encontramos esa pregunta.', emptyText: 'Prueba con otra palabra o llámanos. Con gusto te ayudamos.', reset: 'Ver todas las preguntas',
  helpTitle: '¿No encuentras tu respuesta?', helpText: 'Llámanos y te ayudamos. Si es una emergencia dental, llama antes de venir, cualquier día y a cualquier hora.',
  call: 'Llamar', book: 'Solicita tu cita', newTab: '(se abre en una pestaña nueva)',
  groups: (lang) => [
    { id: 'appointments', title: 'Citas', items: [
      { question: '¿Cómo solicito una cita?', answer: `Usa el botón «Solicita tu cita» de este sitio: abre nuestra agenda en línea en una pestaña nueva. También puedes llamarnos al ${phone}.` },
      { question: '¿Cuál es su horario?', answer: `${hoursOf(lang)}. Las emergencias dentales se atienden cualquier día, a cualquier hora.` },
      { question: '¿Puedo cambiar mi cita?', answer: `Sí. Llámanos al ${phone} y te ayudamos a encontrar un nuevo horario.` },
    ] },
    { id: 'treatments', title: 'Servicios y tratamientos', items: [
      { question: '¿Cómo sé qué tratamiento necesito?', answer: 'Solicita una valoración para que el dentista revise tu caso y te indique el tratamiento adecuado.' },
      { question: '¿Qué servicios ofrecen?', answer: `Ofrecemos odontología general, odontología estética y ortodoncia: ${servicesOf(lang).map((s) => s.name).join(', ')}.` },
      { question: '¿Puedo recibir una cotización antes de mi visita?', answer: `Para darte una cotización, el dentista necesita revisar tu caso. Llámanos al ${phone} y te decimos cómo empezar.` },
    ] },
    { id: 'payments', title: 'Pagos y financiamiento', items: [
      { question: '¿Puedo pagar mi tratamiento con el tiempo?', answer: `Pregúntanos por nuestros aliados de financiamiento: ${financers.map((f) => f.name).join(', ')}. La aprobación y las condiciones las define cada empresa.` },
      { question: '¿Dónde puedo leer sobre el financiamiento?', answer: 'La sección de Beneficios de este sitio explica cada aliado de financiamiento y cómo funciona en nuestro consultorio.' },
    ] },
    { id: 'insurance', title: 'Seguros y convenios', items: [
      { question: '¿Trabajan con mi seguro?', answer: `Nuestra página de Beneficios muestra los planes que listamos. Si no estás seguro de que el tuyo esté incluido, llámanos o escríbenos al ${phone} antes de tu visita y lo revisamos contigo.` },
      { question: '¿Tienen convenios con otras empresas?', answer: 'Sí. Nos asociamos con SAHARA Las Vegas para ofrecer beneficios exclusivos a nuestros pacientes. Consulta la página de Convenios para ver los detalles.' },
    ] },
    { id: 'emergencies', title: 'Urgencias dentales', items: [
      { question: '¿Atienden urgencias dentales?', answer: `Sí, las 24 horas, todos los días. Las emergencias dentales se atienden cualquier día, a cualquier hora. Por favor llama al ${phone} antes de venir.` },
      { question: '¿Dónde están?', answer: `Estamos en ${address}.` },
    ] },
  ],
}

export const faq: L10n<typeof en> = { en, es }
