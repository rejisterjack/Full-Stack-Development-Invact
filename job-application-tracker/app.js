const express = require("express")
const { Op } = require("sequelize")
const Application = require("./models/Application.model")

const app = express()
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello, world!")
})

// try {
// } catch (error) {
//   console.error(error.message)
//   res.status(500).send("Server Error")
// }

app.post("/applications", async (req, res) => {
  try {
    const { role, company, jdUrl, appliedAt } = req.body
    if (!role || !company) {
      return res.status(400).send("Role and company are required")
    }
    const application = await Application.create({
      role: role,
      company: company,
      jdUrl: jdUrl || "",
      appliedAt: appliedAt || new Date(),
    })
    res.status(201).json(application)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Server Error")
  }
})

app.get("/applications", async (req, res) => {
  try {
    const { company, status, from, to } = req.query
    const filter = {}

    if (company) {
      filter.company = company
    }
    if (status) {
      filter.status = status
    }
    if (from || to) {
      filter.appliedAt = {}
      if (from) {
        filter.appliedAt[Op.gte] = new Date(from)
      }
      if (to) {
        filter.appliedAt[Op.lte] = new Date(to)
      }
    }

    const applications = await Application.findAll({ where: filter })
    res.status(200).json(applications)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Server Error")
  }
})

app.get("/applications/:id", async (req, res) => {
  try {
    const application = await Application.findByPk(req.params.id)
    if (!application) {
      return res.status(404).send("Application not found")
    }
    res.status(200).json(application)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Server Error")
  }
})

module.exports = app
