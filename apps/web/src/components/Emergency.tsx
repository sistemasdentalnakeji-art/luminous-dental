import { Icon } from '@/components/Icon'
import { clinic, clinicText } from '@/content/clinic'
import { useLang } from '@/lib/lang'

/** Primera sección de Contact: emergencias 24/7. Tarjeta serena de vidrio: título, qué cuenta como emergencia y el teléfono como botón principal. Textos aprobados el 25-11 (más los de 26-11, POR APROBAR); estilos .emg* en styles/home-b1.css. */
export function Emergency({ bare = false }: { bare?: boolean }) {
  const { title, text, cta, examplesTitle, examples, callLabel } = clinicText[useLang()].emergency
  const body = (
      <div className={bare ? "emg emg--bare" : "emg"}>
        <div className="emg__main">
          <span className="emg__eyebrow" aria-hidden="true"><Icon name="tooth" size={24} /></span>
          <h2 id="emg-h">{title}</h2>
          <p className="emg__text">{text}</p>
          <h3>{examplesTitle}</h3>
          <ul className="emg__list">
            {examples.map((e) => <li key={e}><Icon name="check" size={18} />{e}</li>)}
          </ul>
        </div>
        <div className="emg__panel">
          <p>{callLabel}</p>
          <a className="btn emg__call" href={clinic.phone.href}><Icon name="phone" size={26} /><span className="nw">{clinic.phone.label}</span><span className="sr-only"> {cta}</span></a>
        </div>
      </div>
  )
  return bare ? body : <section className="wrap emg-sec" id="emergencies" aria-labelledby="emg-h">{body}</section>
}
