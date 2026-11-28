// Sección «Book your visit» (components/BookVisit.tsx), en dos idiomas: título, texto corto y botón a la agenda en línea.
// Ronda 8b (27-11): sin formulario (la dueña: es una sección para llevar a la agenda, no pide datos), sin horarios, seguros ni financiamiento. Textos POR APROBAR en docs/datos.md.
import type { L10n } from '@/lib/lang'

const en = {
  id: 'appointment', // se conserva para que /contact#appointment y la barra del celular sigan encontrando la sección
  heading: 'Book your visit',
  accent: 'visit',
  text: 'Choose your service and a time on our online booking page.',
  cta: 'Book online',
  newTab: '(opens in a new tab)',
}

const es: typeof en = {
  id: 'appointment',
  heading: 'Reserva tu visita',
  accent: 'visita',
  text: 'Elige tu servicio y un horario en nuestra página de reservas en línea.',
  cta: 'Reservar en línea',
  newTab: '(se abre en una pestaña nueva)',
}

export const bookVisitText: L10n<typeof en> = { en, es }
