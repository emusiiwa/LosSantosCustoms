import { getItem, setItem } from './storage.js'

export { DEALERSHIPS } from '../data/constants.js'

export const TYPES = ['coupe', 'fastback', 'hatchback', 'sedan', 'SUV', 'van']
export const TRANSMISSIONS = ['automatic', 'manual']

function nextId(cars) {
  return cars.reduce((max, c) => Math.max(max, c.id), 0) + 1
}

export function getAll() {
  return getItem('cars', [])
}

export function getById(id) {
  return getAll().find((c) => c.id === Number(id)) ?? null
}

// used on the dashboard's "Recents" table - newest additions first
export function latest(count) {
  return [...getAll()].sort((a, b) => b.id - a.id).slice(0, count)
}

export function add(car) {
  const cars = getAll()
  const newCar = { ...car, id: nextId(cars) }
  setItem('cars', [...cars, newCar])
  return newCar
}

export function update(id, changes) {
  const cars = getAll()
  const updated = cars.map((c) => (c.id === Number(id) ? { ...c, ...changes } : c))
  setItem('cars', updated)
  return updated.find((c) => c.id === Number(id)) ?? null
}

export function remove(id) {
  setItem(
    'cars',
    getAll().filter((c) => c.id !== Number(id)),
  )
}
