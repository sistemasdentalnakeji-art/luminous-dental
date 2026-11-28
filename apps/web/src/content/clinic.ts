// Fuente: https://luminousdentallv.com (inicio, menú, pie de página y página de contacto), revisado el 2026-11-17.
// Solo datos del sitio oficial o confirmados por la dueña. Lo que falta es null y está marcado «POR CONFIRMAR» en docs/datos.md.
// `clinic` = datos iguales en los dos idiomas (dirección, teléfono, enlaces); `clinicText` = los que llevan texto (horario, emergencias, doctor).
import type { L10n } from '@/lib/lang'

export const clinic = {
  name: 'Luminous Dental',
  tagline: 'Dentist in Las Vegas, NV – General & Cosmetic Dentistry',
  address: { street: '1212 S Maryland Pkwy', city: 'Las Vegas', state: 'NV' },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=1212+S+Maryland+Pkwy+Las+Vegas+NV',
  phone: { label: '(702) 805-8688', href: 'tel:+17028058688' },
  email: 'info@luminousdentallv.com',
  // Agenda y cobros: Adit (dueña, 25-11). Todos los botones «Request an appointment» y «Book your appointment» llevan aquí.
  bookingUrl: 'https://booking.adit.com/ad197179-9227-4a53-bc36-fadaec746854',
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61554688456073',
    instagram: 'https://www.instagram.com/luminousdentalvegas',
  },
  doctor: { name: 'Dr. Christian Hahn' },
  outOfTownUrl: 'https://stay.saharalasvegas.com/promo?hotel=SLSLV&accessCode=LUMI',
} as const

// Datos de la clínica que llevan texto: un lado por idioma (useLang() → clinicText[lang]).
const en = {
  // Horario confirmado por la dueña el 2026-11-25. Es el único lugar donde se escribe; lo leen Contact, el pie y la ubicación.
  hours: [
    { days: 'Tuesday', time: '4:00 PM – 8:00 PM' },
    { days: 'Wednesday – Saturday', time: '8:00 AM – 4:00 PM' },
    { days: 'Sunday – Monday', time: 'Closed' },
  ],
  // Emergencias 24/7 (dueña, 25-11; coincide con el post de Google Business del 17-jul-2026: «call before arriving»). Textos NUEVOS, POR APROBAR.
  emergency: {
    title: '24/7 dental emergencies',
    text: 'Dental emergencies are attended any day, at any hour. Please call before you come.',
    cta: 'Call now',
    // 26-11: qué cuenta como emergencia (dueña). Textos NUEVOS, POR APROBAR.
    examplesTitle: 'What counts as an emergency',
    examples: ['Severe tooth pain', 'A broken or knocked-out tooth', 'Swelling in the gums or face'],
    callLabel: 'Call us any time',
  },
  doctor: {
    role: 'General Dentist',
    bio: 'Dr. Christian Hahn is a general dentist with 4 years of experience. He completed his dental training at the University of Nevada, Las Vegas, specializing in general dentistry. He is committed to delivering quality care and ensuring a comfortable experience for his patients.',
    languages: ['English'],
  },
}
const es: typeof en = {
  hours: [
    { days: 'Martes', time: '4:00 p. m. – 8:00 p. m.' },
    { days: 'Miércoles – sábado', time: '8:00 a. m. – 4:00 p. m.' },
    { days: 'Domingo – lunes', time: 'Cerrado' },
  ],
  emergency: {
    title: 'Emergencias dentales 24/7',
    text: 'Atendemos emergencias dentales cualquier día, a cualquier hora. Por favor, llama antes de venir.',
    cta: 'Llamar ahora',
    examplesTitle: 'Qué cuenta como emergencia',
    examples: ['Dolor fuerte de muela o diente', 'Un diente roto o que se cayó', 'Hinchazón en la encía o en la cara'],
    callLabel: 'Llámanos a cualquier hora',
  },
  doctor: {
    role: 'Dentista general',
    bio: 'El Dr. Christian Hahn es dentista general con 4 años de experiencia. Realizó su formación dental en la Universidad de Nevada, Las Vegas, con especialidad en odontología general. Se compromete a ofrecer atención de calidad y una experiencia cómoda a sus pacientes.',
    languages: ['Inglés'],
  },
}
export const clinicText: L10n<typeof en> = { en, es }

export const services = [
  { group: 'General Dentistry', name: 'Routine Dental Care', source: 'https://luminousdentallv.com/routine-dental-care/' },
  { group: 'General Dentistry', name: 'Dentures & Bridges', source: 'https://luminousdentallv.com/dentures-bridges/' },
  { group: 'General Dentistry', name: 'Dental Cleaning', source: 'https://luminousdentallv.com/' },
  { group: 'General Dentistry', name: 'Wisdom Tooth Removal', source: 'https://luminousdentallv.com/' },
  { group: 'General Dentistry', name: 'Dental Appliances', source: 'https://luminousdentallv.com/' },
  { group: 'Cosmetic Dentistry', name: 'Porcelain Veneers & Crowns', source: 'https://luminousdentallv.com/porcelain-veneers-crowns/' },
  { group: 'Cosmetic Dentistry', name: 'Cosmetic Bonding', source: 'https://luminousdentallv.com/cosmetic-bonding/' },
  { group: 'Cosmetic Dentistry', name: 'All-on-4 Implants', source: 'https://luminousdentallv.com/' }, // POR CONFIRMAR: lo pidió la dueña el 25-11; el sitio oficial no tiene página
  { group: 'Cosmetic Dentistry', name: 'All-on-6 Implants', source: 'https://luminousdentallv.com/' }, // ídem (separado en dos el 27-11)
  { group: 'Cosmetic Dentistry', name: 'Dental Implants', source: 'https://luminousdentallv.com/dental-implants/' },
  { group: 'Cosmetic Dentistry', name: 'Teeth Whitening', source: 'https://luminousdentallv.com/teeth-whitening/' },
  { group: 'Orthodontics', name: 'Invisalign & Braces', source: 'https://luminousdentallv.com/' },
] as const

/** Identificador estable de un servicio («Dental Implants» -> «dental-implants»); es también su dirección en inglés. */
export const serviceId = (name: string) =>
  name.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
