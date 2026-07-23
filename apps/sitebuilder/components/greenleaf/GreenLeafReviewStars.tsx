export function GreenLeafReviewStars({ rating = 5, className = '' }: { rating?: number; className?: string }) {
  return (
    <span className={className} role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ color: i < rating ? 'var(--brand-accent)' : 'var(--line)' }}>
          ★
        </span>
      ))}
    </span>
  );
}
