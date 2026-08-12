import { Outlet } from 'react-router-dom'
import StaffTopNav from '../components/nav/StaffTopNav.jsx'
import Footer from '../components/Footer.jsx'
import useHeaderShadow from '../hooks/useHeaderShadow.js'
import '../styles/stylesheet.css'
import '../styles/forms.css'
import '../styles/tables.css'

// top-nav wrapper for the staff table pages (employees, garage, bookings)
export default function StaffLayout() {
  const headerRef = useHeaderShadow()

  return (
    <>
      <header ref={headerRef} style={{ backgroundColor: '#fff' }}>
        <StaffTopNav />
      </header>

      <br />
      <br />
      <br />
      <br />

      <Outlet />

      <Footer />
    </>
  )
}
