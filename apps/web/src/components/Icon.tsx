// Íconos pequeños de línea (24 x 24, stroke = currentColor). Misma idea que el componente Icon de Dental Nakeji, solo los que usa este sitio.
const PATHS = {
  check: 'M5 12.5l4.5 4.5L19 7.5',
  clock: 'M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
  arrowRight: 'M5 12h14M13 6l6 6-6 6',
  chevronLeft: 'M15 6l-6 6 6 6',
  chevronRight: 'M9 6l6 6-6 6',
  chevronDown: 'M6 9l6 6 6-6',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6L6 18',
  tooth: 'M8 3.5c-2.5 0-4 2-4 4.5 0 2 1 3.500 1.500 5.500.5 2 .5 7 2.500 7 1.500 0 1.500-4 2-5s1 -1 2 0 .5 5 2 5c2 0 2-5 2.500-7 .5-2 1.500-3.500 1.500-5.500 0-2.500-1.500-4.500-4-4.500-1.500 0-2.500.8-3.500.8S9.500 3.500 8 3.500z',
  sparkle: 'M12 3l1.800 5.200L19 10l-5.200 1.800L12 17l-1.800-5.200L5 10l5.200-1.800zM18.500 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z',
  braces: 'M3 9h18M3 15h18M7 7v4M12 7v4M17 7v4M7 13v4M12 13v4M17 13v4',
  implant: 'M9 3h6l-1 5H10zM10 8.500h4M10 11h4M10.500 13.500h3M11 16l.5 5h1l.5-5',
  bridge: 'M3 8h18v3a2 2 0 0 1-2 2h-1v6h-3v-5h-6v5H6v-6H5a2 2 0 0 1-2-2z',
  star: 'M12 3.200l2.700 5.500 6 .9-4.400 4.200 1 6L12 17l-5.300 2.800 1-6L3.300 9.600l6-.9z',
  pin: 'M12 21s-6.500-6-6.500-11a6.500 6.500 0 0 1 13 0c0 5-6.500 11-6.500 11zM12 12a2.500 2.500 0 1 0 0-5 2.500 2.500 0 0 0 0 5z',
  phone: 'M5 4h4l2 5-2.500 1.500a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
  mail: 'M4 6h16v12H4zM4 7l8 6 8-6',
  book: 'M12 6.500C10.500 5.200 8 4.500 4 4.500v13c4 0 6.500.7 8 2 1.500-1.300 4-2 8-2v-13c-4 0-6.500.7-8 2zM12 6.500v13',
  document: 'M7 3h7l4 4v14H7zM14 3v4h4M9.500 12h5M9.500 16h5',
  lock: 'M6 11h12v9H6zM8.500 11V8a3.500 3.500 0 0 1 7 0v3M12 15v2',
  calendar: 'M5 5h14v15H5zM5 10h14M9 3v4M15 3v4',
  scale: 'M12 4v16M7 20h10M4 7h16M4 7l-2.500 6a3 3 0 0 0 5 0zM20 7l-2.500 6a3 3 0 0 0 5 0z',
  users: 'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 19c0-3 2.700-5 6-5s6 2 6 5M16 6a3 3 0 0 1 0 5.500M18 14c2 .6 3 2.300 3 5',
  share: 'M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8.600 13.500l6.800 4M15.400 6.500l-6.800 4',
  help: 'M9.500 9a2.500 2.500 0 1 1 5 0c0 1.700-2.500 2-2.500 4M12 17h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
  message: 'M4 5h16v11H9l-5 4z',
  refresh: 'M20 12a8 8 0 1 1-2.500-5.800M20 4v5h-5',
  plus: 'M12 5v14M5 12h14',
  search: 'M10.500 17a6.500 6.500 0 1 0 0-13 6.500 6.500 0 0 0 0 13zM16 16l5 5',
  shield: 'M12 3l8 3v6c0 4.500-3.400 7.800-8 9-4.600-1.200-8-4.500-8-9V6z',
  card: 'M3 6h18v12H3zM3 10h18M7 15h3',
} as const
export type IconName = keyof typeof PATHS

export function Icon({ name, size = 20, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={PATHS[name]} />
    </svg>
  )
}
