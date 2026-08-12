import '../styles/modal.css'

export default function Modal({ title, onClose, children }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* stop the click from bubbling to the overlay so the modal doesn't close on itself */}
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
          <i className="bx bx-x" />
        </button>
        {title && <h2>{title}</h2>}
        {children}
      </div>
    </div>
  )
}
