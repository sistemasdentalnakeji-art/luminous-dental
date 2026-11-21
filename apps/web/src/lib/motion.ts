import { useSyncExternalStore } from 'react'

// Un solo interruptor de "pausar animaciones decorativas" para toda la página (WCAG 2.2.2). La parte de CSS es `html[data-motion-paused]` en site.css;
// las filas y figuras en movimiento lo leen con useMotionPaused().
let paused = false
const listeners = new Set<() => void>()

export function setMotionPaused(value: boolean) {
  paused = value
  document.documentElement.toggleAttribute('data-motion-paused', value)
  listeners.forEach((l) => l())
}

export const useMotionPaused = () =>
  useSyncExternalStore((l) => (listeners.add(l), () => void listeners.delete(l)), () => paused)
