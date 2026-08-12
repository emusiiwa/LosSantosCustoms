import { useState } from 'react'
import hidePass from '../assets/images/site/hide-pass.jpg'
import showPass from '../assets/images/site/show-pass.jpg'

export default function PasswordField({ id, name, value, onChange, label, error, autoFocus }) {
  const [visible, setVisible] = useState(false) // toggled by the show/hide eye icon

  return (
    <div className="user">
      <input
        type={visible ? 'text' : 'password'}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        autoFocus={autoFocus}
      />
      <span className="error">{error ? `* ${error}` : ''}</span>
      <img
        src={visible ? showPass : hidePass}
        onClick={() => setVisible((v) => !v)}
        className="pass-icon"
        alt=""
      />
      <span></span>
      <label htmlFor={id}>{label}</label>
    </div>
  )
}
