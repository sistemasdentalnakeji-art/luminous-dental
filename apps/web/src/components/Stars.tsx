import { Icon } from '@/components/Icon'

export function Stars({ rating, size = 18 }: { rating: number; size?: number }) {
  return (
    <span className="stars" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => <Icon key={i} name="star" size={size} className={i < Math.round(rating) ? 'star is-filled' : 'star'} />)}
    </span>
  )
}
