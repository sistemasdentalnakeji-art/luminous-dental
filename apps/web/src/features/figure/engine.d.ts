export type Projection = { origin: number[]; scale: number; azimuth: number; elevation: number; width?: number; height?: number }
export const SERVICES: { id: string; tab: string; steps: string[] }[]
export const STEP_U: (i: number, max?: number) => number
export const RAIL_W: number
export function iso(p: number[], projection: Projection): number[]
export function fitProjection(points: number[][], width: number, height: number, o?: { pad?: number; azimuth?: number; elevation?: number }): Projection
export function setView(P: object): void
export function setScope(scope: string): void
export function W(p: number[]): number[]
export function staticSvg(): string
export function carriageSvg(): string
export function carriageTransform(t: number, max?: number): string
export function rulerSvg(max: number): string
export function dynSvg(state: unknown): string
export function sceneState(svc: number, t: number, dir?: number): unknown
export function floatShadowSvg(): string
export function cardStaticSvg(): string
