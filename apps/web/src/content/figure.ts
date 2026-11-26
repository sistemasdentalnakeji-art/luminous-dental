// Textos de las figuras, en dos idiomas (figureText.en / figureText.es). Todos los textos NUEVOS esperan la aprobación del dueño.
// El motor (features/figure/engine.js, SERVICES) trae los nombres de los pasos en inglés y decide cuántos pasos hay; aquí van los nombres de cada idioma (`steps`, mismo orden y mismo número).
import type { L10n } from '@/lib/lang'

const en = {
  label: 'Treatment steps',
  cardTitles: { braces: 'How braces work', implants: 'Dental implants', bridges: 'Dentures & bridges', crowns: 'Veneers & crowns', whitening: 'Teeth whitening' } as Record<string, string>, // NUEVO
  steps: {
    braces: ['Crooked teeth', 'Brackets bonded', 'Archwire threaded in', 'Teeth start to move', 'Teeth move into line'],
    implants: ['Missing tooth', 'Post placed in the jaw', 'Abutment attached', 'Crown placed'],
    bridges: ['Missing tooth', 'Support teeth shaped', 'Bridge set in place'],
    crowns: ['Natural tooth', 'Tooth shaped', 'Crown made', 'Crown seated'],
    whitening: ['Natural shade', 'Gel applied', 'Shade begins to lighten', 'Gel removed'],
  } as Record<string, string[]>,
  hintCard: 'Drag the blue knob or pick a step', // NUEVO
  describeCard:
    'Illustration of a model of the lower teeth. Step through how the treatment is done with the number buttons, by dragging the blue knob, or with the left and right arrow keys.', // NUEVO
  note: 'Illustration. Individual results vary.',
  stepsLabel: 'Steps',
  pause: 'Pause animation',
  play: 'Play animation',
  pauseNamed: 'Pause {name} animation', // NUEVO, para aprobación: cada tarjeta del carrusel de la home tiene su propio nombre
  playNamed: 'Play {name} animation', // NUEVO, para aprobación
  stepOf: 'Step {n} of {total}', // el componente rellena {n} y {total}
  stepLabel: 'Step {n}: {name}',
}
const es: typeof en = {
  label: 'Pasos del tratamiento',
  cardTitles: { braces: 'Cómo funcionan los brackets', implants: 'Implantes dentales', bridges: 'Dentaduras y puentes', crowns: 'Carillas y coronas', whitening: 'Blanqueamiento dental' },
  steps: {
    braces: ['Dientes chuecos', 'Brackets pegados', 'Arco de alambre colocado', 'Los dientes empiezan a moverse', 'Los dientes se alinean'],
    implants: ['Diente faltante', 'Poste colocado en la mandíbula', 'Pilar conectado', 'Corona colocada'],
    bridges: ['Diente faltante', 'Dientes de apoyo tallados', 'Puente colocado'],
    crowns: ['Diente natural', 'Diente tallado', 'Corona elaborada', 'Corona colocada'],
    whitening: ['Tono natural', 'Gel aplicado', 'El tono empieza a aclararse', 'Gel retirado'],
  },
  hintCard: 'Arrastra la perilla azul o elige un paso',
  describeCard:
    'Ilustración de un modelo de los dientes inferiores. Recorre cómo se realiza el tratamiento con los botones numerados, arrastrando la perilla azul o con las flechas izquierda y derecha del teclado.',
  note: 'Ilustración. Los resultados varían de una persona a otra.',
  stepsLabel: 'Pasos',
  pause: 'Pausar animación',
  play: 'Reproducir animación',
  pauseNamed: 'Pausar la animación de {name}',
  playNamed: 'Reproducir la animación de {name}',
  stepOf: 'Paso {n} de {total}',
  stepLabel: 'Paso {n}: {name}',
}
export const figureText: L10n<typeof en> = { en, es }
