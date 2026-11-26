// Idioma de la página actual. App lo fija desde la ruta (<LangContext value={route.lang}>) y los componentes lo leen con useLang()
// para elegir sus textos (content/*.ts: L10n<T> = { en, es }) y sus enlaces (routeOf(key, lang) en config/routes.ts), sin recibirlo por props.
import { createContext, use } from 'react'

export type Lang = 'en' | 'es'
export const LANGS: Lang[] = ['en', 'es']
/** Un mismo contenido en los dos idiomas. Los dos lados llevan la misma forma: `{ en: {...}, es: {...} }` y TypeScript avisa si a uno le falta algo. */
export type L10n<T> = Record<Lang, T>

export const LangContext = createContext<Lang>('en')
export const useLang = () => use(LangContext)
