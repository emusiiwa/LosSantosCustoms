import { Outlet } from 'react-router-dom'
import PublicNav from '../components/nav/PublicNav.jsx'
import Footer from '../components/Footer.jsx'
import useHeaderShadow from '../hooks/useHeaderShadow.js'
import '../styles/stylesheet.css'

// shared header/footer wrapper for the public-facing pages (home, cars, team)
export default function PublicLayout() {
  const headerRef = useHeaderShadow()

  return (
    <>
      <header ref={headerRef} style={{ backgroundColor: '#fff' }}>
        <PublicNav />
      </header>

      <Outlet />

      <Footer />
    </>
  )
}
