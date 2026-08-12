import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { add, TYPES, TRANSMISSIONS, DEALERSHIPS } from '../../services/carsService.js'

const EMPTY_FORM = {
  make: '',
  model: '',
  manufactureYear: '',
  price: '',
  type: TYPES[0],
  engineNumber: '',
  transmission: TRANSMISSIONS[0],
  colour: '',
  description: '',
  dealership: DEALERSHIPS[0],
}

export default function AddCar() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [image, setImage] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  // no file storage/backend here, so the picture just gets base64-encoded into localStorage
  function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setImage(reader.result)
    reader.readAsDataURL(file)
  }

  function handleSubmit(e) {
    e.preventDefault()
    add({ ...form, price: Number(form.price), image })
    setMessage(`The new ${form.make} ${form.model} was successfully added!`)
    setTimeout(() => navigate('/staff/garage'), 900)
  }

  return (
    <div className="forms-page">
      <div className="main-block">
        <form onSubmit={handleSubmit}>
          <h1>Add Car</h1>

          {message && <p style={{ color: 'blue' }}>{message}</p>}

          <fieldset>
            <legend>
              <h3>Car Details</h3>
            </legend>
            <div className="account-details">
              <div>
                <label htmlFor="make">Make</label>
                <input type="text" id="make" required value={form.make} onChange={update('make')} />
              </div>
              <div>
                <label htmlFor="model">Model</label>
                <input type="text" id="model" required value={form.model} onChange={update('model')} />
              </div>
              <div>
                <label htmlFor="year">Manufacture Year and Date</label>
                <input
                  type="date"
                  id="year"
                  required
                  value={form.manufactureYear}
                  onChange={update('manufactureYear')}
                />
              </div>
              <div>
                <label htmlFor="pprice">Purchase Price (USD)</label>
                <input type="number" id="pprice" required value={form.price} onChange={update('price')} />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h3>Car Specifications</h3>
            </legend>
            <div className="account-details">
              <div>
                <label htmlFor="picture">Picture</label>
                <input type="file" id="picture" accept="image/*" onChange={handleFile} />
              </div>
              <div>
                <label htmlFor="type">Type</label>
                <select id="type" value={form.type} onChange={update('type')}>
                  {TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="engine">Engine Number</label>
                <input
                  type="text"
                  id="engine"
                  required
                  value={form.engineNumber}
                  onChange={update('engineNumber')}
                />
              </div>
              <div>
                <label htmlFor="transmission">Transmission</label>
                <select id="transmission" value={form.transmission} onChange={update('transmission')}>
                  {TRANSMISSIONS.map((t) => (
                    <option key={t} value={t}>
                      {t.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="colour">Color</label>
                <input type="text" id="colour" required value={form.colour} onChange={update('colour')} />
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
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  rows="3"
                  cols="64"
                  required
                  value={form.description}
                  onChange={update('description')}
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
            <Link to="/staff/garage" className="form-button">
              Cancel
            </Link>
            <input type="submit" value="Add Car" className="form-button form-button--primary" />
          </div>
        </form>
      </div>
    </div>
  )
}
