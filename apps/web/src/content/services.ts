// Páginas de servicio (una por servicio de clinic.ts). Solo en inglés. Estructura copiada de la plantilla de servicios de Dental Nakeji
// (portada: título, subtítulo, 3 destacados · acerca de: título en forma de pregunta + párrafo · formulario de cita); los textos NO son de Nakeji.
// Fuente: las páginas oficiales https://luminousdentallv.com/<service>/ (revisadas el 2026-11-18); el sitio oficial tiene restos de plantilla
// («Lorem ipsum», el nombre de otra clínica, el nombre de un doctor, «15% off»), que NO se copian.
// `placeholder: true` = el sitio oficial no tiene texto útil para una parte de esta página. Esa parte se deja FUERA (oculta), nunca se rellena con
// texto de relleno, hasta que la clínica dé el real (POR CONFIRMAR, docs/datos.md).
import { clinic, services as clinicServices } from '@/content/clinic'

export type FigureId = 'braces' | 'implants' | 'bridges' | 'crowns' | 'whitening'
export type IconId = 'tooth' | 'sparkle' | 'braces' | 'child' | 'implant' | 'bridge' | 'shield'

export interface ServicePage {
  slug: string
  name: string // igual que en clinic.ts
  group: string
  icon: IconId
  figure?: FigureId // los 5 servicios que dibuja la figura
  title: string
  subtitle: string // '' = ninguno (oculto)
  highlights: string[] // de 0 a 3 puntos; ninguno = oculto
  about?: { title: string; text: string } // si falta, el texto «About the treatment» se oculta
  blogKey?: string // artículo del blog sobre este servicio (content/blog.en.json)
  placeholder?: boolean
}

const pages: Omit<ServicePage, 'slug' | 'group'>[] = [
  {
    name: 'Routine Dental Care', icon: 'tooth', blogKey: 'professional-dental-cleaning',
    title: 'Routine Dental Care',
    subtitle: 'Prevention is always better than restoration when it comes to your teeth.',
    highlights: ['Biannual checkups and exams.', 'Early detection of potential concerns.', 'Care for patients of all ages.'],
    about: {
      title: 'Why see your dentist on a routine basis?',
      text: 'Going to our dentist on a routine basis for dental care means seeing them regularly. Just like routine oil changes keep your car’s engine in great working order, routine dental care is essential to maintain a healthy smile. Regular visits could save you a future dental emergency.',
    },
  },
  {
    name: 'Dentures & Bridges', icon: 'bridge', figure: 'bridges', blogKey: 'partial-and-complete-dentures',
    title: 'Dentures & Bridges',
    subtitle: 'Replacements for missing teeth that focus on aesthetics, fit and comfort.',
    highlights: ['Full and partial dentures.', 'Bridges that close the gap left by missing teeth.', 'An exam first to recommend the right option.'],
    about: {
      title: 'What are dentures and bridges?',
      text: 'Dentures are replacements for missing teeth that can be taken out and put back into your mouth; there are two main types, full and partial. A dental bridge closes the gap left by one or more missing teeth: it is made of crowns for the teeth on either side of the gap and a false tooth or teeth in between. Our dentist will examine your case, listen to your concerns and recommend the appropriate option.',
    },
  },
  {
    name: 'Dental Cleaning', icon: 'sparkle', blogKey: 'professional-dental-cleaning',
    title: 'Dental Cleaning',
    subtitle: 'Professional cleanings that daily brushing and flossing cannot replace.',
    highlights: ['Removes plaque, tartar and bacteria.', 'Goes with a dental examination.', 'Helps lower the risk of cavities and gum disease.'],
    about: {
      title: 'What does a professional cleaning do?',
      text: 'Regular dental examinations and professional cleanings help remove plaque, tartar and bacteria that daily brushing and flossing cannot eliminate. Preventive dental care is one of the most effective ways to reduce the risk of cavities, gum disease and enamel erosion while preserving your natural teeth.',
    },
  },
  {
    name: 'Wisdom Tooth Removal', icon: 'tooth', blogKey: 'extractions-and-wisdom-teeth',
    title: 'Wisdom Tooth Removal',
    subtitle: 'An exam and a plan based on the position and condition of each tooth.',
    highlights: ['Exam and digital X-rays first.', 'A plan for each tooth.', 'Written aftercare instructions.'],
    about: {
      title: 'When are wisdom teeth a problem?',
      text: 'Wisdom teeth can cause a variety of oral health problems when they become impacted, crowded, or fail to erupt properly. Visits start with an exam and digital X-rays, and the team explains the process and answers your questions before any treatment.',
    },
  },
  {
    name: 'Dental Appliances', icon: 'shield', placeholder: true,
    title: 'Dental Appliances',
    subtitle: '',
    highlights: [],
  },
  {
    name: 'Porcelain Veneers & Crowns', icon: 'sparkle', figure: 'crowns', blogKey: 'dental-veneers',
    title: 'Porcelain Veneers & Crowns',
    subtitle: 'Cosmetic and restorative options made with porcelain.',
    highlights: ['Veneers are ultra-thin shells placed over teeth.', 'Crowns are placed over damaged teeth.', 'Made with porcelain, a durable material.'],
    about: {
      title: 'What are veneers and crowns?',
      text: 'Dental veneers are ultra-thin shells placed over the teeth that can help conceal imperfections. Dental crowns are placed by dentists over damaged teeth. We make use of porcelain to craft these cosmetic and restorative options. Schedule an appointment with our dentist to talk about which one fits your teeth.',
    },
  },
  {
    name: 'Cosmetic Bonding', icon: 'sparkle',
    title: 'Cosmetic Bonding',
    subtitle: 'A tooth-colored resin applied to repair damage.',
    highlights: ['Tooth-colored composite resin.', 'A shade guide helps match your natural teeth.', 'Can address cracked, chipped, misshapen or discolored teeth.'],
    about: {
      title: 'What is cosmetic bonding?',
      text: 'Cosmetic bonding is a procedure in which a dentist applies a tooth-colored composite resin to one or more of your teeth to repair damage. It is a practical alternative to crowns and veneers. A shade guide helps you choose a color that matches your natural teeth, and the resin is hardened with UV light.',
    },
  },
  {
    name: 'Dental Implants', icon: 'implant', figure: 'implants', blogKey: 'dental-implants-what-they-are',
    title: 'Dental Implants',
    subtitle: 'Artificial teeth to fill the gaps left by damaged, lost or decayed teeth.',
    highlights: ['Single, multiple or full arch implants.', 'A consultation to check your candidacy.', 'A personalized treatment plan.'],
    about: {
      title: 'How does the dental implant process work?',
      text: 'The process begins with an initial consultation, where our dentist can determine your candidacy for implants. Then your team creates a personalized treatment plan. Next, the density of the jawbone is checked and biocompatible titanium implants are placed. After the healing period, the dentist evaluates whether a crown, bridge or denture will help restore your smile.',
    },
  },
  {
    name: 'Teeth Whitening', icon: 'sparkle', figure: 'whitening', blogKey: 'teeth-whitening',
    title: 'Teeth Whitening',
    subtitle: 'Professional-grade products for yellow, discolored teeth.',
    highlights: ['Done under the observation of a dental professional.', 'Custom-made trays or UV light.', 'A take-home option may be available.'],
    about: {
      title: 'Is teeth whitening right for me?',
      text: 'Discolored teeth can make you feel self-conscious when you smile, speak and laugh. We treat yellow, discolored teeth with professional-grade products. Professional whitening is done under the observation of an expert, using custom-made trays or UV light, unlike some over-the-counter products that can damage enamel. If you value convenience, take-home whitening may suit you.',
    },
  },
  {
    name: 'Invisalign & Braces', icon: 'braces', figure: 'braces', blogKey: 'orthodontics-alignment-and-bite', placeholder: true,
    title: 'Invisalign & Braces',
    subtitle: 'A straighter smile and a better bite, for children, teens and adults.',
    highlights: ['Invisalign and braces.', 'For children, teens and adults.'],
  },
  {
    name: 'Pediatric Dentistry', icon: 'child', blogKey: 'your-childs-first-dental-visit',
    title: 'Pediatric Dentistry',
    subtitle: 'Healthy smiles begin early.',
    highlights: ['Regular exams and professional cleanings.', 'Fluoride treatments and dental sealants.', 'Gentle techniques and a calm atmosphere.'],
    about: {
      title: 'What does pediatric dental care include?',
      text: 'Preventive dentistry is one of the most important parts of pediatric dental care: regular dental exams, professional cleanings, fluoride treatments and dental sealants. Our caring professionals use gentle techniques, child-friendly communication and a calm atmosphere, and parent education is part of every visit.',
    },
  },
]

const slugOf = (name: string) => name.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export const servicePages: ServicePage[] = clinicServices.map((s) => {
  const page = pages.find((p) => p.name === s.name)
  if (!page) throw new Error(`Service without page content: ${s.name}`)
  return { ...page, slug: slugOf(s.name), group: s.group }
})

export const serviceBySlug = (slug: string) => servicePages.find((p) => p.slug === slug)

export const serviceText = {
  eyebrow: 'Our services',
  crumbs: 'Breadcrumb',
  book: 'Request an appointment',
  call: `Call or text ${clinic.phone.label}`,
  aboutEyebrow: 'About the treatment',
  noText: 'Call us to learn more about this service.', // NUEVO, para aprobación: se muestra donde el sitio oficial aún no tiene texto
  blogCta: 'Learn more about this treatment',
  featured: {
    title: 'Featured services',
    text: 'Some of the treatments we offer at our clinic in Las Vegas.', // NUEVO (adaptado de Dental Nakeji), para aprobación
    cta: 'View all services',
    // NUEVO, para aprobación: nombres cortos de las 5 pestañas bajo el carrusel, en el mismo orden que featuredNames
    tabs: ['Braces & Invisalign', 'Implants', 'Dentures & bridges', 'Veneers & crowns', 'Whitening'],
    card: 'View service',
    carousel: 'Featured services',
  },
  hub: {
    title: 'Dental services',
    accent: 'for the whole family',
    lead: 'Comprehensive dental care for the whole family: general, cosmetic, orthodontic and pediatric dentistry at Luminous Dental in Las Vegas.',
    indexLabel: 'Browse by category',
    card: 'View service',
  },
} as const

/** Los cinco servicios de la sección «Featured services» de la home, en este orden (nombres como en clinic.ts). Cada uno tiene su propia figura. */
export const featuredNames = ['Invisalign & Braces', 'Dental Implants', 'Dentures & Bridges', 'Porcelain Veneers & Crowns', 'Teeth Whitening'] as const
