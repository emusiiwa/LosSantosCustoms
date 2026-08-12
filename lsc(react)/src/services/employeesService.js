import { getItem, setItem } from './storage.js'

export { ROLES, DEALERSHIPS } from '../data/constants.js'

function nextId(employees) {
  return employees.reduce((max, e) => Math.max(max, e.id), 0) + 1
}

export function getAll() {
  return getItem('employees', [])
}

export function getById(id) {
  return getAll().find((e) => e.id === Number(id)) ?? null
}

export function add({ firstName, lastName, email, phone, role, dealership, password }) {
  const employees = getAll()
  const employee = {
    id: nextId(employees),
    firstName,
    lastName,
    email,
    phone,
    role,
    dealership,
    password,
  }
  setItem('employees', [...employees, employee])
  return employee
}

export function update(id, changes) {
  const employees = getAll()
  const updated = employees.map((e) => (e.id === Number(id) ? { ...e, ...changes } : e))
  setItem('employees', updated)
  return updated.find((e) => e.id === Number(id)) ?? null
}

export function remove(id) {
  setItem(
    'employees',
    getAll().filter((e) => e.id !== Number(id)),
  )
}

// only managers can add/edit/delete other employees
export function isManager(employee) {
  return employee?.role === 'Manager'
}

export function login(email, password) {
  const employee = getAll().find((e) => e.email.toLowerCase() === email.toLowerCase())
  if (!employee) {
    throw new Error('Incorrect email')
  }
  if (employee.password !== password) {
    throw new Error('Incorrect password')
  }
  return employee
}
