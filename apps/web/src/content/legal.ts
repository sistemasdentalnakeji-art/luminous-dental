// Textos de /<lang>/privacy-policy y /<lang>/terms-and-conditions (en español: /es/aviso-de-privacidad y /es/terminos-y-condiciones). Dos idiomas: privacy.en / privacy.es, terms.en / terms.es. El español (26-11) es traducción nueva y también lleva revisión legal.
// Textos de (components/LegalDocument.tsx). Estructura copiada de Dental Nakeji (src/data/legal.ts), pero el
// contenido es para Las Vegas, Nevada (EE. UU.), no para México: aquí NO aplican la LFPDPPP, los derechos ARCO, Profeco ni los tribunales de Tijuana.
// Datos reales: solo los de content/clinic.ts (nombre, dirección, teléfono, correo). Todo lo demás es texto general de EE. UU.
// (prácticas de privacidad tipo HIPAA, consentimiento de mensajes tipo TCPA, términos de uso del sitio).
//
// POR CONFIRMAR (revisión legal) antes de publicar. Ver docs/datos.md, sección «Páginas legales»:
//  • `updated` (fecha de vigencia) está vacío a propósito: la página no muestra fecha hasta que la clínica y el abogado la den.
//  • Responsable de privacidad (nombre/cargo) y correo exclusivo de privacidad: hoy se usa el correo general de clinic.ts.
//  • Aviso de Prácticas de Privacidad (HIPAA) formal: este texto es un resumen, no sustituye al aviso que exige 45 CFR 164.520.
//  • Mensajes de texto (TCPA/CTIA): frecuencia, palabras STOP/HELP, no vender números; qué proveedor envía los mensajes.
//  • Plazos de conservación del expediente (Nevada), proveedores reales (alojamiento, formulario, correo), cookies/analítica.
//  • 25-11: se quitaron las menciones al formulario propio (la cita se agenda en Adit). Revisar con el abogado cómo describir Adit y su consentimiento de mensajes.
//  • Cancelación (24 h), depósitos, garantías, ley aplicable (Nevada) y foro (condado de Clark).
import { clinic } from '@/content/clinic'
import type { L10n } from '@/lib/lang'

export type LegalBlock = string | { h: string } | { ul: string[] }
export interface LegalSection { id: string; title: string; blocks: LegalBlock[] }
export interface LegalDoc {
  eyebrow: string
  title: string
  lead: string
  /** Fecha de vigencia. Vacía = POR CONFIRMAR (revisión legal); la página no muestra fecha. */
  updated: string
  tocLabel: string
  sections: LegalSection[]
}

const { name, phone, email } = clinic
const address = `${clinic.address.street}, ${clinic.address.city}, ${clinic.address.state}`
const contact = `${email} or ${phone.label}`
const contactEs = `${email} o ${phone.label}`

const legalEn = {
  privacyLabel: 'Privacy policy',
  termsLabel: 'Terms and conditions',
  footerNav: 'Legal',
  consentLead: 'Read our',
  consentAnd: 'and',
}
export const legalText: L10n<typeof legalEn> = {
  en: legalEn,
  es: { privacyLabel: 'Aviso de privacidad', termsLabel: 'Términos y condiciones', footerNav: 'Legal', consentLead: 'Lee nuestro', consentAnd: 'y nuestros' },
}

const privacyEn: LegalDoc = {
  eyebrow: name,
  title: 'Privacy Policy',
  lead: 'This policy explains what personal information we collect, why we use it, who we share it with, and the choices you have.',
  updated: '',
  tocLabel: 'In this policy',
  sections: [
    {
      id: 'who',
      title: 'Who we are',
      blocks: [
        `${name} (“we,” “us”) is a dental practice at ${address}. This policy covers this website and the information you give us when you request an appointment, call, text, or visit.`,
        { h: 'How to reach us about privacy' },
        { ul: [`Email: ${email}`, `Phone: ${phone.label}`, `Address: ${address}`] },
      ],
    },
    {
      id: 'collect',
      title: 'What we collect',
      blocks: [
        'We collect what you choose to tell us when you book your appointment online, by phone or text, by email, or at the office:',
        { ul: [
          'Contact details: name, phone number, email address.',
          'Appointment details: the treatment you are interested in and the day and time you prefer.',
          'Health and insurance information you give us at the office or by phone, such as dental history, medications, and your insurance plan details.',
          'Basic technical data your browser sends when you visit this site (for example, device type and pages viewed).',
        ] },
      ],
    },
    {
      id: 'use',
      title: 'How we use it',
      blocks: [
        { ul: [
          'To answer your request and schedule, confirm, or change your visit.',
          'To provide dental care, keep your records, and handle billing and insurance.',
          'To contact you about your appointment or treatment, by phone, text message, or email.',
          'To run, secure, and improve this website.',
          'To meet legal and professional obligations.',
        ] },
        'We do not sell your personal information.',
      ],
    },
    {
      id: 'health',
      title: 'Health information (HIPAA)',
      blocks: [
        'Information about your care at our office is protected health information. We use and share it as the Health Insurance Portability and Accountability Act (HIPAA) allows: for treatment, for payment and insurance, and for the day-to-day operation of the practice. Other uses need your written authorization.',
        'You may ask for a copy of your records, ask us to correct them, ask for confidential communications, and ask for a list of certain disclosures. To make a request, contact us using the details above. We will give you our Notice of Privacy Practices at your first visit.',
        'If you believe your privacy rights were violated, you may tell us or file a complaint with the U.S. Department of Health and Human Services Office for Civil Rights. We will not retaliate against you for filing a complaint.',
      ],
    },
    {
      id: 'share',
      title: 'Who we share it with',
      blocks: [
        { ul: [
          'Service providers that help us run the practice and this website, such as website hosting, scheduling, phone and text messaging, and email. They may use the information only to provide their service to us.',
          'Your dental insurance company or plan, to verify coverage and bill for your care.',
          'Specialists, dental laboratories, and other health professionals involved in your treatment.',
          'Government agencies or others when the law requires it or to protect safety.',
        ] },
        'We do not share your mobile phone number or text-message consent with third parties for their own marketing.',
      ],
    },
    {
      id: 'texts',
      title: 'Text messages',
      blocks: [
        'If you give us your mobile number and agree to it when you book, we may call or text you about your request and your appointment. Agreeing is not required to receive care. See the “Text messages” section of our Terms and Conditions for how to stop messages.',
      ],
    },
    {
      id: 'cookies',
      title: 'Cookies and third-party content',
      blocks: [
        'This site may use basic technical tools to work properly and to measure visits in aggregate. Some pages link to or show content from third parties, such as maps, Facebook, and Instagram, which have their own privacy policies. You can block or delete cookies in your browser settings.',
      ],
    },
    {
      id: 'security',
      title: 'How we protect it',
      blocks: [
        'We use administrative, technical, and physical safeguards to protect your information. No website or message is completely secure. Please do not send your Social Security number, payment card numbers, or detailed medical information by email, text, or the website form. If you send it by mistake, tell us and we will delete it.',
      ],
    },
    {
      id: 'keep',
      title: 'How long we keep it',
      blocks: [
        'We keep your information as long as needed to care for you, meet legal and professional record-keeping requirements, resolve disputes, and run the practice. When we no longer need it, we delete or de-identify it securely.',
      ],
    },
    {
      id: 'children',
      title: 'Children',
      blocks: [
        'This site is meant for adults. A parent or legal guardian should make appointments and give information for a child. We do not knowingly collect information from children through this site without a parent or guardian.',
      ],
    },
    {
      id: 'changes',
      title: 'Changes to this policy',
      blocks: ['We may update this policy. The current version is always on this page.'],
    },
    {
      id: 'contact',
      title: 'Questions',
      blocks: [`For any privacy question or request, contact us at ${contact}.`],
    },
  ],
}

const termsEn: LegalDoc = {
  eyebrow: name,
  title: 'Terms and Conditions',
  lead: 'These terms cover your use of our website and the appointment requests you make through it. By using the site or asking for an appointment, you agree to them.',
  updated: '',
  tocLabel: 'In these terms',
  sections: [
    {
      id: 'who',
      title: 'Who we are',
      blocks: [
        `This website belongs to ${name}, a dental practice at ${address}. If you do not agree with these terms, please do not use the site.`,
      ],
    },
    {
      id: 'info',
      title: 'Information on the site',
      blocks: [
        'The content of this site is for general information. It is not a diagnosis or dental advice, and it does not replace an exam by a dentist. Do not use it to decide on a treatment without an evaluation.',
        `In a dental emergency, call us at ${phone.label}. If it is a life-threatening emergency, call 911 or go to the nearest emergency room.`,
      ],
    },
    {
      id: 'requests',
      title: 'Appointment requests',
      blocks: [
        'Booking online or by phone is a request until our team confirms it. Your visit is confirmed only when our team confirms it to you by phone, text message, or email. We may suggest another day or time depending on availability.',
      ],
    },
    {
      id: 'cancel',
      title: 'Changes and cancellations',
      blocks: [
        'If you cannot attend, please let us know as early as you can so we can offer the time to another patient. Any deposit or cancellation fee will be explained to you in writing before treatment.',
      ],
    },
    {
      id: 'pricing',
      title: 'Prices and payments',
      blocks: [
        'Prices and offers on the site are for reference and may change. The cost of your treatment is given in a written estimate after your evaluation. Payment terms are agreed with you before treatment begins.',
      ],
    },
    {
      id: 'insurance',
      title: 'Dental insurance',
      blocks: [
        'The insurance companies shown on this site are for reference. Showing a logo does not guarantee that your specific plan is accepted or what it will cover. Any coverage estimate we give you is based on what your insurer tells us, and your insurer makes the final decision on payment. You are responsible for any amount your plan does not cover.',
      ],
    },
    {
      id: 'results',
      title: 'Results',
      blocks: [
        'Every case is different and individual results vary. Photos and descriptions on the site are examples, not a promise of a specific outcome.',
      ],
    },
    {
      id: 'texts',
      title: 'Text messages',
      blocks: [
        'If you give us your mobile number and agree to it when you book, you agree that we may call or text you about your request, appointment reminders, and follow-up care. Messages may be sent with automated technology. Consent is not a condition of receiving care or of buying anything.',
        { ul: [
          'Message frequency varies.',
          'Message and data rates may apply.',
          'Reply STOP at any time to stop receiving texts. Reply HELP for help, or call us.',
          'Text messages are not secure and are not for emergencies. Please do not send your Social Security number, payment card numbers, or detailed medical information by text.',
        ] },
        `We do not share your mobile number or this consent with third parties for their own marketing. See our Privacy Policy for more. Questions: ${contact}.`,
      ],
    },
    {
      id: 'use',
      title: 'Use of the site and links',
      blocks: [
        'We work to keep the site available and accurate, but it may be interrupted or contain errors. Links to other sites, such as social networks and maps, are governed by their own terms and policies. Please do not misuse the site, try to break its security, or send false information.',
      ],
    },
    {
      id: 'ip',
      title: 'Content ownership',
      blocks: [
        'The text, images, logos, and design of the site belong to the practice or are used with permission. They may not be copied or used without written permission.',
      ],
    },
    {
      id: 'liability',
      title: 'Limits of liability',
      blocks: [
        'The site is provided “as is.” To the fullest extent the law allows, we are not responsible for losses that come from using the site or relying on its content. Nothing here limits any right you have under the law or the standard of care owed to you as a patient.',
      ],
    },
    {
      id: 'law',
      title: 'Governing law',
      blocks: ['These terms are governed by the laws of the State of Nevada and applicable federal law.'],
    },
    {
      id: 'changes',
      title: 'Changes to these terms',
      blocks: ['We may update these terms. The current version is always on this page.'],
    },
    {
      id: 'contact',
      title: 'Contact',
      blocks: [`For questions about these terms, contact us at ${contact}.`],
    },
  ],
}

const privacyEs: LegalDoc = {
  eyebrow: name,
  title: 'Aviso de privacidad',
  lead: 'Este aviso explica qué información personal recabamos, para qué la usamos, con quién la compartimos y qué opciones tienes.',
  updated: '',
  tocLabel: 'En este aviso',
  sections: [
    {
      id: 'who',
      title: 'Quiénes somos',
      blocks: [
        `${name} («nosotros») es un consultorio dental ubicado en ${address}. Este aviso cubre este sitio web y la información que nos das cuando solicitas una cita, llamas, nos envías un mensaje o nos visitas.`,
        { h: 'Cómo contactarnos sobre privacidad' },
        { ul: [`Correo: ${email}`, `Teléfono: ${phone.label}`, `Dirección: ${address}`] },
      ],
    },
    {
      id: 'collect',
      title: 'Qué información recabamos',
      blocks: [
        'Recabamos lo que decides compartir con nosotros cuando reservas tu cita en línea, por teléfono o mensaje de texto, por correo o en el consultorio:',
        { ul: [
          'Datos de contacto: nombre, número de teléfono y correo electrónico.',
          'Datos de la cita: el tratamiento que te interesa y el día y la hora que prefieres.',
          'Información de salud y de seguro que nos das en el consultorio o por teléfono, como tu historial dental, medicamentos y los datos de tu plan de seguro.',
          'Datos técnicos básicos que envía tu navegador cuando visitas este sitio (por ejemplo, el tipo de dispositivo y las páginas vistas).',
        ] },
      ],
    },
    {
      id: 'use',
      title: 'Cómo la usamos',
      blocks: [
        { ul: [
          'Para responder tu solicitud y programar, confirmar o cambiar tu visita.',
          'Para brindarte atención dental, llevar tu expediente y encargarnos de la facturación y los seguros.',
          'Para comunicarnos contigo sobre tu cita o tu tratamiento, por teléfono, mensaje de texto o correo.',
          'Para operar, proteger y mejorar este sitio web.',
          'Para cumplir con obligaciones legales y profesionales.',
        ] },
        'No vendemos tu información personal.',
      ],
    },
    {
      id: 'health',
      title: 'Información de salud (HIPAA)',
      blocks: [
        'La información sobre tu atención en nuestro consultorio es información de salud protegida. La usamos y la compartimos como lo permite la Ley de Portabilidad y Responsabilidad del Seguro Médico (HIPAA): para tu tratamiento, para el pago y los seguros, y para la operación diaria del consultorio. Cualquier otro uso requiere tu autorización por escrito.',
        'Puedes pedir una copia de tu expediente, pedirnos que lo corrijamos, solicitar comunicaciones confidenciales y pedir una lista de ciertas divulgaciones. Para hacer una solicitud, contáctanos con los datos de arriba. Te entregaremos nuestro Aviso de Prácticas de Privacidad en tu primera visita.',
        'Si crees que se violaron tus derechos de privacidad, puedes decírnoslo o presentar una queja ante la Oficina de Derechos Civiles del Departamento de Salud y Servicios Humanos de EE. UU. No tomaremos represalias contra ti por presentar una queja.',
      ],
    },
    {
      id: 'share',
      title: 'Con quién la compartimos',
      blocks: [
        { ul: [
          'Proveedores de servicios que nos ayudan a operar el consultorio y este sitio, como alojamiento web, agenda de citas, llamadas y mensajes de texto, y correo electrónico. Solo pueden usar la información para prestarnos su servicio.',
          'Tu aseguradora o plan de seguro dental, para verificar tu cobertura y cobrar tu atención.',
          'Especialistas, laboratorios dentales y otros profesionales de la salud que participen en tu tratamiento.',
          'Autoridades u otras personas cuando la ley lo exija o para proteger la seguridad.',
        ] },
        'No compartimos tu número de celular ni tu consentimiento para mensajes de texto con terceros para su propia publicidad.',
      ],
    },
    {
      id: 'texts',
      title: 'Mensajes de texto',
      blocks: [
        'Si nos das tu número de celular y aceptas al reservar, podemos llamarte o enviarte mensajes de texto sobre tu solicitud y tu cita. Aceptar no es obligatorio para recibir atención. Consulta la sección «Mensajes de texto» de nuestros Términos y condiciones para saber cómo dejar de recibir mensajes.',
      ],
    },
    {
      id: 'cookies',
      title: 'Cookies y contenido de terceros',
      blocks: [
        'Este sitio puede usar herramientas técnicas básicas para funcionar correctamente y para medir las visitas de forma agregada. Algunas páginas enlazan o muestran contenido de terceros, como mapas, Facebook e Instagram, que tienen sus propias políticas de privacidad. Puedes bloquear o eliminar las cookies en la configuración de tu navegador.',
      ],
    },
    {
      id: 'security',
      title: 'Cómo la protegemos',
      blocks: [
        'Usamos medidas de seguridad administrativas, técnicas y físicas para proteger tu información. Ningún sitio web ni mensaje es completamente seguro. Por favor, no envíes tu número de Seguro Social, números de tarjetas de pago ni información médica detallada por correo, mensaje de texto o el formulario del sitio. Si la envías por error, avísanos y la eliminaremos.',
      ],
    },
    {
      id: 'keep',
      title: 'Cuánto tiempo la conservamos',
      blocks: [
        'Conservamos tu información el tiempo necesario para atenderte, cumplir con los requisitos legales y profesionales de conservación de expedientes, resolver disputas y operar el consultorio. Cuando ya no la necesitamos, la eliminamos o la desidentificamos de forma segura.',
      ],
    },
    {
      id: 'children',
      title: 'Menores de edad',
      blocks: [
        'Este sitio está dirigido a adultos. Un padre, madre o tutor legal debe programar las citas y dar la información de un menor. No recabamos a sabiendas información de menores a través de este sitio sin un padre, madre o tutor.',
      ],
    },
    {
      id: 'changes',
      title: 'Cambios a este aviso',
      blocks: ['Podemos actualizar este aviso. La versión vigente siempre está en esta página.'],
    },
    {
      id: 'contact',
      title: 'Preguntas',
      blocks: [`Para cualquier pregunta o solicitud sobre privacidad, contáctanos en ${contactEs}.`],
    },
  ],
}

const termsEs: LegalDoc = {
  eyebrow: name,
  title: 'Términos y condiciones',
  lead: 'Estos términos cubren el uso de nuestro sitio web y las solicitudes de cita que haces a través de él. Al usar el sitio o pedir una cita, aceptas estos términos.',
  updated: '',
  tocLabel: 'En estos términos',
  sections: [
    {
      id: 'who',
      title: 'Quiénes somos',
      blocks: [
        `Este sitio web pertenece a ${name}, un consultorio dental ubicado en ${address}. Si no estás de acuerdo con estos términos, por favor no uses el sitio.`,
      ],
    },
    {
      id: 'info',
      title: 'Información del sitio',
      blocks: [
        'El contenido de este sitio es informativo y general. No es un diagnóstico ni un consejo dental, y no sustituye la revisión de un dentista. No lo uses para decidir un tratamiento sin una evaluación.',
        `En una emergencia dental, llámanos al ${phone.label}. Si es una emergencia que pone en riesgo la vida, llama al 911 o acude a la sala de emergencias más cercana.`,
      ],
    },
    {
      id: 'requests',
      title: 'Solicitudes de cita',
      blocks: [
        'Reservar en línea o por teléfono es una solicitud hasta que nuestro equipo la confirme. Tu visita queda confirmada solo cuando nuestro equipo te la confirma por teléfono, mensaje de texto o correo. Podemos sugerirte otro día u hora según la disponibilidad.',
      ],
    },
    {
      id: 'cancel',
      title: 'Cambios y cancelaciones',
      blocks: [
        'Si no puedes asistir, avísanos con la mayor anticipación posible para ofrecer el horario a otro paciente. Cualquier depósito o cargo por cancelación se te explicará por escrito antes del tratamiento.',
      ],
    },
    {
      id: 'pricing',
      title: 'Precios y pagos',
      blocks: [
        'Los precios y las ofertas del sitio son de referencia y pueden cambiar. El costo de tu tratamiento se te da en un presupuesto por escrito después de tu evaluación. Las condiciones de pago se acuerdan contigo antes de comenzar el tratamiento.',
      ],
    },
    {
      id: 'insurance',
      title: 'Seguros dentales',
      blocks: [
        'Las aseguradoras que aparecen en este sitio son de referencia. Mostrar un logotipo no garantiza que se acepte tu plan en particular ni lo que cubrirá. Cualquier estimado de cobertura que te demos se basa en lo que tu aseguradora nos informa, y la aseguradora toma la decisión final sobre el pago. Tú eres responsable de cualquier monto que tu plan no cubra.',
      ],
    },
    {
      id: 'results',
      title: 'Resultados',
      blocks: [
        'Cada caso es distinto y los resultados varían de una persona a otra. Las fotos y las descripciones del sitio son ejemplos, no una promesa de un resultado específico.',
      ],
    },
    {
      id: 'texts',
      title: 'Mensajes de texto',
      blocks: [
        'Si nos das tu número de celular y aceptas al reservar, aceptas que podamos llamarte o enviarte mensajes de texto sobre tu solicitud, recordatorios de citas y cuidados posteriores. Los mensajes pueden enviarse con tecnología automatizada. El consentimiento no es una condición para recibir atención ni para comprar nada.',
        { ul: [
          'La frecuencia de los mensajes varía.',
          'Pueden aplicar tarifas de mensajes y de datos.',
          'Responde STOP en cualquier momento para dejar de recibir mensajes. Responde HELP para recibir ayuda, o llámanos.',
          'Los mensajes de texto no son seguros y no son para emergencias. Por favor, no envíes por mensaje tu número de Seguro Social, números de tarjetas de pago ni información médica detallada.',
        ] },
        `No compartimos tu número de celular ni este consentimiento con terceros para su propia publicidad. Consulta nuestro Aviso de privacidad para más información. Preguntas: ${contactEs}.`,
      ],
    },
    {
      id: 'use',
      title: 'Uso del sitio y enlaces',
      blocks: [
        'Nos esforzamos por mantener el sitio disponible y correcto, pero puede interrumpirse o tener errores. Los enlaces a otros sitios, como redes sociales y mapas, se rigen por sus propios términos y políticas. Por favor, no hagas un mal uso del sitio, no intentes vulnerar su seguridad ni envíes información falsa.',
      ],
    },
    {
      id: 'ip',
      title: 'Propiedad del contenido',
      blocks: [
        'Los textos, las imágenes, los logotipos y el diseño del sitio pertenecen al consultorio o se usan con permiso. No pueden copiarse ni usarse sin autorización por escrito.',
      ],
    },
    {
      id: 'liability',
      title: 'Límites de responsabilidad',
      blocks: [
        'El sitio se ofrece «tal cual». En la mayor medida que permita la ley, no somos responsables de las pérdidas que resulten de usar el sitio o de confiar en su contenido. Nada de lo aquí dicho limita los derechos que tienes conforme a la ley ni el estándar de atención que se te debe como paciente.',
      ],
    },
    {
      id: 'law',
      title: 'Ley aplicable',
      blocks: ['Estos términos se rigen por las leyes del Estado de Nevada y la legislación federal aplicable.'],
    },
    {
      id: 'changes',
      title: 'Cambios a estos términos',
      blocks: ['Podemos actualizar estos términos. La versión vigente siempre está en esta página.'],
    },
    {
      id: 'contact',
      title: 'Contacto',
      blocks: [`Para preguntas sobre estos términos, contáctanos en ${contactEs}.`],
    },
  ],
}

export const privacy: L10n<LegalDoc> = { en: privacyEn, es: privacyEs }
export const terms: L10n<LegalDoc> = { en: termsEn, es: termsEs }
