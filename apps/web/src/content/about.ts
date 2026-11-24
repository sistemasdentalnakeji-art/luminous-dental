import { clinic } from '@/content/clinic'
import { home } from '@/content/home'

// Página About (ronda 4, 23-11-2026). Diseño: docs/diseno-about-23nov.md. Textos nuevos: POR APROBAR en docs/datos.md.
// Regla: lo que aún no está confirmado lleva `text: null` y la página NO lo dibuja (nunca se escribe «POR CONFIRMAR»).
// Para que crezca, basta poner el texto (o añadir otro elemento al arreglo).

// Trazos de los íconos (viewBox 24, línea).
const star = ['M12 3l2.2 5.6L20 9.5l-4.4 3.9L17 19l-5-3.1L7 19l1.4-5.6L4 9.5l5.8-.9z']
const pin = ['M12 21s-6-5.4-6-10a6 6 0 1112 0c0 4.6-6 10-6 10z', 'M9.8 11a2.2 2.2 0 104.4 0 2.2 2.2 0 10-4.4 0']
const question = ['M9.5 9a2.5 2.5 0 115 0c0 1.7-2.5 2-2.5 4M12 17h.01']
const tooth = ['M7 4c-2 0-3.5 1.6-3.5 4 0 2 1 3 1.5 5s.7 7 2.5 7c1.5 0 1.5-4 4.5-4s3 4 4.5 4c1.8 0 2-5 2.5-7s1.5-3 1.5-5c0-2.4-1.5-4-3.5-4-2 0-3 1-5 1S9 4 7 4z']
const heart = ['M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z']
const house = ['M3 11l9-7 9 7v9H3zM10 20v-6h4v6']

export type Icon = readonly string[]

export const about = {
  title: 'About Luminous Dental',
  lead: `A general and cosmetic dental office at ${clinic.address.street} in ${clinic.address.city}, with care built around keeping your natural teeth.`,
  story: {
    heading: 'Our story',
    lead: 'One idea runs through every visit: your teeth should last a lifetime.',
    items: [
      { id: 'began', title: 'How it began', icon: question as Icon, text: null as string | null }, // POR CONFIRMAR: año de apertura, quién la fundó, primeros pacientes
      { id: 'believe', title: 'What we believe', icon: star as Icon, text: home.why.points[0].text as string | null },
      { id: 'find', title: 'Where to find us', icon: pin as Icon, text: `${clinic.address.street}, ${clinic.address.city}, ${clinic.address.state}` as string | null, maps: true },
    ],
  },
  purpose: {
    sign: home.footer.tagline, // «Your teeth should last a lifetime.»
    cards: [
      { id: 'mission', title: 'Our mission', text: home.why.points[1].text as string | null },
      { id: 'vision', title: 'Our vision', text: null as string | null }, // POR CONFIRMAR: solo si la clínica la tiene escrita
    ],
  },
  values: {
    heading: 'What we stand for',
    icons: [tooth, heart, house] as Icon[], // uno por cada home.why.points, en orden
  },
  team: {
    heading: 'Meet the team',
    // Más integrantes: añadir otro objeto con el mismo formato (la foto es opcional). POR CONFIRMAR: nombres, roles y fotos.
    members: [
      {
        name: clinic.doctor.name,
        role: clinic.doctor.role,
        text: 'He is committed to delivering quality care and a comfortable experience for his patients.',
        facts: [
          { label: 'Experience', value: '4 years' },
          { label: 'Training', value: 'University of Nevada, Las Vegas' },
          { label: 'Language', value: clinic.doctor.languages.join(', ') },
        ],
        photo: { src: 'dr-hahn.jpg', alt: home.doctor.photoAlt, width: 734, height: 737 } as { src: string; alt: string; width: number; height: number } | null,
      },
    ],
  },
  callLabel: 'Call or text',
}
