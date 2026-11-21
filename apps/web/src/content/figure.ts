// Textos de las figuras. Solo en inglés. Todos los textos NUEVOS esperan la aprobación del dueño.
// Los nombres de las pestañas de servicio y de los pasos están junto al dibujo, en features/figure/engine.js (SERVICES).
export const figureText = {
  label: 'Treatment steps',
  cardTitles: { braces: 'How braces work', implants: 'Dental implants', bridges: 'Dentures & bridges', crowns: 'Veneers & crowns', whitening: 'Teeth whitening' }, // NUEVO
  hintCard: 'Drag the gold knob or pick a step', // NUEVO
  describeCard:
    'Illustration of a model of the lower teeth. Step through how the treatment is done with the number buttons, by dragging the gold knob, or with the left and right arrow keys.', // NUEVO
  note: 'Illustration. Individual results vary.',
  stepsLabel: 'Steps',
  pause: 'Pause animation',
  play: 'Play animation',
  pauseNamed: 'Pause {name} animation', // NUEVO, para aprobación: cada tarjeta del carrusel de la home tiene su propio nombre
  playNamed: 'Play {name} animation', // NUEVO, para aprobación
  stepOf: 'Step {n} of {total}', // el componente rellena {n} y {total}
  stepLabel: 'Step {n}: {name}',
} as const
