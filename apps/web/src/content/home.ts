// Texto de la página de inicio, del menú y del pie de Luminous Dental, en dos idiomas: `home.en` y `home.es` (L10n, con la misma forma; useLang() elige el lado). Solo datos: sin componentes ni estilos.
// Enlaces internos: no se escribe el path; se pone la clave de la ruta (`to: 'about'`, más `hash` si lleva ancla) y el componente la resuelve con hrefOf(to, lang) (config/routes.ts). Enlaces externos: `href`.
// Regla: cada dato viene de https://luminousdentallv.com (revisado el 2026-11-17) o dice POR CONFIRMAR. El español (26-11) es traducción nueva, de tú, POR APROBAR (docs/datos.md).
// No se muestra a propósito: calificación de Google, precios, ofertas, «40 years», «top-rated», «free consultation». El horario y las emergencias 24/7 salen de content/clinic.ts (dueña, 25-11).

import type { IconName } from '@/components/Icon'
import type { RouteKey } from '@/config/routes'
import { clinic } from '@/content/clinic'
import type { L10n } from '@/lib/lang'

const tel = clinic.phone.label // el único lugar donde se escribe el número (content/clinic.ts)

/** Enlace interno por clave de ruta (con ancla opcional) o enlace externo. */
export type Target = { label: string; to: RouteKey; hash?: string } | { label: string; href: string }
export type NavItem =
  | { label: string; to: RouteKey; menu?: boolean }
  // Submenú. Con `to` + `overview` (Benefits) la etiqueta lleva a la página principal desde un botón al pie del panel.
  | { label: string; id: string; to: RouteKey; overview: string; items: { label: string; to: RouteKey; icon: IconName }[] }
  | { label: string; items: { label: string; to: RouteKey; icon: IconName }[] }

const en = {
  seo: {
    title: 'Luminous Dental | General & Cosmetic Dentist in Las Vegas', // 57 caracteres
    description:
      "Luminous Dental in Las Vegas: general, cosmetic and orthodontic dental care with Dr. Christian Hahn. Request an appointment today.", // 130 caracteres
  },

  // 1. Encabezado y menú
  header: {
    skipLink: 'Skip to main content',
    // Mismo orden que el menú de Dental Nakeji (mismo dueño). «Services» abre un panel con todos los servicios.
    nav: [
      { label: 'Home', to: 'home' },
      { label: 'Services', to: 'services', menu: true },
      { label: 'Benefits', id: 'benefits', to: 'benefits', overview: 'View all benefits', items: [
        { label: 'Insurance', to: 'insurance', icon: 'shield' },
        { label: 'Financing', to: 'financing', icon: 'card' },
        { label: 'Agreements', to: 'agreements', icon: 'users' },
      ] },
      { label: 'Contact', to: 'contact' },
      { label: 'About', to: 'about' },
      // «More»: submenú con lo que no cabe en la barra (icono = nombre de components/Icon.tsx).
      { label: 'More', items: [
        { label: 'Blog', to: 'blog', icon: 'book' },
        { label: 'FAQ', to: 'faq', icon: 'help' },
        { label: 'Terms and Conditions', to: 'terms', icon: 'document' },
        { label: 'Privacy Policy', to: 'privacy', icon: 'lock' },
      ] },
    ] as NavItem[],
    servicesOverview: 'View all services',
    cta: { label: 'Request an appointment', href: clinic.bookingUrl },
    phone: { label: `Call or text ${tel}`, href: clinic.phone.href },
  },

  // 2. Portada (hero)
  hero: {
    // CAMBIO PEDIDO POR LA DUEÑA (20-11-2026): titular del archivo «Luminous Dental - Smile Makeover.html». Reemplaza al aprobado en «Sí 1»
    // («Your teeth should last a lifetime»); el dueño lo debe confirmar. Si no lo confirma, volver a ese titular.
    // 26-11 (B1): titular nuevo (Las Vegas, emergencias 24/7, servicios reales). POR APROBAR; el anterior era «A smile that feels more like you.»
    pill: 'Las Vegas · Emergencies 24/7',
    lines: ['Emergency or', 'smile makeover,'], // primeras líneas del titular
    emphasis: "we're here.", // última línea, en cursiva con el color de acento
    support: 'General, cosmetic and orthodontic care with Dr. Christian Hahn. Call any hour for a dental emergency, or book your visit online.',
    primaryCta: { label: 'Book an in-office consultation', href: clinic.bookingUrl },
    secondaryCta: { label: `Call or text ${tel}`, href: clinic.phone.href },
    // POR CONFIRMAR: «Free virtual consultation» (no existe en docs/datos.md ni en clinic.ts) y el texto «start the conversation from home». No se muestran.
    more: { label: 'See how a visit works', href: '#visit' },
  },

  // 2b. Sección estrella (components/FamilyCare.tsx): cómo es tu visita, en 4 pasos con datos reales. Textos NUEVOS, POR APROBAR.
  visit: {
    heading: 'Your visit, one clear step at a time',
    accent: 'clear',
    steps: [
      { title: 'You call or book', text: `Book online, or call or text ${tel}. Dental emergencies are attended any day, at any hour; please call before you come.` },
      { title: 'We evaluate', text: 'Dr. Christian Hahn and the team look at your teeth and listen to what you need.' },
      { title: 'You get a clear plan', text: 'We explain your options before any treatment and go over insurance, financing and our agreements with you.' },
      { title: 'We treat', text: 'General, cosmetic and orthodontic care in one office, with the same team at every visit.' },
    ],
  },

  // 3. Servicios en 3 grupos (id = ancla en la página de servicios)
  services: {
    heading: 'Everyday dental care you can count on',
    accent: 'count on',
    groups: [
      {
        id: 'general', name: 'General Dentistry',
        line: 'Checkups, cleanings, fillings and preventive care to keep your smile healthy at every stage of life.',
      },
      {
        id: 'cosmetic', name: 'Cosmetic Dentistry',
        line: 'Veneers, crowns, bonding, implants, All-on-4 and All-on-6, and whitening to improve how your smile looks and works.',
      },
      {
        id: 'orthodontics', name: 'Orthodontics',
        line: 'Invisalign and braces for a straighter smile and a better bite, for teens and adults.',
      },
    ],
  },

  // 4. Por qué Luminous
  why: {
    heading: 'Why patients choose Luminous Dental',
    accent: 'Luminous Dental',
    points: [
      {
        title: 'We help you keep your own teeth',
        text: 'Nothing can truly replace the function of your natural teeth. Keeping them as long as possible comes first in every plan.',
      },
      {
        title: 'Care that feels comfortable',
        text: 'Our team is dedicated to personalized, comfortable, high-quality dental care for every patient.',
      },
      {
        title: 'One office for your dental care',
        text: 'General, cosmetic and orthodontic care in the same place, so you see the same team at every visit.',
      },
      // Se omite hasta que la clínica lo confirme (docs/datos.md): «We work with most private dental insurance».
    ],
  },

  // 5. Doctor
  doctor: {
    heading: 'Meet Dr. Christian Hahn',
    // NUEVO, para aprobación: empieza con «He is» para no repetir el nombre bajo el título (solo en la página About).
    text: 'He is a general dentist with 4 years of experience. He completed his dental training at the University of Nevada, Las Vegas. He is committed to delivering quality care and a comfortable experience for his patients.',
    language: 'Language: English',
    photoAlt: 'Dr. Christian Hahn, general dentist, in a white coat',
  },

  // 8. Seguros y pacientes de fuera de la ciudad (las reseñas están en content/reviews.ts)
  coverage: {
    insurance: {
      heading: 'Insurance',
    },
    outOfTown: {
      heading: 'Coming from out of town?',
      accent: 'out of town?',
      text: "We've partnered with SAHARA Las Vegas to offer exclusive benefits for our patients.",
      cta: {
        label: 'See SAHARA Las Vegas benefits',
        href: clinic.outOfTownUrl,
      },
    },
  },

  // 9. Convenios del inicio (components/Agreements.tsx; reemplaza el bloque de seguros). El dato de SAHARA sale de coverage.outOfTown. Textos NUEVOS, POR APROBAR.
  // El formulario corto (components/LeadForm.tsx) tiene sus textos en content/form.ts.
  agreements: {
    heading: 'Agreements for our patients',
    accent: 'patients',
    lead: 'Beyond insurance, we team up with partners that help our patients.',
    partner: 'SAHARA Las Vegas',
    partnerTag: 'Visiting from out of town',
    clinicAlt: 'Luminous Dental',
    more: { label: 'See all agreements', to: 'agreements' } as Target,
  },

  // 10. Pie de página
  footer: {
    tagline: 'Your teeth should last a lifetime.',
    contactHeading: 'Contact',
    hoursHeading: 'Hours',
    address: '1212 S Maryland Pkwy, Las Vegas, NV 89104',
    phone: { label: `Call or text ${tel}`, href: clinic.phone.href },
    email: { label: 'info@luminousdentallv.com', href: 'mailto:info@luminousdentallv.com' },
    social: [
      { label: 'Instagram', href: 'https://www.instagram.com/luminousdentalvegas' },
      { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61554688456073' },
    ],
    // Columnas como el pie de Dental Nakeji. Privacy Policy y Terms se suman cuando sus páginas tengan contenido real (docs/datos.md).
    servicesHeading: 'Services',
    services: ['porcelain-veneers-and-crowns', 'dental-implants', 'invisalign-and-braces', 'teeth-whitening'], // ids de servicio (content/services.ts)
    benefitsHeading: 'Benefits',
    benefits: [
      { label: 'Insurance', to: 'insurance' },
      { label: 'Financing', to: 'financing' },
      { label: 'Agreements', to: 'agreements' },
    ] as Target[],
    clinicHeading: 'Clinic',
    links: [
      { label: 'About', to: 'about' },
      { label: 'FAQ', to: 'faq' },
      { label: 'Blog', to: 'blog' },
      { label: 'Contact', to: 'contact' },
    ] as Target[],
    legalHeading: 'Legal',
    legalLinks: [
      { label: 'Terms and Conditions', to: 'terms' },
      { label: 'Privacy Policy', to: 'privacy' },
    ] as Target[],
    emergencyLine: 'Emergencies 24/7',
    request: { label: 'Request an appointment', href: clinic.bookingUrl },
    legal: 'Luminous Dental, Las Vegas. All rights reserved.', // el componente agrega el año
    note: 'Individual results vary.',
    // NUEVO, para aprobación: detiene toda animación decorativa de la página (WCAG 2.2.2).
    motion: { pause: 'Pause decorative animations', play: 'Play decorative animations' },
  },
}

const es: typeof en = {
  seo: {
    title: 'Luminous Dental | Dentista general y estético en Las Vegas',
    description:
      'Luminous Dental en Las Vegas: atención dental general, estética y de ortodoncia con el Dr. Christian Hahn. Solicita tu cita hoy.',
  },

  header: {
    skipLink: 'Saltar al contenido principal',
    nav: [
      { label: 'Inicio', to: 'home' },
      { label: 'Servicios', to: 'services', menu: true },
      { label: 'Beneficios', id: 'benefits', to: 'benefits', overview: 'Ver todos los beneficios', items: [
        { label: 'Seguros', to: 'insurance', icon: 'shield' },
        { label: 'Financiamiento', to: 'financing', icon: 'card' },
        { label: 'Convenios', to: 'agreements', icon: 'users' },
      ] },
      { label: 'Contacto', to: 'contact' },
      { label: 'Nosotros', to: 'about' },
      { label: 'Más', items: [
        { label: 'Blog', to: 'blog', icon: 'book' },
        { label: 'Preguntas frecuentes', to: 'faq', icon: 'help' },
        { label: 'Términos y condiciones', to: 'terms', icon: 'document' },
        { label: 'Aviso de privacidad', to: 'privacy', icon: 'lock' },
      ] },
    ],
    servicesOverview: 'Ver todos los servicios',
    cta: { label: 'Solicita tu cita', href: clinic.bookingUrl },
    phone: { label: `Llama o escribe al ${tel}`, href: clinic.phone.href },
  },

  hero: {
    pill: 'Las Vegas · Emergencias 24/7',
    lines: ['¿Emergencia o', 'cambio de sonrisa?'],
    emphasis: 'Aquí estamos.',
    support: 'Atención general, estética y de ortodoncia con el Dr. Christian Hahn. Llama a cualquier hora si es una emergencia dental, o reserva tu visita en línea.',
    primaryCta: { label: 'Reserva una consulta en el consultorio', href: clinic.bookingUrl },
    secondaryCta: { label: `Llama o escribe al ${tel}`, href: clinic.phone.href },
    more: { label: 'Mira cómo es tu visita', href: '#visit' },
  },

  visit: {
    heading: 'Tu visita, un paso claro a la vez',
    accent: 'claro',
    steps: [
      { title: 'Llamas o reservas', text: `Reserva en línea, o llama o escribe al ${tel}. Atendemos emergencias dentales cualquier día, a cualquier hora; por favor, llama antes de venir.` },
      { title: 'Te evaluamos', text: 'El Dr. Christian Hahn y el equipo revisan tus dientes y escuchan lo que necesitas.' },
      { title: 'Recibes un plan claro', text: 'Te explicamos tus opciones antes de cualquier tratamiento y revisamos contigo seguros, financiamiento y nuestros convenios.' },
      { title: 'Te atendemos', text: 'Atención general, estética y de ortodoncia en un solo consultorio, con el mismo equipo en cada visita.' },
    ],
  },

  services: {
    heading: 'Atención dental de todos los días, en la que puedes confiar',
    accent: 'confiar',
    groups: [
      {
        id: 'general', name: 'Odontología general',
        line: 'Revisiones, limpiezas, empastes y cuidado preventivo para mantener sana tu sonrisa en cada etapa de la vida.',
      },
      {
        id: 'cosmetic', name: 'Odontología estética',
        line: 'Carillas, coronas, bonding, implantes, All-on-4 y All-on-6, y blanqueamiento para mejorar cómo se ve y funciona tu sonrisa.',
      },
      {
        id: 'orthodontics', name: 'Ortodoncia',
        line: 'Invisalign y brackets para una sonrisa más recta y una mejor mordida, para adolescentes y adultos.',
      },
    ],
  },

  why: {
    heading: 'Por qué los pacientes eligen Luminous Dental',
    accent: 'Luminous Dental',
    points: [
      {
        title: 'Te ayudamos a conservar tus propios dientes',
        text: 'Nada puede reemplazar realmente la función de tus dientes naturales. Conservarlos el mayor tiempo posible es lo primero en cada plan.',
      },
      {
        title: 'Atención en la que te sientes cómodo',
        text: 'Nuestro equipo se dedica a ofrecer atención dental personalizada, cómoda y de alta calidad a cada paciente.',
      },
      {
        title: 'Un solo consultorio para tu atención dental',
        text: 'Atención general, estética y de ortodoncia en un mismo lugar, para que veas al mismo equipo en cada visita.',
      },
    ],
  },

  doctor: {
    heading: 'Conoce al Dr. Christian Hahn',
    text: 'Es dentista general con 4 años de experiencia. Realizó su formación dental en la Universidad de Nevada, Las Vegas. Se compromete a ofrecer atención de calidad y una experiencia cómoda a sus pacientes.',
    language: 'Idioma: inglés',
    photoAlt: 'El Dr. Christian Hahn, dentista general, con bata blanca',
  },

  coverage: {
    insurance: {
      heading: 'Seguros',
    },
    outOfTown: {
      heading: '¿Vienes de fuera de la ciudad?',
      accent: 'ciudad?',
      text: 'Nos asociamos con SAHARA Las Vegas para ofrecer beneficios exclusivos a nuestros pacientes.',
      cta: {
        label: 'Ver los beneficios de SAHARA Las Vegas',
        href: clinic.outOfTownUrl,
      },
    },
  },

  agreements: {
    heading: 'Convenios para nuestros pacientes',
    accent: 'pacientes',
    lead: 'Además de los seguros, nos asociamos con aliados que ayudan a nuestros pacientes.',
    partner: 'SAHARA Las Vegas',
    partnerTag: 'Si nos visitas de fuera de la ciudad',
    clinicAlt: 'Luminous Dental',
    more: { label: 'Ver todos los convenios', to: 'agreements' },
  },

  footer: {
    tagline: 'Tus dientes deben durar toda la vida.',
    contactHeading: 'Contacto',
    hoursHeading: 'Horario',
    address: '1212 S Maryland Pkwy, Las Vegas, NV 89104',
    phone: { label: `Llama o escribe al ${tel}`, href: clinic.phone.href },
    email: { label: 'info@luminousdentallv.com', href: 'mailto:info@luminousdentallv.com' },
    social: [
      { label: 'Instagram', href: 'https://www.instagram.com/luminousdentalvegas' },
      { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61554688456073' },
    ],
    servicesHeading: 'Servicios',
    services: ['porcelain-veneers-and-crowns', 'dental-implants', 'invisalign-and-braces', 'teeth-whitening'],
    benefitsHeading: 'Beneficios',
    benefits: [
      { label: 'Seguros', to: 'insurance' },
      { label: 'Financiamiento', to: 'financing' },
      { label: 'Convenios', to: 'agreements' },
    ],
    clinicHeading: 'Clínica',
    links: [
      { label: 'Nosotros', to: 'about' },
      { label: 'Preguntas frecuentes', to: 'faq' },
      { label: 'Blog', to: 'blog' },
      { label: 'Contacto', to: 'contact' },
    ],
    legalHeading: 'Legal',
    legalLinks: [
      { label: 'Términos y condiciones', to: 'terms' },
      { label: 'Aviso de privacidad', to: 'privacy' },
    ],
    emergencyLine: 'Emergencias 24/7',
    request: { label: 'Solicita tu cita', href: clinic.bookingUrl },
    legal: 'Luminous Dental, Las Vegas. Todos los derechos reservados.',
    note: 'Los resultados varían de una persona a otra.',
    motion: { pause: 'Pausar animaciones decorativas', play: 'Reproducir animaciones decorativas' },
  },
}

export const home: L10n<typeof en> = { en, es }

/*
 * FUENTES: qué frase salió de qué página oficial (luminousdentallv.com, revisado el 2026-11-17)
 *
 * Aprobado por el dueño (docs/decisiones.md, «Sí 1»): titular «Your teeth should last a lifetime»; un solo botón
 *   «Request an appointment»; «Call or text (702) 805-8688».
 * Home (/), pie y portada: «Your teeth should last a lifetime.» / «Nothing can truly replace the function of your
 *   natural teeth, so preserving them for as long as possible is our priority.» -> hero.support, why.points[0], footer.tagline.
 *   Bloque de contacto «Request an Appointment Today»; bloque SAHARA «Coming from out of town?» / «...partnered with SAHARA Las Vegas
 *   to offer exclusive benefits for our patients.» -> coverage.outOfTown.
 * Bloques de servicios de la home (/): «Comprehensive dental care for the whole family.» «From routine checkups and professional cleanings
 *   to fillings and preventive treatments, we help keep your smile healthy at every stage of life.» -> services.groups[0].
 *   «Achieve a straighter, healthier smile... improve your smile, bite, and confidence... for teens and adults (el texto oficial dice también children; la dueña lo quitó el 25-11).»
 *   -> services.groups[2] (el texto de ortodoncia es POR CONFIRMAR en el mapa; falta la página oficial).
 *   Blanqueamiento, carillas («natural-looking veneers»), resinas, coronas e implantes -> services.groups[1] y smile.text
 *   (también /porcelain-veneers-crowns/, /cosmetic-bonding/, /dental-implants/, /teeth-whitening/ como figuran en clinic.ts).
 * /about-us/: «Our team is dedicated to providing personalized, comfortable, and high-quality dental care for every patient.»
 *   -> why.points[1]. «Nothing can truly replace...» -> why.points[0].
 * /insurance-financing/: «Our providers are affiliated with most private dental insurance, including:» -> coverage.insurance.
 *   El consejo «confirm your coverage» sale de docs/mapa-de-paginas.md (no de la página oficial).
 * Bloque del equipo de la home (/) y clinic.ts doctor.bio: «Dr. Christian Hahn is a general dentist with 4 years of experience. He completed
 *   his dental training at the University of Nevada, Las Vegas... committed to delivering quality care and ensuring a comfortable
 *   experience for his patients.» «Language: English.» -> doctor.
 * Reseñas: ver content/reviews.ts. Pie de página: dirección, teléfono, correo, Instagram y Facebook de clinic.ts.
 *
 * Escrito por el equipo, NO está en el sitio oficial (necesita el visto bueno de la clínica):
 *   hero.support segunda frase, why.points[2] texto («same team»), smile.text («we will talk through the options...»), appointment y mensajes
 *   (el proceso de seguimiento es POR CONFIRMAR), services.groups[2].line («Invisalign and braces»).
 *
 * Omitido a propósito: «TOP-RATED», «over 40 years», «free consultation», ADIT, «Implants 15% off», «most advanced technology»,
 *   «Transform your smile», calificación de Google, precios, fotos, casos, la lista de nombres de seguros (la ortografía oficial tiene
 *   errores y «Principle» hay que revisarlo), el teléfono (725) 291-5588.
 */
