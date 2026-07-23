export function ReviewStars({ rating = 5, className }: { rating?: number; className?: string }) {
  return (
    <span className={className} role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ color: i < rating ? 'var(--color-accent)' : 'var(--color-line)' }}>
          ★
        </span>
      ))}
    </span>
  );
}
