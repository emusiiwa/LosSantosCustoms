import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import * as employeesService from '../../services/employeesService.js'
import { DEALERSHIPS } from '../../data/constants.js'
import UndoBanner from '../../components/UndoBanner.jsx'
import Pagination from '../../components/Pagination.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

const PAGE_SIZE = 10

export default function Employees() {
  const { user } = useAuth()
  // Update/Delete columns are manager-only, everyone else just gets More Details
  const canManage = employeesService.isManager(user)
  const [search, setSearch] = useState('')
  const [dealershipFilter, setDealershipFilter] = useState('all')
  const [pendingDelete, setPendingDelete] = useState(null)
  const [page, setPage] = useState(1)
  const timeoutRef = useRef(null)

  const employees = employeesService
    .getAll()
    .filter((e) => e.id !== pendingDelete?.id)
    .filter((e) => dealershipFilter === 'all' || e.dealership === dealershipFilter)
    .filter((e) => !search || e.firstName.toLowerCase().includes(search.toLowerCase()))

  useEffect(() => {
    setPage(1)
  }, [search, dealershipFilter])

  const totalPages = Math.max(1, Math.ceil(employees.length / PAGE_SIZE))
  const pageEmployees = employees.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  // same soft-delete-with-undo pattern as Garage.jsx
  function handleDelete(employee) {
    if (pendingDelete) {
      clearTimeout(timeoutRef.current)
      employeesService.remove(pendingDelete.id)
    }
    setPendingDelete(employee)
    timeoutRef.current = setTimeout(() => {
      employeesService.remove(employee.id)
      setPendingDelete(null)
    }, 5000)
  }

  function handleUndo() {
    clearTimeout(timeoutRef.current)
    setPendingDelete(null)
  }

  return (
    <section className="cars-table">
      <h1>
        <strong>Organisation Employees</strong>
      </h1>

      <div className="search-bar">
        <div className="search-field">
          <i className="bx bx-search" />
          <input
            type="text"
            placeholder="Enter employee First Name"
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
          {employees.length} result{employees.length === 1 ? '' : 's'} found
        </p>
      )}

      <div className="table-card">
        {employees.length === 0 ? (
          <p className="table-empty">No employees match your search.</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Surname</th>
                <th>Email</th>
                <th>Position</th>
                <th>Dealership</th>
                <th></th>
                {canManage && <th></th>}
                {canManage && <th></th>}
              </tr>
            </thead>
            <tbody>
              {pageEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>{employee.role}</td>
                  <td>{employee.dealership}</td>
                  <td>
                    <Link to={`/staff/employees/${employee.id}`} className="table-action">
                      More Details
                    </Link>
                  </td>
                  {canManage && (
                    <td>
                      <Link to={`/staff/employees/${employee.id}/edit`} className="table-action">
                        Update
                      </Link>
                    </td>
                  )}
                  {canManage && (
                    <td>
                      <button
                        type="button"
                        className="table-action table-action--danger"
                        onClick={() => handleDelete(employee)}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      {pendingDelete && (
        <UndoBanner
          message={`${pendingDelete.firstName} ${pendingDelete.lastName} removed.`}
          onUndo={handleUndo}
        />
      )}
    </section>
  )
}
