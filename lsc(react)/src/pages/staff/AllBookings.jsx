import { useEffect, useMemo, useState } from 'react'
import * as bookingsService from '../../services/bookingsService.js'
import * as carsService from '../../services/carsService.js'
import { DEALERSHIPS } from '../../data/constants.js'
import StatusBadge from '../../components/StatusBadge.jsx'
import Pagination from '../../components/Pagination.jsx'

const STATUSES = ['pending', 'completed', 'cancelled']
const PAGE_SIZE = 10

export default function AllBookings() {
  const [version, setVersion] = useState(0) // bumped after a status change to force bookings to re-read from storage
  const [statusFilter, setStatusFilter] = useState('all')
  const [dealershipFilter, setDealershipFilter] = useState('all')
  const [page, setPage] = useState(1)

  const cars = carsService.getAll()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const bookings = useMemo(() => bookingsService.getAll(), [version])

  const rows = useMemo(() => {
    return bookings
      .map((booking) => ({ booking, car: cars.find((c) => c.id === booking.carId) }))
      .filter(({ booking }) => statusFilter === 'all' || booking.status === statusFilter)
      .filter(({ car }) => dealershipFilter === 'all' || car?.dealership === dealershipFilter)
  }, [bookings, cars, statusFilter, dealershipFilter])

  useEffect(() => {
    setPage(1)
  }, [statusFilter, dealershipFilter])

  const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE))
  const pageRows = rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function setStatus(id, status) {
    bookingsService.updateStatus(id, status)
    setVersion((v) => v + 1) // triggers the useMemo above to re-run
  }

  return (
    <section className="cars-table">
      <br />

      <h1>
        <strong>Test Drive Bookings</strong>
      </h1>

      <div className="search-bar">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s} style={{ textTransform: 'capitalize' }}>
              {s[0].toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>

        <select value={dealershipFilter} onChange={(e) => setDealershipFilter(e.target.value)}>
          <option value="all">All Dealerships</option>
          {DEALERSHIPS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div className="table-card">
        {rows.length === 0 ? (
          <p className="table-empty">No bookings match these filters.</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Booking Number</th>
                <th>Customer Name</th>
                <th>Contact</th>
                <th>Car Make</th>
                <th>Test Date</th>
                <th>Time</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map(({ booking, car }) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.customer}</td>
                  <td>{booking.contact}</td>
                  <td>{booking.car}</td>
                  <td>{booking.date}</td>
                  <td>{booking.time}</td>
                  <td>
                    <StatusBadge status={booking.status} />
                  </td>
                  <td>
                    {booking.status === 'pending' ? (
                      <>
                        <button
                          type="button"
                          className="table-action table-action--success"
                          onClick={() => setStatus(booking.id, 'completed')}
                        >
                          Mark Completed
                        </button>
                        <button
                          type="button"
                          className="table-action table-action--danger"
                          onClick={() => setStatus(booking.id, 'cancelled')}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        className="table-action"
                        onClick={() => setStatus(booking.id, 'pending')}
                      >
                        Reopen
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </section>
  )
}
