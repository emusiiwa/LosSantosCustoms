import { Link } from 'react-router-dom'

export default function MinimalNav() {
  return (
    <nav>
      <Link to="/" className="logo">
        Los <span>Santos</span> Customs
      </Link>

      <ul className="navbar">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/cars">Cars</Link>
        </li>
        <li>
          <Link to="/team">About</Link>
        </li>
      </ul>
    </nav>
  )
}
