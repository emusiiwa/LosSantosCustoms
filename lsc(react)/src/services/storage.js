// thin wrapper around localStorage - namespaces keys and handles the JSON (de)serialising
const PREFIX = 'lsc:'

export function getItem(key, fallback) {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw === null ? fallback : JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function setItem(key, value) {
  localStorage.setItem(PREFIX + key, JSON.stringify(value))
}

export function removeItem(key) {
  localStorage.removeItem(PREFIX + key)
}
