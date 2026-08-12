import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getById, update, TYPES, TRANSMISSIONS, DEALERSHIPS } from '../../services/carsService.js'
import { resolveCarImage } from '../../data/carImages.js'

export default function CarDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const car = getById(id)
  const [form, setForm] = useState(() => (car ? { ...car } : null))
  const [message, setMessage] = useState('')

  if (!car || !form) {
    return (
      <div className="forms-page">
        <p>Car not found.</p>
        <Link to="/staff/garage">Back to Garage</Link>
      </div>
    )
  }

  // named update_ to avoid clashing with the imported update() service call
  function update_(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  // same base64-encode approach as AddCar - replaces the image on the form, not saved until submit
  function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setForm((f) => ({ ...f, image: reader.result }))
    reader.readAsDataURL(file)
  }

  function handleSubmit(e) {
    e.preventDefault()
    update(id, { ...form, price: Number(form.price) })
    setMessage('Car details updated successfully!')
  }

  return (
    <div className="forms-page">
      <div className="main-block">
        <form onSubmit={handleSubmit}>
          <h1>Car Details</h1>

          {message && <p style={{ color: 'blue' }}>{message}</p>}

          <fieldset>
            <legend>
              <h3>Car Details</h3>
            </legend>
            <div className="account-details">
              <div>
                <label htmlFor="make">Make</label>
                <input type="text" id="make" value={form.make} onChange={update_('make')} />
              </div>
              <div>
                <label htmlFor="model">Model</label>
                <input type="text" id="model" value={form.model} onChange={update_('model')} />
              </div>
              <div>
                <label htmlFor="year">Manufacture Year and Date</label>
                <input
                  type="date"
                  id="year"
                  value={form.manufactureYear}
                  onChange={update_('manufactureYear')}
                />
              </div>
              <div>
                <label htmlFor="pprice">Purchase Price (USD)</label>
                <input type="number" id="pprice" value={form.price} onChange={update_('price')} />
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
                <img
                  src={resolveCarImage(form.image)}
                  alt={`${form.make} ${form.model}`}
                  style={{ width: '125px', height: '125px', objectFit: 'cover', marginBottom: '8px' }}
                />
                <input type="file" id="picture" accept="image/*" onChange={handleFile} />
              </div>
              <div>
                <label htmlFor="type">Type</label>
                <select id="type" value={form.type} onChange={update_('type')}>
                  {TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="engine">Engine Number</label>
                <input type="text" id="engine" value={form.engineNumber} onChange={update_('engineNumber')} />
              </div>
              <div>
                <label htmlFor="transmission">Transmission</label>
                <select id="transmission" value={form.transmission} onChange={update_('transmission')}>
                  {TRANSMISSIONS.map((t) => (
                    <option key={t} value={t}>
                      {t.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="colour">Color</label>
                <input type="text" id="colour" value={form.colour} onChange={update_('colour')} />
              </div>
              <div>
                <label htmlFor="dealership">Dealership</label>
                <select id="dealership" value={form.dealership} onChange={update_('dealership')}>
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
                  value={form.description}
                  onChange={update_('description')}
                />
              </div>
            </div>
          </fieldset>

          <div className="form-actions">
            <Link to="/staff/garage" className="form-button">
              Back to Garage
            </Link>
            <input type="submit" value="Save Changes" className="form-button form-button--primary" />
          </div>
        </form>
      </div>
    </div>
  )
}
