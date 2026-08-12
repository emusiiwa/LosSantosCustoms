import { useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import { isManager } from '../services/employeesService.js'
import userIcon from '../assets/images/site/user-regular-24.png'
import logo from '../assets/images/site/logo.jpg'
import '../styles/dashboard.css'

const SIDEBAR_LINKS = [
  { to: '/staff/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { to: '/staff/employees', label: 'Users', icon: 'person_outline' },
  { to: '/staff/employees/add', label: 'Add Employee', icon: 'bx bx-user-plus', managerOnly: true },
  { to: '/staff/garage/add', label: 'Add Car', icon: 'bx bx-car' },
  { to: '/staff/garage', label: 'Inventory', icon: 'bx bxs-car-garage' },
  { to: '/staff/bookings', label: 'Bookings', icon: 'receipt_long' },
]

// sidebar + stats-panel wrapper, only used for the staff dashboard page
export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { pathname } = useLocation()
  const { user, logout } = useAuth()
  const { darkMode, toggleDarkMode } = useTheme()
  const navigate = useNavigate()
  const canManage = isManager(user)
  // hide the Add Employee link from non-managers
  const links = SIDEBAR_LINKS.filter((link) => !link.managerOnly || canManage)

  function handleLogout() {
    // See PublicNav's handleLogout for why navigate happens before logout.
    navigate('/')
    setTimeout(logout, 0)
  }

  return (
    <div className={`dashboard-page${darkMode ? ' dark-mode-variables' : ''}`}>
      <div className="container">
        <aside className={sidebarOpen ? 'show' : undefined}>
          <div className="toggle">
            <div className="logo">
              <h2>
                <Link to="/staff/dashboard">
                  Los<span className="danger">Santos</span>Customs
                </Link>
              </h2>
            </div>
            <div className="close" id="close-btn" onClick={() => setSidebarOpen(false)}>
              <span className="material-icons-sharp">close</span>
            </div>
          </div>

          <div className="sidebar">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={pathname === link.to ? 'active' : undefined}
              >
                <span className="material-icons-sharp">
                  {link.icon.includes(' ') || link.icon.startsWith('bx') ? (
                    <i className={link.icon} />
                  ) : (
                    link.icon
                  )}
                </span>
                <h3>{link.label}</h3>
              </Link>
            ))}

            <a href="#" onClick={handleLogout}>
              <span className="material-icons-sharp">logout</span>
              <h3>Logout</h3>
            </a>
          </div>
        </aside>

        <main>
          <Outlet />
        </main>

        <div className="right-section">
          <div className="nav">
            <button id="menu-btn" type="button" onClick={() => setSidebarOpen(true)}>
              <span className="material-icons-sharp">menu</span>
            </button>
            <Link to="/" className="view-site" title="View Site" aria-label="View Site">
              <span className="material-icons-sharp">public</span>
            </Link>
            <div className="dark-mode" onClick={toggleDarkMode}>
              <span className={`material-icons-sharp${darkMode ? '' : ' active'}`}>
                light_mode
              </span>
              <span className={`material-icons-sharp${darkMode ? ' active' : ''}`}>
                dark_mode
              </span>
            </div>

            <div className="profile">
              <div className="info">
                <p>
                  Hey, <b>{user?.firstName ?? 'Staff'}</b>
                </p>
                <small className="text-muted">{user?.role ?? 'Admin'}</small>
              </div>
              <div className="profile-photo">
                <img src={userIcon} alt="" />
              </div>
            </div>
          </div>

          <div className="user-profile">
            <img src={logo} alt="LSC logo" />
            <h2>LSC</h2>
            <p>WebTech Project 2023</p>
          </div>

          <div className="reminders">
            <div className="header">
              <h2>Reminders</h2>
              <span className="material-icons-sharp">notifications_none</span>
            </div>

            <div className="notification">
              <div className="icon">
                <span className="material-icons-sharp">volume_up</span>
              </div>
              <div className="content">
                <div className="info">
                  <h3>Workshop</h3>
                  <small className="text_muted">08:00 AM - 12:00 PM</small>
                </div>
                <span className="material-icons-sharp">more_vert</span>
              </div>
            </div>

            <div className="notification deactive">
              <div className="icon">
                <span className="material-icons-sharp">edit</span>
              </div>
              <div className="content">
                <div className="info">
                  <h3>Board Meeting</h3>
                  <small className="text_muted">14:00 PM - 15:00 PM</small>
                </div>
                <span className="material-icons-sharp">more_vert</span>
              </div>
            </div>

            <div className="notification add-reminder">
              <div>
                <span className="material-icons-sharp">add</span>
                <h3>Add Reminder</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
