import { useSyncExternalStore } from 'react'

// One "pause decorative animations" switch for the whole page (WCAG 2.2.2). The CSS side is `html[data-motion-paused]` in site.css;
// the moving rows and figures read it with useMotionPaused().
let paused = false
const listeners = new Set<() => void>()

export function setMotionPaused(value: boolean) {
  paused = value
  document.documentElement.toggleAttribute('data-motion-paused', value)
  listeners.forEach((l) => l())
}

export const useMotionPaused = () =>
  useSyncExternalStore((l) => (listeners.add(l), () => void listeners.delete(l)), () => paused)
