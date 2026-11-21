// Fuente: https://luminousdentallv.com (inicio, menú, pie de página y página de contacto), revisado el 2026-11-17.
// Solo datos reales del sitio oficial. Lo que falta es null y está marcado «POR CONFIRMAR» en docs/decisiones.md.
export const clinic = {
  name: 'Luminous Dental',
  tagline: 'Dentist in Las Vegas, NV – General & Cosmetic Dentistry',
  address: { street: '1212 S Maryland Pkwy', city: 'Las Vegas', state: 'NV' },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=1212+S+Maryland+Pkwy+Las+Vegas+NV',
  phone: { label: '(702) 805-8688', href: 'tel:+17028058688' },
  email: 'info@luminousdentallv.com',
  // Tres versiones que se contradicen (revisado el 2026-11-17), así que el horario NO se muestra hasta que la clínica lo confirme. POR CONFIRMAR.
  hours: {
    confirmed: false,
    officialTopBar: 'Tue–Sat 8am–5pm, Sun–Mon closed',
    officialContactPage: { mon: '8:00–19:00', tueFri: '8:00–18:00', sat: '8:00–13:00' },
    googleMaps: { mon: 'Closed', tue: '4–8 PM', wed: '24 h', thu: '24 h', fri: '24 h', sat: '24 h', sun: '24 h' },
    emergencies: 'Google Business post (Jul 17, 2026): dental emergencies 24/7, call before arriving.',
  },
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61554688456073',
    instagram: 'https://www.instagram.com/luminousdentalvegas',
  },
  whatsapp: null as string | null, // POR CONFIRMAR: número de WhatsApp de la clínica (solo dígitos con código de país)
  doctor: {
    name: 'Dr. Christian Hahn',
    role: 'General Dentist',
    bio: 'Dr. Christian Hahn is a general dentist with 4 years of experience. He completed his dental training at the University of Nevada, Las Vegas, specializing in general dentistry. He is committed to delivering quality care and ensuring a comfortable experience for his patients.',
    languages: ['English'],
  },
  outOfTown: {
    text: 'Coming from out of town? We’ve partnered with SAHARA Las Vegas to offer exclusive benefits for our patients.',
    url: 'https://stay.saharalasvegas.com/promo?hotel=SLSLV&accessCode=LUMI',
  },
} as const

export const services = [
  { group: 'General Dentistry', name: 'Routine Dental Care', source: 'https://luminousdentallv.com/routine-dental-care/' },
  { group: 'General Dentistry', name: 'Dentures & Bridges', source: 'https://luminousdentallv.com/dentures-bridges/' },
  { group: 'General Dentistry', name: 'Dental Cleaning', source: 'https://luminousdentallv.com/' },
  { group: 'General Dentistry', name: 'Wisdom Tooth Removal', source: 'https://luminousdentallv.com/' },
  { group: 'General Dentistry', name: 'Dental Appliances', source: 'https://luminousdentallv.com/' },
  { group: 'Cosmetic Dentistry', name: 'Porcelain Veneers & Crowns', source: 'https://luminousdentallv.com/porcelain-veneers-crowns/' },
  { group: 'Cosmetic Dentistry', name: 'Cosmetic Bonding', source: 'https://luminousdentallv.com/cosmetic-bonding/' },
  { group: 'Cosmetic Dentistry', name: 'Dental Implants', source: 'https://luminousdentallv.com/dental-implants/' },
  { group: 'Cosmetic Dentistry', name: 'Teeth Whitening', source: 'https://luminousdentallv.com/teeth-whitening/' },
  { group: 'Orthodontics', name: 'Invisalign & Braces', source: 'https://luminousdentallv.com/' },
  { group: 'Pediatric Dentistry', name: 'Pediatric Dentistry', source: 'https://luminousdentallv.com/' },
] as const

/** Dirección de una página de servicio («Dental Implants» -> «/services/dental-implants»). */
export const serviceHref = (name: string) =>
  '/services/' + name.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
