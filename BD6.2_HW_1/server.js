const express = require("express")
const app = express()

const port = 3000

app.use(express.json())

const employees = [
  { id: 1, name: "John Doe", position: "Software Engineer" },
  { id: 2, name: "Jane Smith", position: "Product Manager" },
  { id: 3, name: "Sam Johnson", position: "Designer" },
]

const getEmployees = () => employees

const getEmployeeById = (id) => {
  return employees.find((e) => e.id === +id)
}

const addEmployee = (employee) => {
  const newEmployee = {
    id: employees.length,
    ...employee,
  }
  employees.push(newEmployee)
  return newEmployee
}

app.get("/", (req, res) => {
  res.send("server is on!")
})

app.get("/movies", (req, res) => {
  const employees = getEmployees()
  res.status(200).json(employees)
})

app.get("/employees/details/:eId", (req, res) => {
  const employee = getEmployeeById(req.params.eId)
  if (!employee) {
    return res.status(404).json({
      message: "employee not found",
    })
  }
  res.status(200).json(employee)
})

app.post("/employees/new", (req, res) => {
  const newEmployee = addEmployee(req.body)
  res.status(200).json(newEmployee)
})

module.exports = {
  app,
  getEmployees,
  getEmployeeById,
  addEmployee,
}
