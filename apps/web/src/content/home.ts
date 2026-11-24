// Texto de la página de inicio de Luminous Dental. Solo en inglés. Solo datos: sin componentes ni estilos.
// Regla: cada dato viene de https://luminousdentallv.com (revisado el 2026-11-17) o dice POR CONFIRMAR.
// No se muestra a propósito: horario, calificación de Google, precios, ofertas, «40 years», «top-rated», «free consultation».

import { clinic } from '@/content/clinic'

const tel = clinic.phone.label // el único lugar donde se escribe el número (content/clinic.ts)
const callPhone = { label: `Call or text ${tel}`, href: clinic.phone.href }

export const home = {
  seo: {
    title: 'Luminous Dental | General & Cosmetic Dentist in Las Vegas', // 57 caracteres
    description:
      "Luminous Dental in Las Vegas: general, cosmetic, orthodontic and children's dental care with Dr. Christian Hahn. Request an appointment today.", // 142 caracteres
  },

  // 1. Encabezado y menú
  header: {
    skipLink: 'Skip to main content',
    // Mismo orden que el menú de Dental Nakeji (mismo dueño). «Services» abre un panel con todos los servicios.
    nav: [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services', menu: true },
      { label: 'Insurance & Financing', href: '/insurance-financing' },
      { label: 'Contact', href: '/contact' },
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
    ],
    servicesOverview: 'View all services',
    cta: { label: 'Request an appointment', href: '#appointment' },
    phone: callPhone,
  },

  // 2. Portada (hero)
  hero: {
    // CAMBIO PEDIDO POR LA DUEÑA (20-11-2026): titular del archivo «Luminous Dental - Smile Makeover.html». Reemplaza al aprobado en «Sí 1»
    // («Your teeth should last a lifetime»); el dueño lo debe confirmar. Si no lo confirma, volver a ese titular.
    pill: 'Smile makeovers · Las Vegas',
    lines: ['A smile that', 'feels more'], // primeras líneas del titular
    emphasis: 'like you.', // última línea, en cursiva con el color de acento
    support: 'Explore the possibilities for color, shape and balance, with a smile plan built around you.',
    primaryCta: { label: 'Book an in-office consultation', href: '#appointment' },
    secondaryCta: callPhone,
    // POR CONFIRMAR: «Free virtual consultation» (no existe en docs/datos.md ni en clinic.ts) y el texto «start the conversation from home». No se muestran.
    more: { label: 'Explore our services', href: '#services' },
  },

  // 3. Servicios en 4 grupos
  services: {
    heading: 'Everyday dental care for the whole family',
    groups: [
      {
        name: 'General Dentistry',
        line: 'Checkups, cleanings, fillings and preventive care to keep your smile healthy at every stage of life.',
        href: '/services#general',
      },
      {
        name: 'Cosmetic Dentistry',
        line: 'Veneers, crowns, bonding, implants and whitening to improve how your smile looks and works.',
        href: '/services#cosmetic',
      },
      {
        name: 'Orthodontics',
        line: 'Invisalign and braces for a straighter smile and a better bite, for children, teens and adults.',
        href: '/services#orthodontics',
      },
      {
        name: 'Pediatric Dentistry',
        line: 'Gentle exams, cleanings and tips for kids, in a comfortable setting.',
        href: '/services#pediatric',
      },
    ],
    cta: { label: 'See all services', href: '/services' },
  },

  // 4. Por qué Luminous
  why: {
    heading: 'Why patients choose Luminous Dental',
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
        title: 'One office for the whole family',
        text: 'General, cosmetic, orthodontic and pediatric care in the same place, so everyone at home can see the same team.',
      },
      // Se omite hasta que la clínica lo confirme (docs/datos.md): «We work with most private dental insurance».
    ],
  },

  // 5. Doctor
  doctor: {
    heading: 'Meet Dr. Christian Hahn',
    role: 'General Dentist',
    // NUEVO, para aprobación: empieza con «He is» para no repetir el nombre bajo el título (solo en la página About).
    text: 'He is a general dentist with 4 years of experience. He completed his dental training at the University of Nevada, Las Vegas. He is committed to delivering quality care and a comfortable experience for his patients.',
    language: 'Language: English',
    photoAlt: 'Dr. Christian Hahn, general dentist, in a white coat',
  },

  // 6. Cambio de sonrisa (una sección, sin casos y sin promesas)
  smile: {
    heading: 'Thinking about changing your smile?',
    text: 'Veneers, crowns, bonding, whitening and implants can change the color, shape or fit of your teeth. Tell us what bothers you, and we will talk through the options that fit your teeth and your goals.',
    cta: { label: 'Request an appointment', href: '#appointment' },
    more: { label: 'See cosmetic dentistry', href: '/services#cosmetic' }, // NUEVO, para aprobación
    disclaimer: 'Individual results vary.',
  },

  // 7. Reseñas (sin calificación; POR CONFIRMAR el permiso para publicar cada una)
  reviews: {
    items: [
      {
        quote: 'Dr Christian, Joshua and Anna have done a great job and made us feel very happy and satisfied.',
        author: 'Ashok R.',
        confirmed: false,
      },
      {
        quote: 'Amazing dental office amazing staff.',
        author: 'Ana B.',
        confirmed: false,
      },
      {
        quote: 'The staff and the specialist is all professional and very friendly.',
        author: 'Sandra P.',
        confirmed: false,
      },
    ],
  },

  // 8. Seguros y pacientes de fuera de la ciudad
  coverage: {
    insurance: {
      heading: 'Insurance',
      // NUEVO, para aprobación. Reemplaza «We work with most private dental insurance» (la clínica no lo ha confirmado). No promete nada sobre planes ni financiamiento.
      text: 'Questions about insurance or payment? Ask our team.',
      cta: { label: 'See insurance and financing', href: '/insurance-financing' },
    },
    outOfTown: {
      heading: 'Coming from out of town?',
      text: "We've partnered with SAHARA Las Vegas to offer exclusive benefits for our patients.",
      cta: {
        label: 'See SAHARA Las Vegas benefits',
        href: 'https://stay.saharalasvegas.com/promo?hotel=SLSLV&accessCode=LUMI',
      },
    },
  },

  // 9. Solicitar una cita
  appointment: {
    id: 'appointment',
    heading: 'Request an appointment',
    submitLabel: 'Send my request',
    messageHint: 'No medical history or payment info, please.', // ayuda fija bajo el mensaje del formulario completo (guardado, hoy sin usar)
    consent: 'I agree that Luminous Dental may contact me about this request.',
    messages: {
      sending: 'Sending your request...',
      success: `Thank you. We received your request and will contact you to set a time. For anything urgent, call or text ${tel}.`,
      preview: 'This form is not connected yet, so your request was not sent.',
      error: `Something went wrong and your request was not sent. Please call or text ${tel}.`, // servidor caído o sin respuesta
      // NUEVO, para aprobación: un mensaje por tipo de falla.
      errorInvalid: `We could not accept some of the details. Please check the form, or call or text ${tel}.`,
      errorBusy: `Too many requests right now. Please wait a few minutes and try again, or call or text ${tel}.`,
      missingFields: 'Please complete the highlighted fields.',
    },
    // Mensajes por campo (escritos por el diseñador en B5, no vienen del sitio oficial).
    // Selector de fecha y hora: solo etiquetas (sección limpia pedida por la dueña, 21-11-2026).
    when: {
      legend: 'Preferred day',
      pickTime: 'Preferred time (we’ll confirm)', // aviso de preferencia mínimo, como etiqueta del grupo de horas
      // NUEVOS, por aprobar (23-11-2026): selector de hora como el de Dental Nakeji.
      chooseTime: 'Choose a time',
      chooseDayFirst: 'Choose a day first',
      morning: 'Morning',
      afternoon: 'Afternoon',
    },
    errors: {
      firstName: 'Enter your first name (letters only, at least 2).',
      lastName: 'Enter your last name (letters only, at least 2).',
      phone: `Enter your phone number, like ${tel}.`,
      phoneFormat: `Enter a 10-digit US phone number, like ${tel}.`,
      email: 'Enter a valid email, like name@example.com.',
      treatment: 'Choose a treatment.',
      message: 'Please remove web links from this field.',
      dateMissing: 'Choose a day for your visit.',
      dateInvalid: 'That day isn’t available. Please choose another.',
      timeMissing: 'Choose a time.',
      timeInvalid: 'That time isn’t available on this day. Please choose another.',
      consent: 'Check the box so we can contact you about this request.',
    },
    location: { heading: 'Visit us', address: '1212 S Maryland Pkwy, Las Vegas, NV 89104', mapLabel: 'Open in Google Maps' },
  },

  // 10. Pie de página
  footer: {
    tagline: 'Your teeth should last a lifetime.',
    contactHeading: 'Contact',
    address: '1212 S Maryland Pkwy, Las Vegas, NV 89104',
    phone: callPhone,
    email: { label: 'info@luminousdentallv.com', href: 'mailto:info@luminousdentallv.com' },
    social: [
      { label: 'Instagram', href: 'https://www.instagram.com/luminousdentalvegas' },
      { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61554688456073' },
    ],
    // Columnas como el pie de Dental Nakeji. Privacy Policy y Terms se suman cuando sus páginas tengan contenido real (docs/datos.md).
    servicesHeading: 'Services',
    services: ['Porcelain Veneers & Crowns', 'Dental Implants', 'Invisalign & Braces', 'Teeth Whitening'], // nombres de clinic.ts
    clinicHeading: 'Clinic',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Insurance & Financing', href: '/insurance-financing' },
      { label: 'Contact', href: '/contact' },
      { label: 'Blog', href: '/blog' },
      { label: 'Request an appointment', href: '#appointment' },
    ],
    legal: 'Luminous Dental, Las Vegas. All rights reserved.', // el componente agrega el año
    note: 'Individual results vary.',
    // NUEVO, para aprobación: detiene toda animación decorativa de la página (WCAG 2.2.2).
    motion: { pause: 'Pause decorative animations', play: 'Play decorative animations' },
  },
} as const

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
 *   «Achieve a straighter, healthier smile... improve your smile, bite, and confidence... for children, teens, and adults.»
 *   -> services.groups[2] (el texto de ortodoncia es POR CONFIRMAR en el mapa; falta la página oficial).
 *   «Gentle dental care designed for children... exams, cleanings, and education» -> services.groups[3].
 *   Blanqueamiento, carillas («natural-looking veneers»), resinas, coronas e implantes -> services.groups[1] y smile.text
 *   (también /porcelain-veneers-crowns/, /cosmetic-bonding/, /dental-implants/, /teeth-whitening/ como figuran en clinic.ts).
 * /about-us/: «Our team is dedicated to providing personalized, comfortable, and high-quality dental care for every patient.»
 *   -> why.points[1]. «Nothing can truly replace...» -> why.points[0].
 * /insurance-financing/: «Our providers are affiliated with most private dental insurance, including:» -> why.points[3],
 *   coverage.insurance. El consejo «confirm your coverage» sale de docs/mapa-de-paginas.md (no de la página oficial).
 * Bloque del equipo de la home (/) y clinic.ts doctor.bio: «Dr. Christian Hahn is a general dentist with 4 years of experience. He completed
 *   his dental training at the University of Nevada, Las Vegas... committed to delivering quality care and ensuring a comfortable
 *   experience for his patients.» «Language: English.» -> doctor.
 * Reseñas (Home, widget de reseñas de Google): Ana Bravo «Amazing dental office amazing staff.»; Sandra Paredes «The staff and the specialist
 *   is all professional and very friendly.» /about-us/: Ashok Redkar «Dr Christian, Joshua and Anna have done a great job and made us
 *   feel very happy and satisfied.» Citadas palabra por palabra (incluido «Dr» sin punto). Nombres acortados a nombre + inicial.
 *   Todas con permiso POR CONFIRMAR.
 * Pie de página: dirección, teléfono, correo, Instagram y Facebook de clinic.ts (home, menú, pie y /contact-us/).
 *
 * Escrito por el equipo, NO está en el sitio oficial (necesita el visto bueno de la clínica):
 *   hero.support segunda frase («Dr. Christian Hahn and our team care for the whole family in Las Vegas»),
 *   why.points[2] texto («same team»), smile.text («we will talk through the options...»), appointment.intro y mensajes
 *   («will follow up», «will contact you»; el proceso de seguimiento es POR CONFIRMAR), services.groups[2].line («Invisalign and braces»).
 *
 * Omitido a propósito: «TOP-RATED», «over 40 years», «free consultation», ADIT, «Implants 15% off», «most advanced technology»,
 *   «Transform your smile», calificación de Google, horario, precios, fotos, casos, la lista de nombres de seguros (la ortografía oficial tiene
 *   errores y «Principle» hay que revisarlo), el teléfono (725) 291-5588.
 */
