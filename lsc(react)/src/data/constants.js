// Manager unlocks the employee add/edit/delete screens, see isManager()
export const ROLES = [
  'Manager',
  'Salesman',
  'Car Detailer',
  'HR Consultant',
  'Customer Service Representative',
]

export const DEALERSHIPS = [
  'Johannesburg',
  'Cape Town',
  'Pretoria',
  'Durban',
  'Port Elizabeth',
  'East London',
  'Polokwane',
]

// Office hours: 08:00 to 16:30 in 30-minute slots (last slot starts at 16:30,
// giving a 30-minute test drive that wraps up by 17:00 closing).
export const TIME_SLOTS = Array.from({ length: 18 }, (_, i) => {
  const totalMinutes = 8 * 60 + i * 30
  const hours = String(Math.floor(totalMinutes / 60)).padStart(2, '0')
  const minutes = String(totalMinutes % 60).padStart(2, '0')
  return `${hours}:${minutes}`
})
