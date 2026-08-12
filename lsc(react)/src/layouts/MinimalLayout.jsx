import { Outlet } from 'react-router-dom'
import MinimalNav from '../components/nav/MinimalNav.jsx'
import '../styles/login.css'

// stripped-down header, no footer - just used for the staff login page
export default function MinimalLayout() {
  return (
    <div className="minimal-layout">
      <header style={{ backgroundColor: '#fff' }}>
        <MinimalNav />
      </header>

      <Outlet />
    </div>
  )
}
