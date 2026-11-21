import type { AppointmentRequest } from '@luminous/types'
import { services } from '@/content/clinic'
import { home } from '@/content/home'

/**
 * A dónde envía las solicitudes el formulario de citas.
 * 'preview': no se envía nada (aún no hay herramienta de formularios). Cambia a 'api' con un endpoint real cuando exista apps/api.
 */
export const booking = {
  mode: 'preview' as 'preview' | 'api',
  apiEndpoint: null as string | null, // POR CONFIRMAR cuando se construya el backend
}

/** Por qué falló un envío: el servidor rechazó los datos (400/422), hubo demasiados envíos (429) o está caído, lento o inalcanzable. */
export class BookingError extends Error {
  kind: 'invalid' | 'busy' | 'down'
  constructor(kind: 'invalid' | 'busy' | 'down') {
    super(kind)
    this.kind = kind
  }
}

// --- Reglas de los campos (las usan el formulario y el armado del envío; el navegador nunca es la única defensa) ---

/** Texto más largo aceptado por campo. */
export const MAX = { firstName: 60, lastName: 60, phone: 14, email: 254, preferredTime: 100, message: 1000 }
/** Caracteres de nombre permitidos al teclear o pegar: letras (con acentos), espacio, guion y apóstrofo. */
export const NAME_JUNK = /[^\p{L}\p{M} '’-]/gu
/** Nombre completo válido: empieza y termina en letra; cada separador va seguido de letra (O'Brien, Mary-Jane, Ana María). */
const NAME_OK = /^\p{L}[\p{L}\p{M}]*(?:[ '’-]\p{L}[\p{L}\p{M}]*)*$/u
const EMAIL_OK = /^[^\s@]{1,64}@[^\s@.]+(?:\.[^\s@.]+)*\.[^\s@.]{2,}$/
const LINK = /https?:\/\/|www\./i
// eslint-disable-next-line no-control-regex
const CONTROL = /[\u0000-\u0008\u000b-\u001f\u007f]/g

/** Deja solo los 10 dígitos de un teléfono de EE. UU. (quita un 1 inicial: ningún código de área empieza con 1). */
export const phoneDigits = (v: string) => v.replace(/\D/g, '').replace(/^1/, '').slice(0, 10)
/** (702) 555-0123, mientras se escribe también a medias. */
export function formatPhone(v: string) {
  const d = phoneDigits(v)
  if (d.length <= 3) return d
  return d.length <= 6 ? `(${d.slice(0, 3)}) ${d.slice(3)}` : `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
}

type Field = 'firstName' | 'lastName' | 'phone' | 'email' | 'treatment' | 'message' | 'preferredTime' | 'consent'
export type AppointmentErrors = Partial<Record<Field, string>>

const msg = home.appointment.errors
const tidy = (v: unknown, max: number) => String(v ?? '').replace(CONTROL, '').replace(/\s+/g, ' ').trim().slice(0, max)

/** Limpia (recorta espacios, quita caracteres raros, pone el teléfono en formato) y revisa. Devuelve la solicitud limpia y un mensaje por campo malo. */
export function checkAppointment(raw: AppointmentRequest): { clean: AppointmentRequest; errors: AppointmentErrors } {
  const message = String(raw.message ?? '').replace(CONTROL, '').trim().slice(0, MAX.message) // el mensaje conserva sus saltos de línea
  const clean: AppointmentRequest = {
    firstName: tidy(raw.firstName, MAX.firstName),
    lastName: tidy(raw.lastName, MAX.lastName),
    email: tidy(raw.email, MAX.email).toLowerCase(),
    phone: formatPhone(String(raw.phone ?? '')),
    treatment: tidy(raw.treatment, 100),
    message,
    preferredTime: tidy(raw.preferredTime, MAX.preferredTime) || undefined,
    consent: raw.consent === true,
    source: 'website',
  }
  const errors: AppointmentErrors = {}
  if (clean.firstName.length < 2 || !NAME_OK.test(clean.firstName)) errors.firstName = msg.firstName
  if (clean.lastName.length < 2 || !NAME_OK.test(clean.lastName)) errors.lastName = msg.lastName
  // Número de EE. UU.: 10 dígitos; ni el código de área ni la central empiezan con 0 o 1.
  if (!/^\([2-9]\d{2}\) [2-9]\d{2}-\d{4}$/.test(clean.phone)) errors.phone = phoneDigits(clean.phone) ? msg.phoneFormat : msg.phone
  if (!EMAIL_OK.test(clean.email)) errors.email = msg.email
  if (!clean.treatment || (clean.treatment !== 'Not sure yet' && !services.some((s) => s.name === clean.treatment))) errors.treatment = msg.treatment
  if (LINK.test(clean.message)) errors.message = msg.message
  if (clean.preferredTime && LINK.test(clean.preferredTime)) errors.preferredTime = msg.message
  if (!clean.consent) errors.consent = msg.consent
  return { clean, errors }
}

const TIMEOUT_MS = 10_000
const isHttps = (url: string) => {
  try {
    return new URL(url).protocol === 'https:'
  } catch {
    return false
  }
}

export async function sendAppointment(input: AppointmentRequest): Promise<'sent' | 'preview'> {
  // Se revisa aquí otra vez: quien llame a esta función sin pasar por el formulario no se salta las reglas.
  const { clean: request, errors } = checkAppointment(input)
  if (Object.keys(errors).length) throw new BookingError('invalid')
  // Solo una dirección https cuenta como conectada: los datos de pacientes nunca viajan por http simple.
  if (booking.mode !== 'api' || !booking.apiEndpoint || !isHttps(booking.apiEndpoint)) return 'preview'
  let res: Response
  try {
    res = await fetch(booking.apiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
  } catch {
    throw new BookingError('down') // sin conexión o sin respuesta a tiempo
  }
  if (res.status === 400 || res.status === 422) throw new BookingError('invalid')
  if (res.status === 429) throw new BookingError('busy')
  if (!res.ok) throw new BookingError('down')
  return 'sent'
}

export type { AppointmentRequest }
