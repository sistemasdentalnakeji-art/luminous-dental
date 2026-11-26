// Sección «Visit us» (letrero, contacto y mapa dibujado), estructura copiada del ContactLocation de Dental Nakeji. El dibujo del mapa está en content/locationMap.ts (datos de OpenStreetMap).
// El horario sale de content/clinic.ts (confirmado por la dueña el 25-11). El título y el texto son nuevos (para aprobación); el español es traducción nueva (26-11).
import { clinic } from '@/content/clinic'
import type { L10n } from '@/lib/lang'

const a = clinic.address
const address = `${a.street}, ${a.city}, ${a.state}`

const en = {
  // NUEVO, para aprobación: los textos en arco de la ficha y los nombres de los botones.
  map: { open: 'Open map of our location', close: 'Close the map', hint: 'Tap to see the location', chipTop: 'LUMINOUS DENTAL', chipBottom: '1212 S MARYLAND PKWY' },
  title: 'Visit us',
  directions: 'Get directions',
  addressLabel: 'Address',
  phoneLabel: 'Phone',
  emailLabel: 'Email',
  hoursLabel: 'Hours',
  mapsLabel: 'Open in Google Maps',
  followLabel: 'Follow us',
  // Palabras del letrero (réplica del diseño del clásico letrero «Welcome to Fabulous Las Vegas»). Textos NUEVOS, para aprobación.
  // `welcome` son las 7 letras de las monedas (una por moneda); `to` y `fabulous` van en azul; el nombre y el lugar son iguales en los dos idiomas.
  sign: { top: 'Visit us', welcome: 'WELCOME', to: 'TO', fabulous: 'Fabulous', name: 'LUMINOUS DENTAL', place: 'LAS VEGAS, NEVADA' },
  address,
}
const es: typeof en = {
  map: { open: 'Abrir el mapa de nuestra ubicación', close: 'Cerrar el mapa', hint: 'Toca para ver la ubicación', chipTop: 'LUMINOUS DENTAL', chipBottom: '1212 S MARYLAND PKWY' },
  title: 'Visítanos',
  directions: 'Cómo llegar',
  addressLabel: 'Dirección',
  phoneLabel: 'Teléfono',
  emailLabel: 'Correo electrónico',
  hoursLabel: 'Horario',
  mapsLabel: 'Abrir en Google Maps',
  followLabel: 'Síguenos',
  // El letrero imita el clásico «Welcome to Fabulous Las Vegas»: 7 monedas (una letra cada una), «TO» y «Fabulous». En español: «BIENVENIDO» (9 letras) no cabe en 7 monedas,
  // así que se conserva el letrero clásico tal cual (es un nombre propio: Welcome to Fabulous Las Vegas), igual que el nombre y el lugar.
  sign: { top: 'Visítanos', welcome: 'WELCOME', to: 'TO', fabulous: 'Fabulous', name: 'LUMINOUS DENTAL', place: 'LAS VEGAS, NEVADA' },
  address,
}
export const locationText: L10n<typeof en> = { en, es }
