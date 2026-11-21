import { useEffect, useState } from 'react'
import { reviewsSource } from '@/config/reviews'
import { reviewList, type Review } from '@/content/reviews'

const https = (v: unknown) => {
  if (typeof v !== 'string') return undefined
  try {
    return new URL(v).protocol === 'https:' ? v : undefined // nunca javascript:, data: ni http sin cifrar
  } catch {
    return undefined
  }
}

/** Conserva solo las reseñas bien formadas de una respuesta del servidor; lo demás se descarta. Si no es una lista, o no hay nada válido -> null. */
function parseReviews(json: unknown): Review[] | null {
  const list = (json as { reviews?: unknown } | null)?.reviews
  if (!Array.isArray(list)) return null
  const ok = list.flatMap((r: Record<string, unknown> | null): Review[] => {
    if (!r || typeof r.author !== 'string' || typeof r.text !== 'string' || typeof r.rating !== 'number') return []
    if (!r.author.trim() || !r.text.trim() || !(r.rating >= 1 && r.rating <= 5)) return []
    return [{
      author: r.author,
      text: r.text,
      rating: Math.round(r.rating),
      relativeTime: typeof r.relativeTime === 'string' ? r.relativeTime : undefined,
      authorUrl: https(r.authorUrl),
      photoUrl: https(r.photoUrl),
      googleUrl: https(r.googleUrl),
    }]
  })
  return ok.length ? ok : null
}

/** Reseñas a mostrar: las en vivo cuando `reviewsSource.endpoint` está definido y responde con una lista válida; si no, la lista de content/reviews.ts. */
export function useGoogleReviews(): Review[] {
  const [live, setLive] = useState<Review[] | null>(null)
  useEffect(() => {
    const url = https(reviewsSource.endpoint)
    if (!url) return
    const controller = new AbortController()
    fetch(url, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => setLive(parseReviews(json)))
      .catch(() => {}) // sin conexión o no es JSON: se conserva la lista corta
    return () => controller.abort()
  }, [])
  return live ?? reviewList
}
