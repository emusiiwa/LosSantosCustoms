import { createContext, useContext, useEffect, useState } from 'react'

const THEME_KEY = 'lsc:dark-mode'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  // remembers dark mode across refreshes/tabs
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem(THEME_KEY) === 'true')

  useEffect(() => {
    localStorage.setItem(THEME_KEY, String(darkMode))
  }, [darkMode])

  function toggleDarkMode() {
    setDarkMode((current) => !current)
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>{children}</ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
  return ctx
}
