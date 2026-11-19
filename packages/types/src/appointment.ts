/**
 * Appointment request contract shared by the web page, the future API and automations.
 * Fields mirror the official contact form at luminousdentallv.com/contact-us (checked 2026-11-17).
 * Keep it free of medical history: only what is needed to call the patient back.
 */
export interface AppointmentRequest {
  firstName: string
  lastName: string
  email: string
  phone: string
  treatment: string
  message: string
  /** Patient accepted the privacy notice before sending. */
  consent: boolean
  /** Preferred day/time in Las Vegas time, free text until real availability exists. */
  preferredTime?: string
  /** Where the request came from, so automations can route it. */
  source: 'website'
}

/** Lifecycle an automation can move a request through. */
export type AppointmentStatus = 'received' | 'contacted' | 'scheduled' | 'cancelled'
