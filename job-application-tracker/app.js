const express = require("express")
const { Op } = require("sequelize")
const Application = require("./models/Application.model")
const Interview = require("./models/Interview.model")

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

app.put("/applications/:id", async (req, res) => {
  try {
    const application = await Application.findByPk(req.params.id)
    if (!application) {
      return res.status(404).json({ error: "Application not found." })
    }

    const validStatuses = [
      "no reply",
      "rejected",
      "interview",
      "selected",
      "accepted",
    ]
    if (req.body.status && !validStatuses.includes(req.body.status)) {
      return res.status(400).json({ error: "Invalid status value." })
    }

    const updatedFields = {}
    Object.keys(application.toJSON()).forEach((key) => {
      if (req.body[key] !== undefined) {
        updatedFields[key] = req.body[key]
      }
    })

    const newApplication = await application.update(updatedFields, {
      new: true,
    })

    res.status(200).json(newApplication)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Server Error")
  }
})

app.delete("/applications/:id", async (req, res) => {
  try {
    const application = await Application.findByPk(req.params.id)
    if (!application) {
      return res.status(404).json({ error: "Application not found." })
    }

    await application.destroy()
    res.status(204).send()
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Server Error")
  }
})

app.post("/applications/:id/interview", async (req, res) => {
  try {
    const application = await Application.findByPk(req.params.id)
    if (!application) {
      return res.status(404).json({ error: "Application not found." })
    }
    const { roundNum, roundType, interviewDate } = req.body
    if (!roundNum || !roundType || !interviewDate) {
      return res.status(400).send("Round number, type, and date are required")
    }
    const interview = await Interview.create({
      applicationId: application.id,
      roundNum: roundNum,
      roundType: roundType,
      interviewDate: interviewDate,
      questions: req.body.questions || "",
      roleOffered: req.body.roleOffered || "",
      compensationOffered: req.body.compensationOffered || "",
    })
    res.status(201).json(interview)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Server Error")
  }
})

app.get("/applications/:id/interview", async (req, res) => {
  try {
    const application = await Application.findByPk(req.params.id)
    if (!application) {
      return res.status(404).json({ error: "Application not found." })
    }
    const interviews = await Interview.findAll({
      where: { applicationId: application.id },
    })
    res.status(200).json(interviews)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Server Error")
  }
})

app.get("/reports/applications", async (req, res) => {
  try {
    const { from, to } = req.query

    if (from && isNaN(Date.parse(from))) {
      return res
        .status(400)
        .json({ error: "Invalid 'from' date format. Use YYYY-MM-DD." })
    }
    if (to && isNaN(Date.parse(to))) {
      return res
        .status(400)
        .json({ error: "Invalid 'to' date format. Use YYYY-MM-DD." })
    }

    if (from && to && new Date(from) > new Date(to)) {
      return res
        .status(400)
        .json({ error: "'from' date must be less than or equal to 'to' date." })
    }

    const filter = {}
    if (from || to) {
      filter.appliedAt = {}
      if (from) {
        filter.appliedAt[Op.gte] = new Date(from)
      }
      if (to) {
        filter.appliedAt[Op.lte] = new Date(to)
      }
    }

    const totalApplications = await Application.count({ where: filter })

    const statusCounts = await Application.findAll({
      where: filter,
      attributes: [
        "status",
        [Sequelize.fn("COUNT", Sequelize.col("status")), "count"],
      ],
      group: ["status"],
    })

    const statusSummary = statusCounts.reduce((acc, item) => {
      acc[item.status] = parseInt(item.dataValues.count, 10)
      return acc
    }, {})

    res.status(200).json({
      totalApplications,
      statusSummary,
    })
  } catch (error) {
    console.error("Error in /reports/applications:", error.message)
    res.status(500).json({ error: "Server Error" })
  }
})

module.exports = app
