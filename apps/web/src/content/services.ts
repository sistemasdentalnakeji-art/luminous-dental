// Páginas de servicio (una por servicio de clinic.ts), en dos idiomas: cada servicio lleva su texto `en` y `es`. Estructura copiada de la plantilla de servicios de Dental Nakeji
// (portada: título, subtítulo, 3 destacados · acerca de: título en forma de pregunta + párrafo · formulario de cita); los textos NO son de Nakeji.
// Fuente: las páginas oficiales https://luminousdentallv.com/<service>/ (revisadas el 2026-11-18); el sitio oficial tiene restos de plantilla
// («Lorem ipsum», el nombre de otra clínica, el nombre de un doctor, «15% off»), que NO se copian. El español es traducción nueva (26-11), POR APROBAR.
// `placeholder: true` = el sitio oficial no tiene texto útil para una parte de esta página. Esa parte se deja FUERA (oculta), nunca se rellena con
// texto de relleno, hasta que la clínica dé el real (POR CONFIRMAR, docs/datos.md).
// Para agregar un servicio: una fila en clinic.ts (services) y una aquí (con `slugEs`); la ruta en los dos idiomas sale sola (config/routes.ts).
import { clinic, serviceId, services as clinicServices } from '@/content/clinic'
import type { L10n, Lang } from '@/lib/lang'

export type FigureId = 'braces' | 'implants' | 'bridges' | 'crowns' | 'whitening'
export type IconId = 'tooth' | 'sparkle' | 'braces' | 'implant' | 'bridge' | 'shield'
export type GroupId = 'general' | 'cosmetic' | 'orthodontics'

interface Copy {
  name: string
  title: string
  subtitle: string // '' = ninguno (oculto)
  highlights: string[] // de 0 a 3 puntos; ninguno = oculto
  about?: { title: string; text: string } // si falta, el texto «About the treatment» se oculta
}
interface Def extends L10n<Copy> {
  slugEs: string // dirección en español (/es/servicios/<slugEs>); la de inglés sale del nombre en inglés (serviceId)
  icon: IconId
  figure?: FigureId // los servicios que dibuja la figura
  glyph?: FigureId | 'allon' // ícono de la pestaña destacada si es distinto de la figura
  blogKey?: string // artículo del blog sobre este servicio (content/blog.*.json)
  placeholder?: boolean
}

export interface ServicePage extends Copy {
  id: string // estable en los dos idiomas (= dirección en inglés); es la clave de la ruta `service:<id>`
  slug: string // dirección en el idioma de la página
  group: string
  groupId: GroupId
  icon: IconId
  figure?: FigureId
  glyph?: FigureId | 'allon'
  blogKey?: string
  placeholder?: boolean
}

const defs: Def[] = [
  {
    slugEs: 'cuidado-dental-de-rutina', icon: 'tooth', blogKey: 'professional-dental-cleaning',
    en: {
      name: 'Routine Dental Care', title: 'Routine Dental Care',
      subtitle: 'Prevention is always better than restoration when it comes to your teeth.',
      highlights: ['Biannual checkups and exams.', 'Early detection of potential concerns.', 'Preventive care planned around each patient.'],
      about: {
        title: 'Why see your dentist on a routine basis?',
        text: 'Going to our dentist on a routine basis for dental care means seeing them regularly. Just like routine oil changes keep your car’s engine in great working order, routine dental care is essential to maintain a healthy smile. Regular visits could save you a future dental emergency. A routine visit is for patients of all ages: it can include an exam, a professional cleaning and a talk with your dentist about brushing, flossing and how often to come back.',
      },
    },
    es: {
      name: 'Cuidado dental de rutina', title: 'Cuidado dental de rutina',
      subtitle: 'Cuando se trata de tus dientes, prevenir siempre es mejor que restaurar.',
      highlights: ['Revisiones y exámenes dos veces al año.', 'Detección temprana de posibles problemas.', 'Cuidado preventivo planeado para cada paciente.'],
      about: {
        title: '¿Por qué visitar a tu dentista con regularidad?',
        text: 'Ir con tu dentista de forma regular significa verlo con frecuencia. Así como los cambios de aceite mantienen el motor de tu auto en buen estado, el cuidado dental de rutina es esencial para mantener una sonrisa sana. Las visitas regulares podrían ahorrarte una emergencia dental en el futuro. La visita de rutina es para pacientes de todas las edades: puede incluir un examen, una limpieza profesional y una plática con tu dentista sobre el cepillado, el hilo dental y cada cuánto volver.',
      },
    },
  },
  {
    slugEs: 'dentaduras-y-puentes', icon: 'bridge', figure: 'bridges', blogKey: 'partial-and-complete-dentures',
    en: {
      name: 'Dentures & Bridges', title: 'Dentures & Bridges',
      subtitle: 'Replacements for missing teeth that focus on aesthetics, fit and comfort.',
      highlights: ['Full and partial dentures.', 'Bridges that close the gap left by missing teeth.', 'An exam first to recommend the right option.'],
      about: {
        title: 'What are dentures and bridges?',
        text: 'Dentures are replacements for missing teeth that can be taken out and put back into your mouth; there are two main types, full and partial. A dental bridge closes the gap left by one or more missing teeth: it is made of crowns for the teeth on either side of the gap and a false tooth or teeth in between. Our dentist will examine your case, listen to your concerns and recommend the appropriate option. Dentures and bridges need daily cleaning and regular checkups so they keep fitting well, and your dentist will explain how to care for yours.',
      },
    },
    es: {
      name: 'Dentaduras y puentes', title: 'Dentaduras y puentes',
      subtitle: 'Reemplazos para dientes faltantes que cuidan la estética, el ajuste y la comodidad.',
      highlights: ['Dentaduras completas y parciales.', 'Puentes que cierran el espacio de los dientes faltantes.', 'Primero un examen para recomendar la mejor opción.'],
      about: {
        title: '¿Qué son las dentaduras y los puentes?',
        text: 'Las dentaduras son reemplazos de dientes faltantes que se pueden quitar y volver a colocar en la boca; hay dos tipos principales, completas y parciales. Un puente dental cierra el espacio que dejan uno o más dientes faltantes: se compone de coronas para los dientes de cada lado del espacio y uno o varios dientes artificiales en medio. Nuestro dentista examinará tu caso, escuchará tus inquietudes y te recomendará la opción adecuada. Las dentaduras y los puentes necesitan limpieza diaria y revisiones regulares para que sigan ajustando bien, y tu dentista te explicará cómo cuidar los tuyos.',
      },
    },
  },
  {
    slugEs: 'limpieza-dental', icon: 'sparkle', blogKey: 'professional-dental-cleaning',
    en: {
      name: 'Dental Cleaning', title: 'Dental Cleaning',
      subtitle: 'Professional cleanings that daily brushing and flossing cannot replace.',
      highlights: ['Removes plaque, tartar and bacteria.', 'Goes with a dental examination.', 'Helps lower the risk of cavities and gum disease.'],
      about: {
        title: 'What does a professional cleaning do?',
        text: 'Regular dental examinations and professional cleanings help remove plaque, tartar and bacteria that daily brushing and flossing cannot eliminate. Preventive dental care is one of the most effective ways to reduce the risk of cavities, gum disease and enamel erosion while preserving your natural teeth. It is for most patients, and it complements brushing and cleaning between teeth every day. Your dental team can tell you how often to come back.',
      },
    },
    es: {
      name: 'Limpieza dental', title: 'Limpieza dental',
      subtitle: 'Limpiezas profesionales que el cepillado y el hilo dental diarios no pueden reemplazar.',
      highlights: ['Elimina placa, sarro y bacterias.', 'Va acompañada de un examen dental.', 'Ayuda a reducir el riesgo de caries y de enfermedad de las encías.'],
      about: {
        title: '¿Qué hace una limpieza profesional?',
        text: 'Los exámenes dentales regulares y las limpiezas profesionales ayudan a eliminar la placa, el sarro y las bacterias que el cepillado y el hilo dental diarios no logran quitar. El cuidado dental preventivo es una de las formas más eficaces de reducir el riesgo de caries, enfermedad de las encías y erosión del esmalte, y de conservar tus dientes naturales. Es para la mayoría de los pacientes y complementa el cepillado y la limpieza entre los dientes de cada día. Tu equipo dental te dirá cada cuánto volver.',
      },
    },
  },
  {
    slugEs: 'extraccion-de-muelas-del-juicio', icon: 'tooth', blogKey: 'extractions-and-wisdom-teeth',
    en: {
      name: 'Wisdom Tooth Removal', title: 'Wisdom Tooth Removal',
      subtitle: 'An exam and a plan based on the position and condition of each tooth.',
      highlights: ['Exam and digital X-rays first.', 'A plan for each tooth.', 'Written aftercare instructions.'],
      about: {
        title: 'When are wisdom teeth a problem?',
        text: 'Wisdom teeth can cause a variety of oral health problems when they become impacted, crowded, or fail to erupt properly. Visits start with an exam and digital X-rays, and the team explains the process and answers your questions before any treatment. Written aftercare instructions are given after the visit; following them matters for your recovery, and you can call us if you have questions.',
      },
    },
    es: {
      name: 'Extracción de muelas del juicio', title: 'Extracción de muelas del juicio',
      subtitle: 'Un examen y un plan según la posición y el estado de cada muela.',
      highlights: ['Primero un examen y radiografías digitales.', 'Un plan para cada muela.', 'Instrucciones de cuidados posteriores por escrito.'],
      about: {
        title: '¿Cuándo son un problema las muelas del juicio?',
        text: 'Las muelas del juicio pueden causar diversos problemas de salud bucal cuando quedan impactadas, apiñadas o no logran salir correctamente. Las visitas comienzan con un examen y radiografías digitales, y el equipo te explica el proceso y resuelve tus dudas antes de cualquier tratamiento. Después de la visita recibes instrucciones de cuidados por escrito; seguirlas es importante para tu recuperación, y puedes llamarnos si tienes dudas.',
      },
    },
  },
  {
    slugEs: 'aparatos-dentales', icon: 'shield', placeholder: true,
    en: { name: 'Dental Appliances', title: 'Dental Appliances', subtitle: '', highlights: [] },
    es: { name: 'Aparatos dentales', title: 'Aparatos dentales', subtitle: '', highlights: [] },
  },
  {
    slugEs: 'carillas-y-coronas-de-porcelana', icon: 'sparkle', figure: 'crowns', blogKey: 'dental-veneers',
    en: {
      name: 'Porcelain Veneers & Crowns', title: 'Porcelain Veneers & Crowns',
      subtitle: 'Cosmetic and restorative options made with porcelain.',
      highlights: ['Veneers are ultra-thin shells placed over teeth.', 'Crowns are placed over damaged teeth.', 'Made with porcelain, a durable material.'],
      about: {
        title: 'What are veneers and crowns?',
        text: 'Dental veneers are ultra-thin shells placed over the teeth that can help conceal imperfections. Dental crowns are placed by dentists over damaged teeth. We make use of porcelain to craft these cosmetic and restorative options. Schedule an appointment with our dentist to talk about which one fits your teeth. Before choosing, the dentist checks the health of your teeth and gums and talks through the change you want. Porcelain restorations need daily cleaning and regular checkups, and the dentist will explain how to care for them.',
      },
    },
    es: {
      name: 'Carillas y coronas de porcelana', title: 'Carillas y coronas de porcelana',
      subtitle: 'Opciones estéticas y restaurativas hechas con porcelana.',
      highlights: ['Las carillas son láminas ultradelgadas que se colocan sobre los dientes.', 'Las coronas se colocan sobre dientes dañados.', 'Hechas con porcelana, un material duradero.'],
      about: {
        title: '¿Qué son las carillas y las coronas?',
        text: 'Las carillas dentales son láminas ultradelgadas que se colocan sobre los dientes y pueden ayudar a disimular imperfecciones. Las coronas dentales las colocan los dentistas sobre dientes dañados. Usamos porcelana para elaborar estas opciones estéticas y restaurativas. Agenda una cita con nuestro dentista para platicar cuál se adapta mejor a tus dientes. Antes de elegir, el dentista revisa la salud de tus dientes y encías y platica contigo el cambio que buscas. Las restauraciones de porcelana necesitan limpieza diaria y revisiones regulares, y el dentista te explicará cómo cuidarlas.',
      },
    },
  },
  {
    slugEs: 'resinas-esteticas', icon: 'sparkle',
    en: {
      name: 'Cosmetic Bonding', title: 'Cosmetic Bonding',
      subtitle: 'A tooth-colored resin applied to repair damage.',
      highlights: ['Tooth-colored composite resin.', 'A shade guide helps match your natural teeth.', 'Can address cracked, chipped, misshapen or discolored teeth.'],
      about: {
        title: 'What is cosmetic bonding?',
        text: 'Cosmetic bonding is a procedure in which a dentist applies a tooth-colored composite resin to one or more of your teeth to repair damage. It is a practical alternative to crowns and veneers. A shade guide helps you choose a color that matches your natural teeth, and the resin is hardened with UV light. The dentist first checks the tooth and explains whether bonding fits your case. Bonded teeth are cleaned like natural teeth, and your dentist will advise you on habits that can chip or stain the resin.',
      },
    },
    es: {
      name: 'Resinas estéticas (bonding)', title: 'Resinas estéticas (bonding)',
      subtitle: 'Una resina del color del diente que se aplica para reparar daños.',
      highlights: ['Resina compuesta del color del diente.', 'Una guía de tonos ayuda a igualar tus dientes naturales.', 'Puede atender dientes agrietados, astillados, con forma irregular o manchados.'],
      about: {
        title: '¿Qué son las resinas estéticas (bonding)?',
        text: 'El bonding estético es un procedimiento en el que el dentista aplica una resina compuesta del color del diente sobre uno o más de tus dientes para reparar daños. Es una alternativa práctica a las coronas y las carillas. Una guía de tonos te ayuda a elegir un color que combine con tus dientes naturales, y la resina se endurece con luz UV. El dentista primero revisa el diente y te explica si el bonding es adecuado para tu caso. Los dientes con resina se limpian como los naturales, y tu dentista te orientará sobre hábitos que pueden astillar o manchar la resina.',
      },
    },
  },
  {
    // NUEVO, POR APROBAR (25-11): textos adaptados de Dental Nakeji (all-on-4 y all-on-6 en una sola página). Sin precios ni promesas. La figura es la de implantes (aún no hay paso propio).
    slugEs: 'all-on-4-y-all-on-6', icon: 'implant', figure: 'implants', glyph: 'allon', blogKey: 'all-on-4-implants',
    en: {
      name: 'All-on-4 & All-on-6', title: 'All-on-4 & All-on-6',
      subtitle: 'A fixed prosthesis that replaces a full arch of teeth, supported by four or six implants.',
      highlights: ['A full arch on 4 or 6 implants.', 'Fixed teeth in a single prosthesis.', 'Bone and bite evaluation for each arch.'],
      about: {
        title: 'What are All-on-4 and All-on-6?',
        text: 'All-on-4 and All-on-6 are options for replacing the teeth of a full arch with a fixed prosthesis supported by four or six implants placed in the jawbone. The number of implants alone does not decide which one is best: before proposing a plan, our dentist studies your mouth, gums, bone and bite to determine whether either option is right for your case. Ask about the stages of treatment, the follow-up visits and the daily care a fixed prosthesis needs.',
      },
    },
    es: {
      name: 'All-on-4 y All-on-6', title: 'All-on-4 y All-on-6',
      subtitle: 'Una prótesis fija que reemplaza una arcada completa de dientes, sostenida por cuatro o seis implantes.',
      highlights: ['Una arcada completa sobre 4 o 6 implantes.', 'Dientes fijos en una sola prótesis.', 'Evaluación del hueso y de la mordida para cada arcada.'],
      about: {
        title: '¿Qué son All-on-4 y All-on-6?',
        text: 'All-on-4 y All-on-6 son opciones para reemplazar los dientes de una arcada completa con una prótesis fija sostenida por cuatro o seis implantes colocados en el hueso de la mandíbula. El número de implantes por sí solo no decide cuál es la mejor opción: antes de proponer un plan, nuestro dentista estudia tu boca, encías, hueso y mordida para determinar si alguna de las dos es adecuada para tu caso. Pregunta por las etapas del tratamiento, las visitas de seguimiento y el cuidado diario que necesita una prótesis fija.',
      },
    },
  },
  {
    slugEs: 'implantes-dentales', icon: 'implant', figure: 'implants', blogKey: 'dental-implants-what-they-are',
    en: {
      name: 'Dental Implants', title: 'Dental Implants',
      subtitle: 'Artificial teeth to fill the gaps left by damaged, lost or decayed teeth.',
      highlights: ['Single, multiple or full arch implants.', 'A consultation to check your candidacy.', 'A personalized treatment plan.'],
      about: {
        title: 'How does the dental implant process work?',
        text: 'The process begins with an initial consultation, where our dentist can determine your candidacy for implants. Then your team creates a personalized treatment plan. Next, the density of the jawbone is checked and biocompatible titanium implants are placed. After the healing period, the dentist evaluates whether a crown, bridge or denture will help restore your smile. Implants need daily cleaning and regular checkups afterward. General health and habits such as smoking can affect healing, so tell your dentist about your health history.',
      },
    },
    es: {
      name: 'Implantes dentales', title: 'Implantes dentales',
      subtitle: 'Dientes artificiales para llenar los espacios que dejan los dientes dañados, perdidos o con caries.',
      highlights: ['Implantes individuales, múltiples o de arcada completa.', 'Una consulta para saber si eres candidato.', 'Un plan de tratamiento personalizado.'],
      about: {
        title: '¿Cómo es el proceso de los implantes dentales?',
        text: 'El proceso comienza con una consulta inicial, en la que nuestro dentista puede determinar si eres candidato a implantes. Después, tu equipo crea un plan de tratamiento personalizado. Luego se revisa la densidad del hueso de la mandíbula y se colocan implantes de titanio biocompatibles. Después del periodo de cicatrización, el dentista evalúa si una corona, un puente o una dentadura ayudará a restaurar tu sonrisa. Los implantes necesitan limpieza diaria y revisiones regulares después. La salud general y hábitos como fumar pueden afectar la cicatrización, así que cuéntale a tu dentista tu historial de salud.',
      },
    },
  },
  {
    slugEs: 'blanqueamiento-dental', icon: 'sparkle', figure: 'whitening', blogKey: 'teeth-whitening',
    en: {
      name: 'Teeth Whitening', title: 'Teeth Whitening',
      subtitle: 'Professional-grade products for yellow, discolored teeth.',
      highlights: ['Done under the observation of a dental professional.', 'Custom-made trays or UV light.', 'A take-home option may be available.'],
      about: {
        title: 'Is teeth whitening right for me?',
        text: 'Discolored teeth can make you feel self-conscious when you smile, speak and laugh. We treat yellow, discolored teeth with professional-grade products. Professional whitening is done under the observation of an expert, using custom-made trays or UV light, unlike some over-the-counter products that can damage enamel. If you value convenience, take-home whitening may suit you. Not all stains respond the same way, and existing crowns, veneers or fillings do not change color with whitening. Your dentist checks your teeth and gums first and explains what to expect, including possible tooth sensitivity.',
      },
    },
    es: {
      name: 'Blanqueamiento dental', title: 'Blanqueamiento dental',
      subtitle: 'Productos de grado profesional para dientes amarillos o manchados.',
      highlights: ['Se realiza bajo la observación de un profesional dental.', 'Férulas hechas a la medida o luz UV.', 'Puede haber una opción para hacer en casa.'],
      about: {
        title: '¿El blanqueamiento dental es para mí?',
        text: 'Los dientes manchados pueden hacerte sentir inseguro al sonreír, hablar y reír. Tratamos los dientes amarillos o manchados con productos de grado profesional. El blanqueamiento profesional se realiza bajo la observación de un experto, con férulas hechas a la medida o luz UV, a diferencia de algunos productos de venta libre que pueden dañar el esmalte. Si valoras la comodidad, quizá te convenga el blanqueamiento para hacer en casa. No todas las manchas responden igual, y las coronas, carillas o empastes que ya tengas no cambian de color con el blanqueamiento. Tu dentista revisa antes tus dientes y encías y te explica qué esperar, incluida la posible sensibilidad dental.',
      },
    },
  },
  {
    slugEs: 'invisalign-y-brackets', icon: 'braces', figure: 'braces', blogKey: 'orthodontics-alignment-and-bite',
    en: { name: 'Invisalign & Braces', title: 'Invisalign & Braces', subtitle: 'A straighter smile and a better bite, for teens and adults.', highlights: ['Invisalign and braces.', 'For teens and adults.', 'An evaluation of your teeth and bite first.'], about: { title: 'How does orthodontic treatment work?', text: 'Orthodontics moves teeth gradually to improve their position and the way they fit together when you bite. It can be done with braces or with clear aligners such as Invisalign, depending on each person’s needs. Aligners are clear, removable pieces used in a planned sequence; they are discreet, but they are not suitable for every case. Treatment begins with an evaluation of your teeth and bite, and continues with checkups and adjustments to track progress.' } },
    es: { name: 'Invisalign y brackets', title: 'Invisalign y brackets', subtitle: 'Una sonrisa más recta y una mejor mordida, para adolescentes y adultos.', highlights: ['Invisalign y brackets.', 'Para adolescentes y adultos.', 'Primero, una evaluación de tus dientes y tu mordida.'], about: { title: '¿Cómo funciona el tratamiento de ortodoncia?', text: 'La ortodoncia mueve los dientes poco a poco para mejorar su posición y la forma en que encajan al morder. Puede hacerse con brackets o con alineadores transparentes como Invisalign, según las necesidades de cada persona. Los alineadores son piezas transparentes y removibles que se usan en una secuencia planeada; son discretos, pero no son adecuados para todos los casos. El tratamiento empieza con una evaluación de tus dientes y tu mordida, y sigue con revisiones y ajustes para dar seguimiento al avance.' } },
  },
]

const GROUP: Record<string, { id: GroupId; es: string }> = {
  'General Dentistry': { id: 'general', es: 'Odontología general' },
  'Cosmetic Dentistry': { id: 'cosmetic', es: 'Odontología estética' },
  Orthodontics: { id: 'orthodontics', es: 'Ortodoncia' },
}

const build = (lang: Lang): ServicePage[] =>
  clinicServices.map((s) => {
    const def = defs.find((d) => d.en.name === s.name)
    if (!def) throw new Error(`Service without page content: ${s.name}`)
    const { slugEs, en: _en, es: _es, ...rest } = def
    const id = serviceId(s.name)
    return { ...rest, ...def[lang], id, slug: lang === 'en' ? id : slugEs, group: lang === 'en' ? s.group : GROUP[s.group].es, groupId: GROUP[s.group].id }
  })

const byLang: L10n<ServicePage[]> = { en: build('en'), es: build('es') }
/** Los servicios con página propia, en el idioma pedido y en el orden de clinic.ts. */
export const servicesOf = (lang: Lang) => byLang[lang]

const enText = {
  eyebrow: 'Our services',
  crumbs: 'Breadcrumb',
  book: 'Request an appointment',
  call: `Call or text ${clinic.phone.label}`,
  aboutEyebrow: 'About the treatment',
  noText: 'Call us to learn more about this service.', // NUEVO, para aprobación: se muestra donde el sitio oficial aún no tiene texto
  blogCta: 'Learn more about this treatment',
  featured: {
    title: 'Featured services',
    cta: 'View all services',
    // NUEVO, para aprobación: nombres cortos de las 5 pestañas bajo el carrusel, en el mismo orden que featuredIds
    tabs: ['All-on-4 & All-on-6', 'Implants', 'Braces & Invisalign', 'Dentures & bridges', 'Whitening'],
    card: 'Learn more about this service', // como el botón de la tarjeta de Dental Nakeji («Conocer más del servicio»)
    carousel: 'Featured services',
    badge: 'Most requested',
    accent: 'services', // palabra del título que brilla (RevealText)
    offers: 'what it offers',
    // Textos propios de la tarjeta del inicio (más descriptivos que los de la página de cada servicio), por id de servicio. Solo hechos generales, sin promesas. POR APROBAR.
    copy: {
      'all-on-4-and-all-on-6': { text: 'These options replace the teeth of a full arch with a fixed prosthesis held by four or six implants. We start with an exam of your mouth, gums and bone to see if this is right for you.', points: ['A fixed prosthesis on 4 or 6 implants.', 'An exam of your bone, gums and bite first.', 'A plan built around your case.'] },
      'invisalign-and-braces': { text: 'Straight teeth fit together better and are easier to keep clean. We will go over clear aligners and traditional braces with you, so you can choose what fits your life.', points: ['Clear aligners or traditional braces.', 'Options for teens and adults.', 'A first visit to talk through your goals.'] },
      'dental-implants': { text: 'Implants are artificial teeth that replace teeth that are damaged, lost or decayed. We start by getting to know your health and your smile, then build a plan around you.', points: ['Single, multiple or full-arch options.', 'A consultation to check if implants are right for you.', 'A personalized plan, step by step.'] },
      'dentures-and-bridges': { text: 'Missing teeth can change how you chew and how you feel about your smile. We will look at your case, hear your concerns and explain your options in plain words.', points: ['Full or partial dentures.', 'Bridges that close the gap between teeth.', 'An exam first, to recommend the right fit.'] },
      'teeth-whitening': { text: 'Teeth can look yellow or dull over time. Professional whitening uses dental-grade products and is done while a dental professional looks after the process.', points: ['Custom-made trays or UV light.', 'Done under a dental professional’s care.', 'A take-home option may be available.'] },
    } as Record<string, { text: string; points: string[] }>,
  },
  hub: {
    title: 'Dental services',
    accent: 'for every smile',
    lead: 'Comprehensive dental care at Luminous Dental in Las Vegas: general, cosmetic and orthodontic dentistry, plus implants.',
    indexLabel: 'Browse by category',
    card: 'View service',
  },
}
const esText: typeof enText = {
  eyebrow: 'Nuestros servicios',
  crumbs: 'Ruta de navegación',
  book: 'Solicita tu cita',
  call: `Llama o escribe al ${clinic.phone.label}`,
  aboutEyebrow: 'Sobre el tratamiento',
  noText: 'Llámanos para saber más sobre este servicio.',
  blogCta: 'Conoce más sobre este tratamiento',
  featured: {
    title: 'Servicios destacados',
    cta: 'Ver todos los servicios',
    tabs: ['All-on-4 y All-on-6', 'Implantes', 'Brackets e Invisalign', 'Dentaduras y puentes', 'Blanqueamiento'],
    card: 'Conocer más del servicio',
    carousel: 'Servicios destacados',
    badge: 'Los más solicitados',
    accent: 'destacados',
    offers: 'qué ofrece',
    copy: {
      'all-on-4-and-all-on-6': { text: 'Estas opciones reemplazan los dientes de una arcada completa con una prótesis fija sostenida por cuatro o seis implantes. Empezamos con un examen de tu boca, encías y hueso para ver si es lo adecuado para ti.', points: ['Una prótesis fija sobre 4 o 6 implantes.', 'Primero, un examen de tu hueso, encías y mordida.', 'Un plan hecho a la medida de tu caso.'] },
      'invisalign-and-braces': { text: 'Los dientes alineados encajan mejor y es más fácil mantenerlos limpios. Revisaremos contigo los alineadores transparentes y los brackets tradicionales, para que elijas lo que va con tu vida.', points: ['Alineadores transparentes o brackets tradicionales.', 'Opciones para adolescentes y adultos.', 'Una primera visita para platicar tus metas.'] },
      'dental-implants': { text: 'Los implantes son dientes artificiales que reemplazan dientes dañados, perdidos o con caries. Empezamos por conocer tu salud y tu sonrisa, y luego armamos un plan a tu medida.', points: ['Opciones individuales, múltiples o de arcada completa.', 'Una consulta para saber si los implantes son para ti.', 'Un plan personalizado, paso a paso.'] },
      'dentures-and-bridges': { text: 'Los dientes faltantes pueden cambiar tu forma de masticar y cómo te sientes con tu sonrisa. Revisaremos tu caso, escucharemos tus inquietudes y te explicaremos tus opciones con palabras sencillas.', points: ['Dentaduras completas o parciales.', 'Puentes que cierran el espacio entre dientes.', 'Primero un examen, para recomendar el ajuste adecuado.'] },
      'teeth-whitening': { text: 'Con el tiempo, los dientes pueden verse amarillos u opacos. El blanqueamiento profesional usa productos de grado dental y se realiza mientras un profesional dental supervisa el proceso.', points: ['Férulas hechas a la medida o luz UV.', 'Se realiza bajo el cuidado de un profesional dental.', 'Puede haber una opción para hacer en casa.'] },
    },
  },
  hub: {
    title: 'Servicios dentales',
    accent: 'para cada sonrisa',
    lead: 'Atención dental integral en Luminous Dental, en Las Vegas: odontología general, estética y ortodoncia, además de implantes.',
    indexLabel: 'Explora por categoría',
    card: 'Ver servicio',
  },
}
export const serviceText: L10n<typeof enText> = { en: enText, es: esText }

/** Los cinco servicios de la sección «Featured services» de la home, de mayor a menor costo típico (dueña, 25-11), por id. Cada uno tiene su propia figura (All-on-4 & All-on-6 reusa la de implantes). */
export const featuredIds = ['all-on-4-and-all-on-6', 'dental-implants', 'invisalign-and-braces', 'dentures-and-bridges', 'teeth-whitening'] as const
