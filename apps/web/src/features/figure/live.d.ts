export function mountServices(
  root: HTMLElement,
  P: object,
  txt: { scope: string; steps: string[]; play: string; stepOf: (n: number, total: number) => string; stepLabel: (n: number, name: string) => string },
): () => void
