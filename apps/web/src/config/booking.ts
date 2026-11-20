import type { AppointmentRequest } from '@luminous/types'

/**
 * Where the booking form sends requests.
 * 'preview': nothing is sent (no form tool yet). Switch to 'api' with a real endpoint when apps/api exists.
 */
export const booking = {
  mode: 'preview' as 'preview' | 'api',
  apiEndpoint: null as string | null, // POR CONFIRMAR when the backend is built
}

/** Why a send failed: the server refused the data (400/422), too many sends (429), or it is down, slow or unreachable. */
export class BookingError extends Error {
  kind: 'invalid' | 'busy' | 'down'
  constructor(kind: 'invalid' | 'busy' | 'down') {
    super(kind)
    this.kind = kind
  }
}

const TIMEOUT_MS = 10_000
const isHttps = (url: string) => {
  try {
    return new URL(url).protocol === 'https:'
  } catch {
    return false
  }
}

export async function sendAppointment(request: AppointmentRequest): Promise<'sent' | 'preview'> {
  // Only an https address counts as connected: patient data never travels over plain http.
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
    throw new BookingError('down') // no connection or no answer in time
  }
  if (res.status === 400 || res.status === 422) throw new BookingError('invalid')
  if (res.status === 429) throw new BookingError('busy')
  if (!res.ok) throw new BookingError('down')
  return 'sent'
}

export type { AppointmentRequest }
