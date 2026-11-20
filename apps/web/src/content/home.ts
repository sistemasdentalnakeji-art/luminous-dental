// Home page text for Luminous Dental. English only. Data only: no components, no styles.
// Rule: every fact comes from https://luminousdentallv.com (checked 2026-11-17) or says POR CONFIRMAR.
// Not shown on purpose: opening hours, Google rating, prices, offers, "40 years", "top-rated", "free consultation".

import { clinic } from '@/content/clinic'

const tel = clinic.phone.label // the one place the number is written (content/clinic.ts)
const callPhone = { label: `Call or text ${tel}`, href: clinic.phone.href }

export const home = {
  seo: {
    title: 'Luminous Dental | General & Cosmetic Dentist in Las Vegas', // 57 characters
    description:
      "Luminous Dental in Las Vegas: general, cosmetic, orthodontic and children's dental care with Dr. Christian Hahn. Request an appointment today.", // 142 characters
  },

  // 1. Header and menu
  header: {
    skipLink: 'Skip to main content',
    // Same order as the Dental Nakeji menu (same owner). "Services" opens a panel with every service.
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

  // 2. Hero
  hero: {
    headline: 'Your teeth should last a lifetime',
    emphasis: 'last a lifetime', // the part of the headline shown in italic gold
    support:
      // NEW, for approval (docs/mejoras-1-plan.md 1.2): the doctor's name leaves the headline; the first sentence no longer repeats "We help you keep your own teeth".
      'Keeping your natural teeth for as long as possible is our priority. Our team cares for the whole family in Las Vegas.',
    primaryCta: { label: 'Request an appointment', href: '#appointment' },
    secondaryCta: callPhone,
    image: { src: null, alt: 'POR CONFIRMAR: real photo of the clinic or Dr. Hahn' },
  },

  // 3. Services in 4 groups
  services: {
    heading: 'Dental care for the whole family',
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

  // 4. Why Luminous
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
      // Left out until the clinic confirms it (docs/datos.md): "We work with most private dental insurance".
    ],
  },

  // 5. Doctor
  doctor: {
    heading: 'Meet Dr. Christian Hahn',
    role: 'General Dentist',
    name: 'Dr. Christian Hahn',
    // NEW, for approval: starts with "He is" so the name is not repeated under the title (About page only).
    text: 'He is a general dentist with 4 years of experience. He completed his dental training at the University of Nevada, Las Vegas. He is committed to delivering quality care and a comfortable experience for his patients.',
    language: 'Language: English',
    photo: { src: null, alt: 'POR CONFIRMAR: photo of Dr. Hahn (the official site has one; confirm permission and quality)' },
    // NEW, for approval: caption under the ring on the home page (the photo is the ring's center) and link to About.
    meet: { label: 'Meet the doctor', href: '/about' },
    photoAlt: 'Dr. Christian Hahn, general dentist, in a white coat',
  },

  // 6. Smile change (a section, no cases and no promises)
  smile: {
    heading: 'Thinking about changing your smile?',
    text: 'Veneers, crowns, bonding, whitening and implants can change the color, shape or fit of your teeth. Tell us what bothers you, and we will talk through the options that fit your teeth and your goals.',
    cta: { label: 'Request an appointment', href: '#appointment' },
    more: { label: 'See cosmetic dentistry', href: '/services#cosmetic' }, // NEW, for approval
    disclaimer: 'Individual results vary.',
    // POR CONFIRMAR: no before/after photos or patient stories until the clinic has written permission.
    gallery: null,
  },

  // 7. Reviews (no rating shown; POR CONFIRMAR permission to publish each one)
  reviews: {
    heading: 'What our patients say',
    note: 'POR CONFIRMAR permission: each quote is public on the official site; the clinic must approve using it here.',
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
    cta: { label: 'Read more patient reviews', href: '/patient-reviews' },
  },

  // 8. Insurance and patients from out of town
  coverage: {
    insurance: {
      heading: 'Insurance',
      // NEW, for approval. Replaces "We work with most private dental insurance" (not confirmed by the clinic). Promises nothing about plans or financing.
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

  // 9. Request an appointment
  appointment: {
    id: 'appointment',
    heading: 'Request an appointment',
    intro:
      `Tell us who you are and what you need. Sending this form does not reserve a time. Our team will follow up to set your visit. You can also call or text ${tel}.`,
    submitLabel: 'Send my request',
    consent: 'I agree that Luminous Dental may contact me about this request.',
    messages: {
      sending: 'Sending your request...',
      success: `Thank you. We received your request and will contact you to set a time. For anything urgent, call or text ${tel}.`,
      preview: `This form is not connected yet, so your request was not sent. Please call or text ${tel} to book.`,
      error: `Something went wrong and your request was not sent. Please call or text ${tel}.`, // server down or no answer
      // NEW, for approval: one message per kind of failure.
      errorInvalid: `We could not accept some of the details. Please check the form, or call or text ${tel}.`,
      errorBusy: `Too many requests right now. Please wait a few minutes and try again, or call or text ${tel}.`,
      missingFields: 'Please complete the highlighted fields.',
    },
    // Per-field messages (written by the designer in B5, not from the official site).
    errors: {
      firstName: 'Enter your first name.',
      lastName: 'Enter your last name.',
      phone: 'Enter a phone number.',
      phoneFormat: `Enter a phone number with at least 7 digits, like ${tel}.`, // NEW, for approval
      email: 'Enter a valid email, like name@example.com.',
      treatment: 'Choose a treatment.',
      consent: 'Check the box so we can contact you about this request.',
    },
    location: { heading: 'Visit us', address: '1212 S Maryland Pkwy, Las Vegas, NV 89104', mapLabel: 'Open in Google Maps' },
  },

  // 10. Footer
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
    // Columns like the Dental Nakeji footer. Privacy Policy and Terms join when their pages have real content (docs/datos.md).
    servicesHeading: 'Services',
    services: ['Porcelain Veneers & Crowns', 'Dental Implants', 'Invisalign & Braces', 'Teeth Whitening'], // names from clinic.ts
    clinicHeading: 'Clinic',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Insurance & Financing', href: '/insurance-financing' },
      { label: 'Contact', href: '/contact' },
      { label: 'Blog', href: '/blog' },
      { label: 'Request an appointment', href: '#appointment' },
    ],
    legal: 'Luminous Dental, Las Vegas. All rights reserved.', // the component adds the year
    note: 'Individual results vary.',
    // NEW, for approval: stops every decorative animation on the page (WCAG 2.2.2).
    motion: { pause: 'Pause decorative animations', play: 'Play decorative animations' },
  },
} as const

/*
 * SOURCES: which phrase came from which official page (luminousdentallv.com, checked 2026-11-17)
 *
 * Approved by the owner (docs/decisiones.md, "Sí 1"): headline "Your teeth should last a lifetime"; single button
 *   "Request an appointment"; "Call or text (702) 805-8688".
 * Home (/) footer and hero: "Your teeth should last a lifetime." / "Nothing can truly replace the function of your
 *   natural teeth, so preserving them for as long as possible is our priority." -> hero.support, why.points[0], footer.tagline.
 *   Contact block "Request an Appointment Today"; SAHARA block "Coming from out of town?" / "...partnered with SAHARA Las Vegas
 *   to offer exclusive benefits for our patients." -> coverage.outOfTown.
 * Home (/) services blocks: "Comprehensive dental care for the whole family." "From routine checkups and professional cleanings
 *   to fillings and preventive treatments, we help keep your smile healthy at every stage of life." -> services.groups[0].
 *   "Achieve a straighter, healthier smile... improve your smile, bite, and confidence... for children, teens, and adults."
 *   -> services.groups[2] (orthodontics text is POR CONFIRMAR in the mapa; the official page for it is missing).
 *   "Gentle dental care designed for children... exams, cleanings, and education" -> services.groups[3].
 *   Whitening, veneers ("natural-looking veneers"), bonding, crowns and implants -> services.groups[1] and smile.text
 *   (also /porcelain-veneers-crowns/, /cosmetic-bonding/, /dental-implants/, /teeth-whitening/ as listed in clinic.ts).
 * /about-us/: "Our team is dedicated to providing personalized, comfortable, and high-quality dental care for every patient."
 *   -> why.points[1]. "Nothing can truly replace..." -> why.points[0].
 * /insurance-financing/: "Our providers are affiliated with most private dental insurance, including:" -> why.points[3],
 *   coverage.insurance. The "confirm your coverage" advice comes from docs/mapa-de-paginas.md (not from the official page).
 * Home (/) team block and clinic.ts doctor.bio: "Dr. Christian Hahn is a general dentist with 4 years of experience. He completed
 *   his dental training at the University of Nevada, Las Vegas... committed to delivering quality care and ensuring a comfortable
 *   experience for his patients." "Language: English." -> doctor.
 * Reviews (Home, Google reviews widget): Ana Bravo "Amazing dental office amazing staff."; Sandra Paredes "The staff and the specialist
 *   is all professional and very friendly." /about-us/: Ashok Redkar "Dr Christian, Joshua and Anna have done a great job and made us
 *   feel very happy and satisfied." Quoted word for word (including "Dr" without the period). Names shortened to first name + initial.
 *   All POR CONFIRMAR permission.
 * Footer: address, phone, email, Instagram, Facebook from clinic.ts (home, menu, footer and /contact-us/).
 *
 * Written by the team, NOT on the official site (needs the clinic's OK):
 *   hero.support second sentence ("Dr. Christian Hahn and our team care for the whole family in Las Vegas"),
 *   why.points[2] text ("same team"), smile.text ("we will talk through the options..."), appointment.intro and messages
 *   ("will follow up", "will contact you"; the follow-up process is POR CONFIRMAR), services.groups[2].line ("Invisalign and braces").
 *
 * Left out on purpose: "TOP-RATED", "over 40 years", "free consultation", ADIT, "Implants 15% off", "most advanced technology",
 *   "Transform your smile", Google rating, hours, prices, photos, cases, the insurance name list (the official spelling has
 *   mistakes and "Principle" needs checking), the phone (725) 291-5588.
 */
