import { clinic } from '@/content/clinic'
import { home } from '@/content/home'
import { BookingForm } from '@/features/booking/BookingForm'

const { heading, intro, location } = home.appointment

/** `hideVisit`: leaves out the address block, for the page that already shows it (Contact). */
export function Appointment({ service, hideVisit = false }: { service?: string; hideVisit?: boolean }) {
  return (
    <section className="wrap appt-sec" id={home.appointment.id} aria-labelledby="appt-h">
      <div className="appt">
        <div className="appt-l">
          <h2 className="h2" id="appt-h">{heading}</h2>
          <p>{intro}</p>
          {!hideVisit && (
            <div className="visit">
              <h3>{location.heading}</h3>
              <address>{location.address}</address>
              <a className="tlink" href={clinic.mapsUrl} target="_blank" rel="noopener noreferrer">{location.mapLabel}</a>
            </div>
          )}
        </div>
        <div className="formbox"><BookingForm defaultTreatment={service} /></div>
      </div>
    </section>
  )
}
