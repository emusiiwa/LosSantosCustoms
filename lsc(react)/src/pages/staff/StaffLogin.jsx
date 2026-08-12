import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PasswordField from '../../components/PasswordField.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import * as employeesService from '../../services/employeesService.js'

export default function StaffLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [usernameErr, setUsernameErr] = useState('')
  const [passwordErr, setPasswordErr] = useState('')
  const [formError, setFormError] = useState('')
  const auth = useAuth()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    setUsernameErr('')
    setPasswordErr('')
    setFormError('')

    let missing = false
    if (!email) {
      setUsernameErr('UserName is required')
      missing = true
    }
    if (!password) {
      setPasswordErr('Password is required')
      missing = true
    }
    if (missing) return

    try {
      // employeesService.login throws on bad email/password - caught below and shown to the user
      const employee = employeesService.login(email, password)
      auth.login('staff', employee)
      navigate('/staff/dashboard')
    } catch (err) {
      setFormError(err.message)
    }
  }

  return (
    <section className="log-in">
      <h1>Log-In</h1>
      <form onSubmit={handleSubmit}>
        <div className="user">
          <input
            type="text"
            name="username"
            id="username"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="error">{usernameErr ? `* ${usernameErr}` : ''}</span>
          <span></span>
          <label htmlFor="username">User Name:</label>
        </div>

        <PasswordField
          id="password"
          name="password"
          label="Password:"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordErr}
        />

        <div className="user-pass">Forgot Password ?</div>

        <input type="submit" value="Log-In" name="submit" />

        <div className="register">
          {formError && <p style={{ color: 'red' }}>{formError}</p>}
        </div>
      </form>
    </section>
  )
}
