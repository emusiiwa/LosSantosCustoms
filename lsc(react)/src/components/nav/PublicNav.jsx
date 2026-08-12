import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function PublicNav() {
  const [open, setOpen] = useState(false) // mobile hamburger menu state

  return (
    <nav>
      <i className="bx bx-menu" id="menu-icon" onClick={() => setOpen((v) => !v)} />

      <Link to="/" className="logo">
        Los <span>Santos</span> Customs
      </Link>

      <ul className={`navbar${open ? ' active' : ''}`}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/cars">Cars</Link>
        </li>
        <li>
          <Link to="/team">About</Link>
        </li>
        <li>
          <a href="/#blog">Blog</a>
        </li>

        <div className="dropdown">
          <li className="drop-link">
            <a href="#">Dealerships</a>
          </li>
          <div className="dropdown-content">
            <a href="#">Johannesburg</a>
            <a href="#">Cape Town</a>
            <a href="#">Durban</a>
          </div>
        </div>
      </ul>

      <Link to="/staff/login" className="icon-button" title="Staff Login" aria-label="Staff Login">
        <i className="bx bx-log-in" />
      </Link>
    </nav>
  )
}
