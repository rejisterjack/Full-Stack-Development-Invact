const express = require("express")
const { sequelize } = require("./lib")
const { department } = require("./models/department.model")
const { role } = require("./models/role.model")
const { employee } = require("./models/employee.model")
const { employeeDepartment } = require("./models/employeeDepartment.model")
const { employeeRole } = require("./models/employeeRole.model")

const app = express()
const port = 3000

app.use(express.json())

app.get("/", (req, res) => {
  res.send("server is on!")
})

app.get("/seed_db", async (req, res) => {
  await sequelize.sync({ force: true })

  const departments = await department.bulkCreate([
    { name: "Engineering" },
    { name: "Marketing" },
  ])

  const roles = await role.bulkCreate([
    { title: "Software Engineer" },
    { title: "Marketing Specialist" },
    { title: "Product Manager" },
  ])

  const employees = await employee.bulkCreate([
    { name: "Rahul Sharma", email: "rahul.sharma@example.com" },
    { name: "Priya Singh", email: "priya.singh@example.com" },
    { name: "Ankit Verma", email: "ankit.verma@example.com" },
  ])

  await employeeDepartment.create({
    employeeId: employees[0].id,
    departmentId: departments[0].id,
  })
  await employeeRole.create({
    employeeId: employees[0].id,
    roleId: roles[0].id,
  })

  await employeeDepartment.create({
    employeeId: employees[1].id,
    departmentId: departments[1].id,
  })
  await employeeRole.create({
    employeeId: employees[1].id,
    roleId: roles[1].id,
  })

  await employeeDepartment.create({
    employeeId: employees[2].id,
    departmentId: departments[0].id,
  })
  await employeeRole.create({
    employeeId: employees[2].id,
    roleId: roles[2].id,
  })

  return res.json({ message: "Database seeded!" })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
