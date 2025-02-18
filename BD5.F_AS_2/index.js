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

async function getEmployeeDepartments(employeeId) {
  const employeeDepartments = await employeeDepartment.findAll({
    where: { employeeId },
  })

  let departmentData
  for (let empDep of employeeDepartments) {
    departmentData = await department.findOne({
      where: { id: empDep.departmentId },
    })
  }

  return departmentData
}

async function getEmployeeRoles(employeeId) {
  const employeeRoles = await employeeRole.findAll({
    where: { employeeId },
  })

  let roleData
  for (let empRole of employeeRoles) {
    roleData = await role.findOne({
      where: { id: empRole.roleId },
    })
  }

  return roleData
}

async function getEmployeeDetails(employeeData) {
  const department = await getEmployeeDepartments(employeeData.id)
  const role = await getEmployeeRoles(employeeData.id)

  return {
    ...employeeData.dataValues,
    department,
    role,
  }
}

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

app.get("/employees", async (req, res) => {
  try {
    const employees = await employee.findAll()
    const employeeDetails = await Promise.all(
      employees.map(async (emp) => await getEmployeeDetails(emp))
    )
    res.status(200).json({ employees: employeeDetails })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get("/employees/details/:id", async (req, res) => {
  try {
    const employeeData = await employee.findOne({
      where: { id: req.params.id },
    })
    if (!employeeData) {
      return res.status(404).json({ message: "Employee not found" })
    }
    const employeeDetails = await getEmployeeDetails(employeeData)
    res.status(200).json({ employee: employeeDetails })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get("/employees/department/:departmentId", async (req, res) => {
  try {
    const employeeDepartments = await employeeDepartment.findAll({
      where: { departmentId: req.params.departmentId },
    })
    const employees = await Promise.all(
      employeeDepartments.map(async (empDep) => {
        const emp = await employee.findOne({ where: { id: empDep.employeeId } })
        return await getEmployeeDetails(emp)
      })
    )
    res.status(200).json({ employees })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get("/employees/role/:roleId", async (req, res) => {
  try {
    const employeeRoles = await employeeRole.findAll({
      where: { roleId: req.params.roleId },
    })
    const employees = await Promise.all(
      employeeRoles.map(async (empRole) => {
        const emp = await employee.findOne({
          where: { id: empRole.employeeId },
        })
        return await getEmployeeDetails(emp)
      })
    )
    res.status(200).json({ employees })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get("/employees/sort-by-name", async (req, res) => {
  try {
    const order = req.query.order || "asc"
    const employees = await employee.findAll({ order: [["name", order]] })
    const employeeDetails = await Promise.all(
      employees.map(async (emp) => await getEmployeeDetails(emp))
    )
    res.status(200).json({ employees: employeeDetails })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post("/employees/new", async (req, res) => {
  try {
    const { name, email, departmentId, roleId } = req.body
    const newEmployee = await employee.create({ name, email })
    await employeeDepartment.create({
      employeeId: newEmployee.id,
      departmentId,
    })
    await employeeRole.create({
      employeeId: newEmployee.id,
      roleId,
    })
    const employeeDetails = await getEmployeeDetails(newEmployee)
    res.status(200).json({ employee: employeeDetails })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post("/employees/update/:id", async (req, res) => {
  try {
    const employeeData = await employee.findOne({
      where: { id: req.params.id },
    })
    if (!employeeData) {
      return res.status(404).json({ message: "Employee not found" })
    }

    const { name, email, departmentId, roleId } = req.body

    if (name) employeeData.name = name
    if (email) employeeData.email = email

    await employeeData.save()

    if (departmentId) {
      await employeeDepartment.destroy({
        where: { employeeId: employeeData.id },
      })
      await employeeDepartment.create({
        employeeId: employeeData.id,
        departmentId,
      })
    }

    if (roleId) {
      await employeeRole.destroy({ where: { employeeId: employeeData.id } })
      await employeeRole.create({
        employeeId: employeeData.id,
        roleId,
      })
    }

    const employeeDetails = await getEmployeeDetails(employeeData)
    res.status(200).json({ employee: employeeDetails })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post("/employees/delete", async (req, res) => {
  try {
    const { id } = req.body
    await employee.destroy({ where: { id } })
    await employeeDepartment.destroy({ where: { employeeId: id } })
    await employeeRole.destroy({ where: { employeeId: id } })
    res
      .status(200)
      .json({ message: `Employee with ID ${id} has been deleted.` })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
