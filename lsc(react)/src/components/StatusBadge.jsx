const COLORS = {
  pending: { bg: '#f7d060', text: '#020102' },
  completed: { bg: '#1b9c85', text: '#fff' },
  cancelled: { bg: '#818181', text: '#fff' },
}

export default function StatusBadge({ status }) {
  const { bg, text } = COLORS[status] ?? COLORS.pending // fall back to pending's colours for unknown statuses
  return (
    <span
      style={{
        background: bg,
        color: text,
        padding: '2px 10px',
        borderRadius: '999px',
        fontSize: '0.85em',
        textTransform: 'capitalize',
        whiteSpace: 'nowrap',
      }}
    >
      {status}
    </span>
  )
}
