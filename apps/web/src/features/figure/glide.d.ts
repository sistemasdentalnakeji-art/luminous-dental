export const TRANSIT: number
export const DWELL: number
export const DWELL_LAST: number
export const dwellOf: (i: number, max: number) => number
export function makeGlide(t0?: number): {
  readonly t: number
  readonly k: number
  readonly to: number
  readonly dir: number
  readonly moving: boolean
  aim(next: number): void
  snap(v: number): void
  tick(dt: number, follow?: boolean): void
}
