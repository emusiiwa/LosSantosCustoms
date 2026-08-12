import { getItem, setItem } from './storage.js'
import employeesSeed from '../data/seed/employees.seed.json'
import carsSeed from '../data/seed/cars.seed.json'
import bookingsSeed from '../data/seed/bookings.seed.json'

const SEED_VERSION = 5 // bumped for the Manager role change on Casey's seed record

const COLLECTIONS = {
  employees: employeesSeed,
  cars: carsSeed,
  bookings: bookingsSeed,
}

export function ensureSeeded() {
  const currentVersion = getItem('seedVersion', 0)
  if (currentVersion === SEED_VERSION) return

  for (const [key, seed] of Object.entries(COLLECTIONS)) {
    setItem(key, seed)
  }
  setItem('seedVersion', SEED_VERSION)
}

export function resetToSeed() {
  for (const [key, seed] of Object.entries(COLLECTIONS)) {
    setItem(key, seed)
  }
  setItem('seedVersion', SEED_VERSION)
}
