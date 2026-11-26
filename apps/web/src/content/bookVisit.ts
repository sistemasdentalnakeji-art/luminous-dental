// Sección «Book your visit» (components/BookVisit.tsx), en dos idiomas. Es solo información: no tiene campos; el botón lleva a la reserva de Adit (clinic.bookingUrl).
// Textos NUEVOS (26-11), POR APROBAR en docs/datos.md. El horario sale de content/clinic.ts y los nombres de financieras de content/financing.ts.
import type { L10n } from '@/lib/lang'

const en = {
  id: 'appointment', // se conserva para que /contact#appointment y la barra del celular sigan encontrando la sección
  heading: 'Book your visit',
  accent: 'visit',
  text: 'On our online booking page you choose your service and a time that works for you, and you get a confirmation. Prefer to talk to someone? Call or text us.',
  emergency: 'Dental emergency? Call us any day, at any hour.',
  points: {
    hours: 'Hours',
    insurance: { title: 'Insurance', text: 'Our providers are affiliated with most private dental insurance.' },
    financing: { title: 'Financing', text: (names: string) => `Payment options with ${names}.` },
  },
  cta: 'Request an appointment',
  call: 'Call or text',
  newTab: '(opens in a new tab)',
}

const es: typeof en = {
  id: 'appointment',
  heading: 'Reserva tu visita',
  accent: 'visita',
  text: 'En nuestra página de reservas en línea eliges tu servicio y un horario que te acomode, y recibes una confirmación. ¿Prefieres hablar con alguien? Llámanos o escríbenos.',
  emergency: '¿Emergencia dental? Llámanos cualquier día, a cualquier hora.',
  points: {
    hours: 'Horario',
    insurance: { title: 'Seguros', text: 'Nuestros proveedores están afiliados a la mayoría de los seguros dentales privados.' },
    financing: { title: 'Financiamiento', text: (names) => `Opciones de pago con ${names}.` },
  },
  cta: 'Solicita tu cita',
  call: 'Llama o escribe al',
  newTab: '(se abre en una pestaña nueva)',
}

export const bookVisitText: L10n<typeof en> = { en, es }
