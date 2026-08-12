import { useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { isManager } from '../services/employeesService.js'

function RequireAuth({ role, redirectTo }) {
  const { role: currentRole, isExpired, logout, touch } = useAuth()
  const { pathname } = useLocation()
  const allowed = currentRole === role && !isExpired()

  useEffect(() => {
    if (allowed) {
      touch()
    } else if (currentRole === role) {
      logout()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, allowed])

  if (!allowed) {
    return <Navigate to={redirectTo} replace />
  }

  return <Outlet />
}

export function RequireStaffAuth() {
  return <RequireAuth role="staff" redirectTo="/staff/login" />
}

// guards the employee add/edit routes - non-managers get bounced back to the list
export function RequireManager() {
  const { user } = useAuth()

  if (!isManager(user)) {
    return <Navigate to="/staff/employees" replace />
  }

  return <Outlet />
}
