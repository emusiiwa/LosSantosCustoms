import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { add, ROLES, DEALERSHIPS } from '../../services/employeesService.js'

export default function AddEmployee() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: ROLES[0],
    dealership: DEALERSHIPS[0],
    password: '',
  })
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    add(form)
    setMessage(`The new employee ${form.firstName} ${form.lastName} was successfully added!`)
    setTimeout(() => navigate('/staff/employees'), 900)
  }

  return (
    <div className="forms-page">
      <div className="main-block">
        <form onSubmit={handleSubmit}>
          <h1>Add Employee</h1>

          {message && <p style={{ color: 'blue' }}>{message}</p>}

          <fieldset>
            <legend>
              <h3>Personal Details</h3>
            </legend>
            <div className="account-details">
              <div>
                <label htmlFor="fname">First Name</label>
                <input
                  type="text"
                  id="fname"
                  required
                  value={form.firstName}
                  onChange={update('firstName')}
                />
              </div>
              <div>
                <label htmlFor="lname">Last Name</label>
                <input
                  type="text"
                  id="lname"
                  required
                  value={form.lastName}
                  onChange={update('lastName')}
                />
              </div>
              <div>
                <label htmlFor="mail">Email</label>
                <input
                  type="email"
                  id="mail"
                  required
                  value={form.email}
                  onChange={update('email')}
                />
              </div>
              <div>
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  id="phone"
                  required
                  value={form.phone}
                  onChange={update('phone')}
                />
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
                <select id="role" value={form.role} onChange={update('role')}>
                  {ROLES.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="dealership">Dealership</label>
                <select id="dealership" value={form.dealership} onChange={update('dealership')}>
                  {DEALERSHIPS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  required
                  value={form.password}
                  onChange={update('password')}
                />
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
            <input type="submit" value="Add Employee" className="form-button form-button--primary" />
          </div>
        </form>
      </div>
    </div>
  )
}
