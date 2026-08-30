interface Props {
  filled: number
  total: number
}

export function ProgressBar({ filled, total }: Props) {
  const pct = total > 0 ? Math.min(100, Math.round((filled / total) * 100)) : 0
  return (
    <span
      className="bar"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={filled}
      aria-label={`נרשמו ${filled} מתוך ${total}`}
    >
      {/* בכיוון RTL המילוי מתחיל מהצד הימני של המסילה */}
      <span className="bar__fill" style={{ width: `${pct}%` }} />
    </span>
  )
}
