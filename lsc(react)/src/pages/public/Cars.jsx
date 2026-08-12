import { useEffect, useMemo, useState } from 'react'
import * as carsService from '../../services/carsService.js'
import * as bookingsService from '../../services/bookingsService.js'
import { resolveCarImage } from '../../data/carImages.js'
import { TIME_SLOTS } from '../../data/constants.js'
import Modal from '../../components/Modal.jsx'
import Pagination from '../../components/Pagination.jsx'

const EMPTY_FORM = { name: '', phone: '', email: '' }
const PAGE_SIZE = 10

// time slots for a given car/date minus whatever's already booked
function availableSlotsFor(carId, date) {
  if (!date) return TIME_SLOTS
  const taken = bookingsService.getBookedTimes(carId, date)
  return TIME_SLOTS.filter((slot) => !taken.includes(slot))
}

export default function Cars() {
  const [search, setSearch] = useState('')
  const [cars] = useState(() => carsService.getAll())
  const [bookingDates, setBookingDates] = useState({})
  const [bookingTimes, setBookingTimes] = useState({})
  const [bookingTarget, setBookingTarget] = useState(null)
  const [confirmation, setConfirmation] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [formError, setFormError] = useState('')
  const [page, setPage] = useState(1)

  const visibleCars = useMemo(() => {
    const sorted = [...cars].sort((a, b) => a.make.localeCompare(b.make))
    if (!search) return sorted
    const term = search.toLowerCase()
    return sorted.filter((c) => c.make.toLowerCase().includes(term) || c.model.toLowerCase().includes(term))
  }, [cars, search])

  useEffect(() => {
    setPage(1)
  }, [search])

  const totalPages = Math.max(1, Math.ceil(visibleCars.length / PAGE_SIZE))
  const pageCars = visibleCars.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function handleDateChange(car, date) {
    setBookingDates((d) => ({ ...d, [car.id]: date }))
    // The available time slots depend on the date, so a previously chosen
    // time may no longer be valid - make the customer pick again.
    setBookingTimes((t) => ({ ...t, [car.id]: '' }))
  }

  function openBookingModal(car) {
    const date = bookingDates[car.id]
    const time = bookingTimes[car.id]
    if (!date || !time) return
    setForm(EMPTY_FORM)
    setFormError('')
    setBookingTarget({ car, date, time })
  }

  function handleSubmitBooking(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) {
      setFormError('Name and phone number are required.')
      return
    }
    const { car, date, time } = bookingTarget
    // re-check in case someone else grabbed the slot while the modal was open
    const stillFree = availableSlotsFor(car.id, date).includes(time)
    if (!stillFree) {
      setFormError('Sorry, that time slot was just booked. Please pick another.')
      return
    }
    bookingsService.create({
      customer: form.name.trim(),
      contact: form.phone.trim(),
      car: `${car.make} ${car.model}`,
      carId: car.id,
      date,
      time,
    })
    setBookingTarget(null)
    setConfirmation({ car, date, time, contact: form.phone.trim() })
  }

  return (
    <section className="cars-table">
      <br />
      <br />
      <br />
      <br />

      <div className="search-bar">
        <div className="search-field">
          <i className="bx bx-search" />
          <input
            type="text"
            placeholder="Enter car make or model"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="table-card">
        {visibleCars.length === 0 ? (
          <p className="table-empty">No cars match your search.</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Car Picture</th>
                <th>Car Make</th>
                <th>Model</th>
                <th>Year Manufactured</th>
                <th>Price</th>
                <th>Dealership</th>
                <th>Book test drive</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pageCars.map((car) => {
                const date = bookingDates[car.id] ?? ''
                const time = bookingTimes[car.id] ?? ''
                const slots = availableSlotsFor(car.id, date)
                return (
                  <tr key={car.id}>
                    <td>
                      <img src={resolveCarImage(car.image)} alt={`${car.make} ${car.model}`} />
                    </td>
                    <td>{car.make}</td>
                    <td>{car.model}</td>
                    <td>{car.manufactureYear}</td>
                    <td>${car.price}</td>
                    <td>{car.dealership}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                        <input
                          type="date"
                          value={date}
                          onChange={(e) => handleDateChange(car, e.target.value)}
                        />
                        <select
                          value={time}
                          disabled={!date}
                          onChange={(e) =>
                            setBookingTimes((t) => ({ ...t, [car.id]: e.target.value }))
                          }
                        >
                          <option value="">
                            {date ? 'Select time' : 'Pick a date first'}
                          </option>
                          {slots.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="table-action table-action--primary"
                        disabled={!date || !time}
                        onClick={() => openBookingModal(car)}
                      >
                        Book test drive
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      {bookingTarget && (
        <Modal title="Book a Test Drive" onClose={() => setBookingTarget(null)}>
          <p style={{ marginBottom: '1rem', color: '#818181' }}>
            {bookingTarget.car.make} {bookingTarget.car.model} - {bookingTarget.date} at{' '}
            {bookingTarget.time}
          </p>

          <form onSubmit={handleSubmitBooking}>
            <div className="modal-field">
              <label htmlFor="booking-name">Name</label>
              <input
                type="text"
                id="booking-name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
            </div>

            <div className="modal-field">
              <label htmlFor="booking-phone">Phone</label>
              <input
                type="tel"
                id="booking-phone"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              />
            </div>

            <div className="modal-field">
              <label htmlFor="booking-email">Email (optional)</label>
              <input
                type="email"
                id="booking-email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              />
            </div>

            {formError && <p style={{ color: '#d90429', fontSize: '0.85rem' }}>{formError}</p>}

            <div className="modal-actions">
              <button
                type="button"
                className="table-action"
                onClick={() => setBookingTarget(null)}
              >
                Cancel
              </button>
              <button type="submit" className="table-action table-action--primary">
                Confirm Booking
              </button>
            </div>
          </form>
        </Modal>
      )}

      {confirmation && (
        <Modal title="You're Booked In!" onClose={() => setConfirmation(null)}>
          <p style={{ color: '#020102' }}>
            Test drive for the <strong>{confirmation.car.make} {confirmation.car.model}</strong>{' '}
            is set for <strong>{confirmation.date}</strong> at{' '}
            <strong>{confirmation.time}</strong>. We'll be in touch at{' '}
            <strong>{confirmation.contact}</strong> to confirm the details.
          </p>

          <div className="modal-actions">
            <button
              type="button"
              className="table-action table-action--primary"
              onClick={() => setConfirmation(null)}
            >
              Done
            </button>
          </div>
        </Modal>
      )}
    </section>
  )
}
