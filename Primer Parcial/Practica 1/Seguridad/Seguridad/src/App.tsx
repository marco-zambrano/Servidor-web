"use client"

import type React from "react"
import { useState } from "react"
import "./App.css"

interface Employee {
  id: number
  name: string
  position: string
  phone: string
  active: boolean
  shift: string
}

interface Vehicle {
  id: number
  plate: string
  model: string
  year: number
  active: boolean
  assignedTo: string
}

function App() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "employees" | "vehicles">("dashboard")
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 1, name: "Juan Pérez", position: "Supervisor", phone: "555-0101", active: true, shift: "Mañana" },
    { id: 2, name: "María García", position: "Guardia", phone: "555-0102", active: true, shift: "Tarde" },
    { id: 3, name: "Carlos López", position: "Guardia", phone: "555-0103", active: false, shift: "Noche" },
  ])

  const [vehicles, setVehicles] = useState<Vehicle[]>([
    { id: 1, plate: "ABC-123", model: "Toyota Hilux", year: 2022, active: true, assignedTo: "Juan Pérez" },
    { id: 2, plate: "DEF-456", model: "Ford Ranger", year: 2021, active: true, assignedTo: "María García" },
    { id: 3, plate: "GHI-789", model: "Chevrolet S10", year: 2020, active: false, assignedTo: "Sin asignar" },
  ])

  const [showEmployeeForm, setShowEmployeeForm] = useState(false)
  const [showVehicleForm, setShowVehicleForm] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null)

  const activeEmployees = employees.filter((emp) => emp.active).length
  const activeVehicles = vehicles.filter((veh) => veh.active).length

  const handleAddEmployee = (employee: Omit<Employee, "id">) => {
    const newEmployee = { ...employee, id: Date.now() }
    setEmployees([...employees, newEmployee])
    setShowEmployeeForm(false)
  }

  const handleEditEmployee = (employee: Employee) => {
    setEmployees(employees.map((emp) => (emp.id === employee.id ? employee : emp)))
    setEditingEmployee(null)
  }

  const handleDeleteEmployee = (id: number) => {
    setEmployees(employees.filter((emp) => emp.id !== id))
  }

  const handleAddVehicle = (vehicle: Omit<Vehicle, "id">) => {
    const newVehicle = { ...vehicle, id: Date.now() }
    setVehicles([...vehicles, newVehicle])
    setShowVehicleForm(false)
  }

  const handleEditVehicle = (vehicle: Vehicle) => {
    setVehicles(vehicles.map((veh) => (veh.id === vehicle.id ? vehicle : veh)))
    setEditingVehicle(null)
  }

  const handleDeleteVehicle = (id: number) => {
    setVehicles(vehicles.filter((veh) => veh.id !== id))
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Sistema de Gestión de Seguridad</h1>
        <nav className="nav">
          <button
            className={`nav-button ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`nav-button ${activeTab === "employees" ? "active" : ""}`}
            onClick={() => setActiveTab("employees")}
          >
            Empleados
          </button>
          <button
            className={`nav-button ${activeTab === "vehicles" ? "active" : ""}`}
            onClick={() => setActiveTab("vehicles")}
          >
            Vehículos
          </button>
        </nav>
      </header>

      <main className="main">
        {activeTab === "dashboard" && (
          <div className="dashboard">
            <h2>Panel de Control</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Empleados Activos</h3>
                <div className="stat-number" style={{ color: "#1f2937" }}>
                  {activeEmployees}
                </div>
                <div className="stat-total">de {employees.length} total</div>
              </div>
              <div className="stat-card">
                <h3>Vehículos Activos</h3>
                <div className="stat-number" style={{ color: "#1f2937" }}>
                  {activeVehicles}
                </div>
                <div className="stat-total">de {vehicles.length} total</div>
              </div>
              <div className="stat-card">
                <h3>Turnos Cubiertos</h3>
                <div className="stat-number" style={{ color: "#1f2937" }}>
                  3
                </div>
                <div className="stat-total">Mañana, Tarde, Noche</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "employees" && (
          <div className="employees">
            <div className="section-header">
              <h2>Gestión de Empleados</h2>
              <button className="btn btn-primary" onClick={() => setShowEmployeeForm(true)}>
                Agregar Empleado
              </button>
            </div>

            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Posición</th>
                    <th>Teléfono</th>
                    <th>Turno</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.id}>
                      <td>{employee.name}</td>
                      <td>{employee.position}</td>
                      <td>{employee.phone}</td>
                      <td>{employee.shift}</td>
                      <td>
                        <span className={`badge ${employee.active ? "active" : "inactive"}`}>
                          {employee.active ? "Activo" : "Inactivo"}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-small" onClick={() => setEditingEmployee(employee)}>
                          Editar
                        </button>
                        <button className="btn btn-small btn-danger" onClick={() => handleDeleteEmployee(employee.id)}>
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "vehicles" && (
          <div className="vehicles">
            <div className="section-header">
              <h2>Gestión de Vehículos</h2>
              <button className="btn btn-primary" onClick={() => setShowVehicleForm(true)}>
                Agregar Vehículo
              </button>
            </div>

            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Placa</th>
                    <th>Modelo</th>
                    <th>Año</th>
                    <th>Asignado a</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map((vehicle) => (
                    <tr key={vehicle.id}>
                      <td>{vehicle.plate}</td>
                      <td>{vehicle.model}</td>
                      <td>{vehicle.year}</td>
                      <td>{vehicle.assignedTo}</td>
                      <td>
                        <span className={`badge ${vehicle.active ? "active" : "inactive"}`}>
                          {vehicle.active ? "Activo" : "Inactivo"}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-small" onClick={() => setEditingVehicle(vehicle)}>
                          Editar
                        </button>
                        <button className="btn btn-small btn-danger" onClick={() => handleDeleteVehicle(vehicle.id)}>
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Formularios modales */}
      {(showEmployeeForm || editingEmployee) && (
        <EmployeeForm
          employee={editingEmployee}
          onSave={editingEmployee ? handleEditEmployee : handleAddEmployee}
          onCancel={() => {
            setShowEmployeeForm(false)
            setEditingEmployee(null)
          }}
        />
      )}

      {(showVehicleForm || editingVehicle) && (
        <VehicleForm
          vehicle={editingVehicle}
          onSave={editingVehicle ? handleEditVehicle : handleAddVehicle}
          onCancel={() => {
            setShowVehicleForm(false)
            setEditingVehicle(null)
          }}
        />
      )}
    </div>
  )
}

// Componente para formulario de empleados
function EmployeeForm({
  employee,
  onSave,
  onCancel,
}: {
  employee?: Employee | null
  onSave: (employee: Employee | Omit<Employee, "id">) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    name: employee?.name || "",
    position: employee?.position || "",
    phone: employee?.phone || "",
    shift: employee?.shift || "Mañana",
    active: employee?.active ?? true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (employee) {
      onSave({ ...employee, ...formData })
    } else {
      onSave(formData)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{employee ? "Editar Empleado" : "Agregar Empleado"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Posición:</label>
            <select
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              required
            >
              <option value="">Seleccionar...</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Guardia">Guardia</option>
              <option value="Vigilante">Vigilante</option>
            </select>
          </div>
          <div className="form-group">
            <label>Teléfono:</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Turno:</label>
            <select
              value={formData.shift}
              onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
              required
            >
              <option value="Mañana">Mañana</option>
              <option value="Tarde">Tarde</option>
              <option value="Noche">Noche</option>
            </select>
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              />
              Activo
            </label>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {employee ? "Actualizar" : "Agregar"}
            </button>
            <button type="button" className="btn" onClick={onCancel}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Componente para formulario de vehículos
function VehicleForm({
  vehicle,
  onSave,
  onCancel,
}: {
  vehicle?: Vehicle | null
  onSave: (vehicle: Vehicle | Omit<Vehicle, "id">) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    plate: vehicle?.plate || "",
    model: vehicle?.model || "",
    year: vehicle?.year || new Date().getFullYear(),
    assignedTo: vehicle?.assignedTo || "",
    active: vehicle?.active ?? true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (vehicle) {
      onSave({ ...vehicle, ...formData })
    } else {
      onSave(formData)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{vehicle ? "Editar Vehículo" : "Agregar Vehículo"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Placa:</label>
            <input
              type="text"
              value={formData.plate}
              onChange={(e) => setFormData({ ...formData, plate: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Modelo:</label>
            <input
              type="text"
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Año:</label>
            <input
              type="number"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: Number.parseInt(e.target.value) })}
              min="1990"
              max={new Date().getFullYear() + 1}
              required
            />
          </div>
          <div className="form-group">
            <label>Asignado a:</label>
            <input
              type="text"
              value={formData.assignedTo}
              onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              />
              Activo
            </label>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {vehicle ? "Actualizar" : "Agregar"}
            </button>
            <button type="button" className="btn" onClick={onCancel}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App
