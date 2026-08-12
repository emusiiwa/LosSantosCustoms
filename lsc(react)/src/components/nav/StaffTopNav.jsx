import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

const LINKS = [
  { to: '/staff/dashboard', label: 'Dashboard' },
  { to: '/staff/employees', label: 'Users' },
  { to: '/staff/garage', label: 'Garage' },
  { to: '/staff/bookings', label: 'Bookings' },
]

// nav bar for the staff table pages (employees/garage/bookings)
export default function StaffTopNav() {
  const { pathname } = useLocation()
  const { logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    // See PublicNav's handleLogout for why navigate happens before logout.
    navigate('/')
    setTimeout(logout, 0)
  }

  return (
    <nav>
      <Link to="/staff/dashboard" className="logo">
        Los <span>Santos</span> Customs
      </Link>

      <ul className="navbar">
        {LINKS.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className={pathname === link.to ? 'current' : undefined}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', gap: '0.6rem' }}>
        <Link to="/" className="icon-button" title="View Site" aria-label="View Site">
          <i className="bx bx-globe" />
        </Link>
        <button
          type="button"
          className="icon-button icon-button--danger"
          onClick={handleLogout}
          title="Log-Out"
          aria-label="Log-Out"
        >
          <i className="bx bx-log-out" />
        </button>
      </div>
    </nav>
  )
}
