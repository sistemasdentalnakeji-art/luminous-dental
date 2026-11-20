// "Visit us" section (sign, contact and drawn map), structure copied from Dental Nakeji's ContactLocation. The map drawing is content/locationMap.ts (OpenStreetMap data).
// Hours are not shown (POR CONFIRMAR, docs/decisiones.md). Title and text are new (for approval).
import { clinic } from '@/content/clinic'

const a = clinic.address
export const locationText = {
  // NEW, for approval: the chip's arc texts and the button names.
  map: { open: 'Open map of our location', close: 'Close the map', hint: 'Tap to see the location', chipTop: 'LUMINOUS DENTAL', chipBottom: '1212 S MARYLAND PKWY' },
  title: 'Visit us',
  directions: 'Get directions',
  addressLabel: 'Address',
  phoneLabel: 'Phone',
  emailLabel: 'Email',
  followLabel: 'Follow us',
  // Words of the sign (a replica of the layout of the classic "Welcome to Fabulous Las Vegas" sign). NEW texts, for approval.
  sign: { top: 'Visit us', welcome: 'WELCOME', to: 'TO', fabulous: 'Fabulous', name: 'LUMINOUS DENTAL', place: 'LAS VEGAS, NEVADA' },
  address: `${a.street}, ${a.city}, ${a.state}`,
}
