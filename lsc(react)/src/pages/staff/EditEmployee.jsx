import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getById, update, ROLES, DEALERSHIPS } from '../../services/employeesService.js'

export default function EditEmployee() {
  const { id } = useParams()
  const navigate = useNavigate()
  const employee = getById(id)
  // name fields are shown disabled below - only contact/office details are editable here
  const [form, setForm] = useState(() =>
    employee
      ? { email: employee.email, phone: employee.phone, role: employee.role, dealership: employee.dealership }
      : null,
  )
  const [message, setMessage] = useState('')

  if (!employee || !form) {
    return (
      <div className="forms-page">
        <p>Employee not found.</p>
        <Link to="/staff/employees">Back to Users</Link>
      </div>
    )
  }

  function updateField(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    update(id, form)
    setMessage('Employee details updated successfully!')
    setTimeout(() => navigate(`/staff/employees/${id}`), 900)
  }

  return (
    <div className="forms-page">
      <div className="main-block">
        <form onSubmit={handleSubmit}>
          <h1>Update Details</h1>

          {message && <p style={{ color: 'blue' }}>{message}</p>}

          <fieldset>
            <legend>
              <h3>Personal Details</h3>
            </legend>
            <div className="account-details">
              <div>
                <label htmlFor="fname">First Name</label>
                <input type="text" id="fname" value={employee.firstName} disabled />
              </div>
              <div>
                <label htmlFor="lname">Last Name</label>
                <input type="text" id="lname" value={employee.lastName} disabled />
              </div>
              <div>
                <label htmlFor="mail">Email</label>
                <input type="email" id="mail" value={form.email} onChange={updateField('email')} />
              </div>
              <div>
                <label htmlFor="phone">Phone</label>
                <input type="text" id="phone" value={form.phone} onChange={updateField('phone')} />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h3>Office Details</h3>
            </legend>
            <div className="account-details">
              <div>
                <label htmlFor="role">Role</label>
                <select id="role" value={form.role} onChange={updateField('role')}>
                  {ROLES.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="dealership">Dealership</label>
                <select id="dealership" value={form.dealership} onChange={updateField('dealership')}>
                  {DEALERSHIPS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h3>Terms and Conditions</h3>
            </legend>
            <div className="checkbox">
              <input type="checkbox" name="checkbox" />
              <span>
                I accept the <a href="#">Privacy Policy for LSC.</a>
              </span>
            </div>
          </fieldset>

          <div className="form-actions">
            <Link to="/staff/employees" className="form-button">
              Cancel
            </Link>
            <input type="submit" value="Update Details" className="form-button form-button--primary" />
          </div>
        </form>
      </div>
    </div>
  )
}
