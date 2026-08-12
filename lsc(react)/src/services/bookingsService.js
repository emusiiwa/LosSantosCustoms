import { getItem, setItem } from './storage.js'

function nextId(bookings) {
  return bookings.reduce((max, b) => Math.max(max, b.id), 0) + 1
}

// newest booking date first
export function getAll() {
  return [...getItem('bookings', [])].sort((a, b) => (a.date < b.date ? 1 : -1))
}

// used to grey out time slots that are already taken for a given car/date
export function getBookedTimes(carId, date) {
  return getAll()
    .filter((b) => b.carId === carId && b.date === date && b.status !== 'cancelled')
    .map((b) => b.time)
}

export function create({ customer, contact, car, carId, date, time }) {
  const bookings = getItem('bookings', [])
  const booking = {
    id: nextId(bookings),
    customer,
    contact,
    car,
    carId,
    date,
    time,
    status: 'pending',
  }
  setItem('bookings', [...bookings, booking])
  return booking
}

export function updateStatus(id, status) {
  const bookings = getItem('bookings', [])
  const updated = bookings.map((b) => (b.id === Number(id) ? { ...b, status } : b))
  setItem('bookings', updated)
  return updated.find((b) => b.id === Number(id)) ?? null
}
