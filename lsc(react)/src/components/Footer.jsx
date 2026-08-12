import { Link } from 'react-router-dom'
import Copyright from './Copyright.jsx'
import { resetToSeed } from '../services/seedLoader.js'

// wipes whatever's in localStorage and reloads the seed data fresh
function handleResetDemoData() {
  const confirmed = window.confirm(
    'Reset all demo data (cars, employees, customers, bookings) back to the defaults? This clears anything you\'ve added or changed in this browser.',
  )
  if (!confirmed) return
  resetToSeed()
  window.location.href = '/'
}

export default function Footer() {
  return (
    <>
      <footer>
        <div className="footer-container container">
          <div className="footer-box">
            <Link to="/" className="logo">
              Los <span>Santos</span> Customs
            </Link>
            <div className="social-media">
              <a href="https://www.facebook.com/">
                <i className="bx bxl-facebook" />
              </a>
              <a href="https://twitter.com/?lang=en">
                <i className="bx bxl-twitter" />
              </a>
              <a href="#">
                <i className="bx bxl-google" />
              </a>
              <a href="https://www.instagram.com/">
                <i className="bx bxl-instagram" />
              </a>
              <a href="#">
                <i className="bx bxl-youtube" />
              </a>
            </div>
          </div>

          <div className="footer-box">
            <h3>Page</h3>
            <Link to="/">Home</Link>
            <Link to="/cars">Cars</Link>
            <Link to="/team">About</Link>
            <a href="/#blog">Blog</a>
            <a href="#">Dealerships</a>
          </div>

          <div className="footer-box">
            <h3>Support</h3>
            <a href="#">Advisories</a>
            <a href="#">Help</a>
            <a href="#">Find Dealership</a>
            <Link to="/staff/login">Staff Login</Link>
            <a href="#" onClick={handleResetDemoData}>
              Reset Demo Data
            </a>
          </div>

          <div className="footer-box">
            <h3>Contact Us</h3>
            <p>Casey Chuma: 068 099 3179</p>
            <p>Roland Chuma: 061 585 0984</p>
            <p>Emmanuel Musiiwa: 078 994 2877</p>
          </div>
        </div>
      </footer>

      <Copyright />
    </>
  )
}
