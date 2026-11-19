// Texts of the services figure ("See how it works"). English only. All NEW texts wait for the owner's approval (docs/lienzo/hoja-b5.md).
// Service tab names and step names live next to the drawing, in features/figure/engine.js (SERVICES).
export const figureText = {
  title: 'See how it works',
  tabsLabel: 'Services',
  hint: 'Pick a service, then drag the gold knob or pick a step',
  note: 'Illustration. Individual results vary.',
  label: 'Treatment steps',
  describe:
    'Illustration of a model of the lower teeth. Choose a service with the tabs, then step through how it is done with the number buttons or the left and right arrow keys.',
  stepsLabel: 'Steps',
  pause: 'Pause animation',
  play: 'Play animation',
  stepOf: 'Step {n} of {total}', // {n} and {total} are filled in by the component
  stepLabel: 'Step {n}: {name}',
} as const
