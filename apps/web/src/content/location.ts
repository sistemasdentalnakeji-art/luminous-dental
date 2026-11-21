// Sección «Visit us» (letrero, contacto y mapa dibujado), estructura copiada del ContactLocation de Dental Nakeji. El dibujo del mapa está en content/locationMap.ts (datos de OpenStreetMap).
// El horario no se muestra (POR CONFIRMAR, docs/decisiones.md). El título y el texto son nuevos (para aprobación).
import { clinic } from '@/content/clinic'

const a = clinic.address
export const locationText = {
  // NUEVO, para aprobación: los textos en arco de la ficha y los nombres de los botones.
  map: { open: 'Open map of our location', close: 'Close the map', hint: 'Tap to see the location', chipTop: 'LUMINOUS DENTAL', chipBottom: '1212 S MARYLAND PKWY' },
  title: 'Visit us',
  directions: 'Get directions',
  addressLabel: 'Address',
  phoneLabel: 'Phone',
  emailLabel: 'Email',
  followLabel: 'Follow us',
  // Palabras del letrero (réplica del diseño del clásico letrero «Welcome to Fabulous Las Vegas»). Textos NUEVOS, para aprobación.
  sign: { top: 'Visit us', welcome: 'WELCOME', to: 'TO', fabulous: 'Fabulous', name: 'LUMINOUS DENTAL', place: 'LAS VEGAS, NEVADA' },
  address: `${a.street}, ${a.city}, ${a.state}`,
}
