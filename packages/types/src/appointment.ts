/**
 * Contrato de la solicitud de cita, compartido por la página web, la futura API y las automatizaciones.
 * Los campos replican el formulario de contacto oficial en luminousdentallv.com/contact-us (revisado el 2026-11-17).
 * Sin historial médico: solo lo necesario para devolver la llamada al paciente.
 */
export interface AppointmentRequest {
  firstName: string
  lastName: string
  email: string
  phone: string
  treatment: string
  message: string
  /** El paciente aceptó el aviso de privacidad antes de enviar. */
  consent: boolean
  /** Día y hora preferidos en hora de Las Vegas, texto libre hasta que exista disponibilidad real. */
  preferredTime?: string
  /** De dónde vino la solicitud, para que las automatizaciones puedan enrutarla. */
  source: 'website'
}

/** Ciclo de vida por el que una automatización puede mover una solicitud. */
export type AppointmentStatus = 'received' | 'contacted' | 'scheduled' | 'cancelled'
