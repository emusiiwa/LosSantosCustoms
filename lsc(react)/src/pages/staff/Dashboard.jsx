import { Link } from 'react-router-dom'
import * as carsService from '../../services/carsService.js'
import * as bookingsService from '../../services/bookingsService.js'
import casey from '../../assets/images/employees/casey.jpg'
import roland from '../../assets/images/employees/roland.jpg'
import manu from '../../assets/images/employees/manu.png'
import plusIcon from '../../assets/images/site/plus.png'

// hardcoded for the demo - there's no real activity tracking behind this
const TEAM_ACTIVITY = [
  { name: 'Emmanuel', image: manu, lastActive: '54 Min Ago' },
  { name: 'Roland', image: roland, lastActive: '3 Hours Ago' },
  { name: 'Casey', image: casey, lastActive: '2 Min Ago' },
]

// decorative progress ring used on the stat cards
function Circle({ colour, dashoffset = -30, dasharray = 200 }) {
  return (
    <svg>
      <circle
        cx="38"
        cy="38"
        r="36"
        style={{ stroke: colour, strokeDashoffset: dashoffset, strokeDasharray: dasharray }}
      />
    </svg>
  )
}

// dealership with the most bookings, plus what share of total bookings that is
function computeBestDealership(cars, bookings) {
  const counts = {}
  for (const booking of bookings) {
    const car = cars.find((c) => c.id === booking.carId)
    if (!car) continue
    counts[car.dealership] = (counts[car.dealership] ?? 0) + 1
  }
  const ranked = Object.entries(counts).sort((a, b) => b[1] - a[1])
  if (ranked.length === 0) return { name: 'No bookings yet', share: null }
  const [name, count] = ranked[0]
  return { name, share: Math.round((count / bookings.length) * 100) }
}

export default function Dashboard() {
  const cars = carsService.getAll()
  const bookings = bookingsService.getAll()
  const recentCars = carsService.latest(3)
  const inventoryValue = cars.reduce((sum, car) => sum + Number(car.price || 0), 0)
  const bestDealership = computeBestDealership(cars, bookings)

  return (
    <>
      <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Performance</h1>

      <div className="analyse">
        <div className="sales">
          <div className="status">
            <div className="info">
              <h3>Inventory Value</h3>
              <h1>${inventoryValue.toLocaleString('en-US')}</h1>
            </div>
            <div className="progresss">
              <Circle colour="var(--color-success)" />
              <div className="percentage">
                <p>{cars.length} vehicles</p>
              </div>
            </div>
          </div>
        </div>
        <div className="visits">
          <div className="status">
            <div className="info">
              <h3>Cars</h3>
              <h1>{cars.length}</h1>
            </div>
            <div className="progresss">
              <Circle colour="var(--color-danger)" />
              <div className="percentage">
                <p>In stock</p>
              </div>
            </div>
          </div>
        </div>
        <div className="searches">
          <div className="status">
            <div className="info">
              <h3>Best Dealership</h3>
              <h1>{bestDealership.name}</h1>
            </div>
            <div className="progresss">
              <Circle colour="var(--color-primary)" />
              <div className="percentage">
                <p>{bestDealership.share === null ? '-' : `${bestDealership.share}%`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="new-users">
        <h2>Teams Activity</h2>
        <div className="user-list">
          {TEAM_ACTIVITY.map((member) => (
            <div className="user" key={member.name}>
              <img src={member.image} alt={member.name} />
              <h2>{member.name}</h2>
              <p>Last Active: {member.lastActive}</p>
            </div>
          ))}
          <div className="user">
            <Link to="/staff/employees">
              <img src={plusIcon} alt="More" />
            </Link>
            <h2>More</h2>
            <p>New User</p>
          </div>
        </div>
      </div>

      <div className="recent-orders">
        <h2>Recents</h2>
        <table>
          <thead>
            <tr>
              <th>Car Make</th>
              <th>Model</th>
              <th>Buying Price</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {recentCars.map((car) => (
              <tr key={car.id}>
                <td>{car.make}</td>
                <td>{car.model}</td>
                <td>${car.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/staff/garage">Show All Cars</Link>
      </div>
    </>
  )
}
