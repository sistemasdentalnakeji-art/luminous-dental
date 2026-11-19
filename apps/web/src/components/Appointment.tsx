import { clinic } from '@/content/clinic'
import { home } from '@/content/home'
import { BookingForm } from '@/features/booking/BookingForm'

const { heading, intro, location } = home.appointment

export function Appointment() {
  return (
    <section className="wrap appt-sec" id={home.appointment.id} aria-labelledby="appt-h">
      <div className="appt">
        <div className="appt-l">
          <h2 className="h2" id="appt-h">{heading}</h2>
          <p>{intro}</p>
          <div className="visit">
            <h3>{location.heading}</h3>
            <address>{location.address}</address>
            <a className="tlink" href={clinic.mapsUrl} rel="noopener">{location.mapLabel}</a>
          </div>
        </div>
        <div className="formbox"><BookingForm /></div>
      </div>
    </section>
  )
}
