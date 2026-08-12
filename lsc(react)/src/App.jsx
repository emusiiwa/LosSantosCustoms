import { useEffect } from 'react'
import { AuthProvider } from './context/AuthContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import AppRouter from './router.jsx'
import { ensureSeeded, resetToSeed } from './services/seedLoader.js'
import './styles/base.css'

function App() {
  useEffect(() => {
    ensureSeeded()
    //on click this resets the entire App, such that you star on a clean state
    window.lscResetDemoData = () => {
      resetToSeed()
      window.location.reload()
    }
  }, [])

  return (
    <AuthProvider>
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
