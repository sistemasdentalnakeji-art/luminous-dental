import type { AppointmentRequest } from '@luminous/types'

/**
 * Where the booking form sends requests.
 * 'preview': nothing is sent (no form tool yet). Switch to 'api' with a real endpoint when apps/api exists.
 */
export const booking = {
  mode: 'preview' as 'preview' | 'api',
  apiEndpoint: null as string | null, // POR CONFIRMAR when the backend is built
}

export async function sendAppointment(request: AppointmentRequest): Promise<'sent' | 'preview'> {
  if (booking.mode !== 'api' || !booking.apiEndpoint) return 'preview'
  const res = await fetch(booking.apiEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })
  if (!res.ok) throw new Error(`Booking failed: ${res.status}`)
  return 'sent'
}

export type { AppointmentRequest }
