import { RevealText } from '@/components/RevealText'
import { clinic } from '@/content/clinic'
import { home } from '@/content/home'
import { BookingForm } from '@/features/booking/BookingForm'

const { heading, intro, location } = home.appointment

/** `hideVisit`: omite el bloque de la dirección, para la página que ya lo muestra (Contact). */
export function Appointment({ hideVisit = false }: { hideVisit?: boolean }) {
  return (
    <section className="wrap appt-sec" id={home.appointment.id} aria-labelledby="appt-h">
      <div className="appt">
        <div className="appt-l">
          <RevealText className="h2" id="appt-h">{heading}</RevealText>
          <p>{intro}</p>
          {!hideVisit && (
            <div className="visit">
              <h3>{location.heading}</h3>
              <address>{location.address}</address>
              <a className="tlink" href={clinic.mapsUrl} target="_blank" rel="noopener noreferrer">{location.mapLabel}</a>
            </div>
          )}
        </div>
        <div className="formbox"><BookingForm /></div>
      </div>
    </section>
  )
}
