import { useParams, Link } from 'react-router-dom'
import { getById } from '../../services/employeesService.js'

export default function EmployeeDetails() {
  const { id } = useParams()
  const employee = getById(id)

  if (!employee) {
    return (
      <div className="forms-page">
        <p>Employee not found.</p>
        <Link to="/staff/employees">Back to Users</Link>
      </div>
    )
  }

  return (
    <div className="forms-page">
      <div className="main-block">
        <form onSubmit={(e) => e.preventDefault()}>
          <h1>Employee Details</h1>

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
                <input type="email" id="mail" value={employee.email} disabled />
              </div>
              <div>
                <label htmlFor="phone">Phone</label>
                <input type="text" id="phone" value={employee.phone} disabled />
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
                <input type="text" id="role" value={employee.role} disabled />
              </div>
              <div>
                <label htmlFor="dealership">Dealership</label>
                <input type="text" id="dealership" value={employee.dealership} disabled />
              </div>
            </div>
          </fieldset>

          <div className="form-actions">
            <Link to="/staff/employees" className="form-button">
              Back to Users
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
