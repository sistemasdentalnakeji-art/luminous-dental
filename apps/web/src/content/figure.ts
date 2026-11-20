// Texts of the figures. English only. All NEW texts wait for the owner's approval.
// Service tab names and step names live next to the drawing, in features/figure/engine.js (SERVICES).
export const figureText = {
  label: 'Treatment steps',
  cardTitles: { braces: 'How braces work', implants: 'Dental implants', bridges: 'Dentures & bridges', crowns: 'Veneers & crowns', whitening: 'Teeth whitening' }, // NEW
  hintCard: 'Drag the gold knob or pick a step', // NEW
  describeCard:
    'Illustration of a model of the lower teeth. Step through how the treatment is done with the number buttons, by dragging the gold knob, or with the left and right arrow keys.', // NEW
  note: 'Illustration. Individual results vary.',
  stepsLabel: 'Steps',
  pause: 'Pause animation',
  play: 'Play animation',
  pauseNamed: 'Pause {name} animation', // NEW, for approval: each card of the home carousel has its own name
  playNamed: 'Play {name} animation', // NEW, for approval
  stepOf: 'Step {n} of {total}', // {n} and {total} are filled in by the component
  stepLabel: 'Step {n}: {name}',
} as const
