const BANNER_STYLE = {
  position: 'fixed',
  left: '50%',
  bottom: '24px',
  transform: 'translateX(-50%)',
  background: '#020102',
  color: '#fff',
  padding: '12px 20px',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  zIndex: 1000,
  boxShadow: '4px 4px 20px rgb(0 0 0 / 30%)',
}

const UNDO_STYLE = {
  color: '#d90429',
  fontWeight: 700,
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  fontSize: 'inherit',
}

export default function UndoBanner({ message, onUndo }) {
  return (
    <div style={BANNER_STYLE}>
      <span>{message}</span>
      <button type="button" style={UNDO_STYLE} onClick={onUndo}>
        Undo
      </button>
    </div>
  )
}
