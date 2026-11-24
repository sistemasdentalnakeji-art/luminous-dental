// Textos de /privacy-policy y /terms-and-conditions (components/LegalDocument.tsx). Estructura copiada de Dental Nakeji (src/data/legal.ts), pero el
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
//  • Cancelación (24 h), depósitos, garantías, ley aplicable (Nevada) y foro (condado de Clark).
import { clinic } from '@/content/clinic'

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

export const legalText = {
  privacyLabel: 'Privacy policy',
  termsLabel: 'Terms and conditions',
  footerNav: 'Legal',
  consentLead: 'Read our',
  consentAnd: 'and',
}

export const privacy: LegalDoc = {
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
        'We collect what you choose to tell us in the appointment form, by phone or text, by email, or at the office:',
        { ul: [
          'Contact details: name, phone number, email address.',
          'Appointment details: the treatment you are interested in and the day and time you prefer.',
          'Anything you write in the message box. Please do not include detailed medical or payment information in the form.',
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
        'If you give us your mobile number and agree on the appointment form, we may call or text you about your request and your appointment. Agreeing is not required to receive care. See the “Text messages” section of our Terms and Conditions for how to stop messages.',
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

export const terms: LegalDoc = {
  eyebrow: name,
  title: 'Terms and Conditions',
  lead: 'These terms cover your use of our website and the appointment requests you send us. By using the site or sending a request, you agree to them.',
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
        'Sending the form is a request, not a confirmed appointment. Your visit is confirmed only when our team confirms it to you by phone, text message, or email. We may suggest another day or time depending on availability.',
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
        'If you give us your mobile number and check the consent box on the form, you agree that we may call or text you about your request, appointment reminders, and follow-up care. Messages may be sent with automated technology. Consent is not a condition of receiving care or of buying anything.',
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
