import { Routes, Route } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout.jsx'
import MinimalLayout from './layouts/MinimalLayout.jsx'
import StaffLayout from './layouts/StaffLayout.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import { RequireStaffAuth, RequireManager } from './components/ProtectedRoute.jsx'

import Home from './pages/public/Home.jsx'
import Cars from './pages/public/Cars.jsx'
import Team from './pages/public/Team.jsx'

import StaffLogin from './pages/staff/StaffLogin.jsx'
import Dashboard from './pages/staff/Dashboard.jsx'
import Employees from './pages/staff/Employees.jsx'
import AddEmployee from './pages/staff/AddEmployee.jsx'
import EmployeeDetails from './pages/staff/EmployeeDetails.jsx'
import EditEmployee from './pages/staff/EditEmployee.jsx'
import Garage from './pages/staff/Garage.jsx'
import AddCar from './pages/staff/AddCar.jsx'
import CarDetails from './pages/staff/CarDetails.jsx'
import AllBookings from './pages/staff/AllBookings.jsx'

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<Team />} />
        <Route path="/cars" element={<Cars />} />
      </Route>

      <Route element={<MinimalLayout />}>
        <Route path="/staff/login" element={<StaffLogin />} />
      </Route>

      <Route element={<RequireStaffAuth />}>
        <Route element={<DashboardLayout />}>
          <Route path="/staff/dashboard" element={<Dashboard />} />
        </Route>

        <Route element={<StaffLayout />}>
          <Route path="/staff/employees" element={<Employees />} />
          <Route path="/staff/employees/:id" element={<EmployeeDetails />} />
          <Route path="/staff/garage" element={<Garage />} />
          <Route path="/staff/garage/add" element={<AddCar />} />
          <Route path="/staff/garage/:id" element={<CarDetails />} />
          <Route path="/staff/bookings" element={<AllBookings />} />

          {/* only managers get to add/edit employees */}
          <Route element={<RequireManager />}>
            <Route path="/staff/employees/add" element={<AddEmployee />} />
            <Route path="/staff/employees/:id/edit" element={<EditEmployee />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}
