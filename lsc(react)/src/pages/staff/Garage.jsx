import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import * as carsService from '../../services/carsService.js'
import { DEALERSHIPS } from '../../data/constants.js'
import { resolveCarImage } from '../../data/carImages.js'
import UndoBanner from '../../components/UndoBanner.jsx'
import Pagination from '../../components/Pagination.jsx'

const PAGE_SIZE = 10

export default function Garage() {
  const [search, setSearch] = useState('')
  const [dealershipFilter, setDealershipFilter] = useState('all')
  const [pendingDelete, setPendingDelete] = useState(null)
  const [page, setPage] = useState(1)
  const timeoutRef = useRef(null)

  const cars = [...carsService.getAll()]
    .sort((a, b) => a.make.localeCompare(b.make))
    .filter((c) => c.id !== pendingDelete?.id)
    .filter((c) => dealershipFilter === 'all' || c.dealership === dealershipFilter)
    .filter((c) => {
      if (!search) return true
      const term = search.toLowerCase()
      return c.make.toLowerCase().includes(term) || c.model.toLowerCase().includes(term)
    })

  useEffect(() => {
    setPage(1)
  }, [search, dealershipFilter])

  const totalPages = Math.max(1, Math.ceil(cars.length / PAGE_SIZE))
  const pageCars = cars.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  // soft delete: the row disappears immediately but isn't removed from storage for 5s,
  // giving the undo banner a window to cancel it
  function handleDelete(car) {
    if (pendingDelete) {
      clearTimeout(timeoutRef.current)
      carsService.remove(pendingDelete.id)
    }
    setPendingDelete(car)
    timeoutRef.current = setTimeout(() => {
      carsService.remove(car.id)
      setPendingDelete(null)
    }, 5000)
  }

  function handleUndo() {
    clearTimeout(timeoutRef.current)
    setPendingDelete(null)
  }

  return (
    <section className="cars-table">
      <h1>Garage Inventory</h1>

      <div className="search-bar">
        <div className="search-field">
          <i className="bx bx-search" />
          <input
            type="text"
            placeholder="Enter car make or model"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select value={dealershipFilter} onChange={(e) => setDealershipFilter(e.target.value)}>
          <option value="all">All Dealerships</option>
          {DEALERSHIPS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      {(search || dealershipFilter !== 'all') && (
        <p>
          {cars.length} result{cars.length === 1 ? '' : 's'} found
        </p>
      )}

      <div className="table-card">
        {cars.length === 0 ? (
          <p className="table-empty">No cars match your search.</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Car Picture</th>
                <th>Car Make</th>
                <th>Model</th>
                <th>Year Manufactured</th>
                <th>Price</th>
                <th>Dealership</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pageCars.map((car) => (
                <tr key={car.id}>
                  <td>
                    <img src={resolveCarImage(car.image)} alt={`${car.make} ${car.model}`} />
                  </td>
                  <td>{car.make}</td>
                  <td>{car.model}</td>
                  <td>{car.manufactureYear}</td>
                  <td>${car.price}</td>
                  <td>{car.dealership}</td>
                  <td>
                    <Link to={`/staff/garage/${car.id}`} className="table-action">
                      More...
                    </Link>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="table-action table-action--danger"
                      onClick={() => handleDelete(car)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      {pendingDelete && (
        <UndoBanner
          message={`${pendingDelete.make} ${pendingDelete.model} removed.`}
          onUndo={handleUndo}
        />
      )}
    </section>
  )
}
