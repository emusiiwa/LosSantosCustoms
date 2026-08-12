import { createContext, useContext, useEffect, useState } from 'react'

const SESSION_KEY = 'lsc:session'
const SESSION_LIFETIME_MS = 30 * 60 * 1000 // auto-logout after 30 min idle

const AuthContext = createContext(null)

// pull whatever session was saved from last visit, if any
function readSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function writeSession(session) {
  if (session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  } else {
    localStorage.removeItem(SESSION_KEY)
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => readSession())

  useEffect(() => {
    writeSession(session)
  }, [session])

  function login(role, user) {
    setSession({ role, user, lastActivity: Date.now() })
  }

  function logout() {
    setSession(null)
  }

  function touch() {
    setSession((current) => (current ? { ...current, lastActivity: Date.now() } : current))
  }

  // true once the session has been idle past SESSION_LIFETIME_MS
  function isExpired() {
    if (!session) return true
    return Date.now() - session.lastActivity > SESSION_LIFETIME_MS
  }

  const value = {
    role: session?.role ?? null,
    user: session?.user ?? null,
    login,
    logout,
    touch,
    isExpired,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
