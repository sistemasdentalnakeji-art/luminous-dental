import { clinic, services } from '@/content/clinic'
import { BookingForm } from '@/features/booking/BookingForm'

// Stage 0 shell: semantic layout with real data only. The design arrives in stage 2.
export default function App() {
  const groups = [...new Set(services.map((s) => s.group))]
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:p-3">Skip to content</a>
      <header className="border-b px-4 py-4">
        <p className="font-semibold">{clinic.name}</p>
      </header>
      <main id="main" className="mx-auto max-w-3xl space-y-10 px-4 py-10">
        <section>
          <h1 className="text-3xl font-semibold">{clinic.tagline}</h1>
          <a className="mt-4 inline-block underline" href="#book">Book an appointment</a>
        </section>
        <section aria-labelledby="services">
          <h2 id="services" className="text-xl font-semibold">Services</h2>
          {groups.map((g) => (
            <div key={g} className="mt-4">
              <h3 className="font-medium">{g}</h3>
              <ul className="list-disc pl-6 text-muted">
                {services.filter((s) => s.group === g).map((s) => <li key={s.name}>{s.name}</li>)}
              </ul>
            </div>
          ))}
        </section>
        <section aria-labelledby="doctor">
          <h2 id="doctor" className="text-xl font-semibold">{clinic.doctor.name}</h2>
          <p className="mt-2">{clinic.doctor.bio}</p>
        </section>
        <section id="book" aria-labelledby="book-title">
          <h2 id="book-title" className="text-xl font-semibold">Request an Appointment</h2>
          <BookingForm />
        </section>
      </main>
      <footer className="border-t px-4 py-6 text-sm">
        <address className="not-italic">
          <a href={clinic.mapsUrl}>{clinic.address.street} · {clinic.address.city}, {clinic.address.state}</a><br />
          <a href={clinic.phone.href}>{clinic.phone.label}</a> · <a href={`mailto:${clinic.email}`}>{clinic.email}</a>
        </address>
        <p className="mt-2">© {new Date().getFullYear()} {clinic.name}</p>
      </footer>
    </>
  )
}
