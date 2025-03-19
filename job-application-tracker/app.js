const express = require("express")
const { Op } = require("sequelize")
const Application = require("./models/Application.model")
const Interview = require("./models/Interview.model")
const { sequelize } = require("./config/database")

const app = express()
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello, world!")
})

app.get("/seed-db", async (req, res) => {
  try {
    await sequelize.sync({ force: true })
    await Application.bulkCreate([
      {
        role: "Data Analyst",
        company: "Data Corp",
        appliedAt: "2024-01-25",
        status: "interview",
        interviewRounds: 2,
      },
      {
        role: "Data Analyst",
        company: "Data Corp",
        jdUrl: "",
        appliedAt: "2024-01-25T00:00:00.000Z",
        status: "no reply",
        interviewRounds: 0,
      },
      {
        role: "Frontend Developer",
        company: "Web Solutions",
        jdUrl: "https://websolutions.com/jobs/frontend",
        appliedAt: "2024-03-10T00:00:00.000Z",
        status: "accepted",
        interviewRounds: 0,
      },
      {
        role: "Backend Developer",
        company: "API Builders",
        jdUrl: "https://apibuilders.com/jobs/backend",
        appliedAt: "2024-02-15T00:00:00.000Z",
        status: "rejected",
        interviewRounds: 1,
      },
      {
        role: "Full Stack Developer",
        company: "Dev Hub",
        jdUrl: "https://devhub.com/jobs/fullstack",
        appliedAt: "2024-01-20T00:00:00.000Z",
        status: "selected",
        interviewRounds: 3,
      },
      {
        role: "Product Manager",
        company: "Innovate Inc",
        jdUrl: "https://innovateinc.com/jobs/pm",
        appliedAt: "2024-03-05T00:00:00.000Z",
        status: "interview",
        interviewRounds: 2,
      },
      {
        role: "UI/UX Designer",
        company: "Design Studio",
        jdUrl: "https://designstudio.com/jobs/uiux",
        appliedAt: "2024-02-20T00:00:00.000Z",
        status: "no reply",
        interviewRounds: 0,
      },
      {
        role: "DevOps Engineer",
        company: "CloudOps",
        jdUrl: "https://cloudops.com/jobs/devops",
        appliedAt: "2024-01-30T00:00:00.000Z",
        status: "interview",
        interviewRounds: 1,
      },
      {
        role: "QA Engineer",
        company: "Testify",
        jdUrl: "https://testify.com/jobs/qa",
        appliedAt: "2024-03-01T00:00:00.000Z",
        status: "accepted",
        interviewRounds: 0,
      },
      {
        role: "Machine Learning Engineer",
        company: "AI Labs",
        jdUrl: "https://ailabs.com/jobs/ml",
        appliedAt: "2024-02-25T00:00:00.000Z",
        status: "rejected",
        interviewRounds: 2,
      },
    ])
    await Interview.bulkCreate([
      {
        id: 1,
        applicationId: 1,
        roundNum: 1,
        roundType: "telephonic",
        interviewDate: "2024-02-10T00:00:00.000Z",
        questions: "What is your experience with React?",
        roleOffered: "",
        compensationOffered: "",
        createdAt: "2025-03-18T20:18:01.887Z",
        updatedAt: "2025-03-18T20:18:01.887Z",
      },
      {
        id: 2,
        applicationId: 1,
        roundNum: 2,
        roundType: "live coding",
        interviewDate: "2024-02-15T00:00:00.000Z",
        questions: "Solve a React problem live",
        roleOffered: "",
        compensationOffered: "",
        createdAt: "2025-03-18T20:22:08.603Z",
        updatedAt: "2025-03-18T20:22:08.603Z",
      },
      {
        id: 3,
        applicationId: 6,
        roundNum: 1,
        roundType: "HR screening",
        interviewDate: "2024-03-10T00:00:00.000Z",
        questions: "Tell us about yourself",
        roleOffered: "",
        compensationOffered: "",
        createdAt: "2025-03-18T20:30:00.000Z",
        updatedAt: "2025-03-18T20:30:00.000Z",
      },
      {
        id: 4,
        applicationId: 6,
        roundNum: 2,
        roundType: "technical",
        interviewDate: "2024-03-15T00:00:00.000Z",
        questions: "Explain system design concepts",
        roleOffered: "",
        compensationOffered: "",
        createdAt: "2025-03-18T20:35:00.000Z",
        updatedAt: "2025-03-18T20:35:00.000Z",
      },
      {
        id: 5,
        applicationId: 8,
        roundNum: 1,
        roundType: "technical",
        interviewDate: "2024-02-05T00:00:00.000Z",
        questions: "What is your experience with CI/CD pipelines?",
        roleOffered: "",
        compensationOffered: "",
        createdAt: "2025-03-18T20:40:00.000Z",
        updatedAt: "2025-03-18T20:40:00.000Z",
      },
      {
        id: 6,
        applicationId: 5,
        roundNum: 1,
        roundType: "telephonic",
        interviewDate: "2024-01-25T00:00:00.000Z",
        questions: "What are your strengths?",
        roleOffered: "",
        compensationOffered: "",
        createdAt: "2025-03-18T20:45:00.000Z",
        updatedAt: "2025-03-18T20:45:00.000Z",
      },
      {
        id: 7,
        applicationId: 5,
        roundNum: 2,
        roundType: "technical",
        interviewDate: "2024-01-30T00:00:00.000Z",
        questions: "Explain your experience with full-stack development",
        roleOffered: "",
        compensationOffered: "",
        createdAt: "2025-03-18T20:50:00.000Z",
        updatedAt: "2025-03-18T20:50:00.000Z",
      },
      {
        id: 8,
        applicationId: 5,
        roundNum: 3,
        roundType: "final",
        interviewDate: "2024-02-05T00:00:00.000Z",
        questions: "Discuss your salary expectations",
        roleOffered: "Full Stack Developer",
        compensationOffered: "120000",
        createdAt: "2025-03-18T20:55:00.000Z",
        updatedAt: "2025-03-18T20:55:00.000Z",
      },
      {
        id: 9,
        applicationId: 8,
        roundNum: 2,
        roundType: "managerial",
        interviewDate: "2024-02-10T00:00:00.000Z",
        questions: "How do you handle team conflicts?",
        roleOffered: "",
        compensationOffered: "",
        createdAt: "2025-03-18T21:00:00.000Z",
        updatedAt: "2025-03-18T21:00:00.000Z",
      },
      {
        id: 10,
        applicationId: 8,
        roundNum: 3,
        roundType: "final",
        interviewDate: "2024-02-15T00:00:00.000Z",
        questions: "What are your long-term career goals?",
        roleOffered: "DevOps Engineer",
        compensationOffered: "110000",
        createdAt: "2025-03-18T21:05:00.000Z",
        updatedAt: "2025-03-18T21:05:00.000Z",
      },
    ])
    res.status(200).send("Test database seeded.")
  } catch (error) {
    console.error(error.message)
    res.status(500).send(error.message)
  }
})

app.post("/applications", async (req, res) => {
  try {
    const { role, company, jdUrl, appliedAt } = req.body
    if (!role || !company) {
      return res.status(400).json({ message: "Role and company are required." })
    }
    const application = await Application.create({
      role,
      company,
      jdUrl: jdUrl || "",
      appliedAt: appliedAt || new Date(),
      status: "no reply", 
      interviewRounds: 0, 
    })
    res.status(201).json(application)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ message: "Server Error" })
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
      return res.status(404).json({ message: "Application not found." })
    }
    res.status(200).json(application)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ message: "Server Error" })
  }
})

app.put("/applications/:id", async (req, res) => {
  try {
    const application = await Application.findByPk(req.params.id)
    if (!application) {
      return res.status(404).json({ message: "Application not found." })
    }

    const validStatuses = [
      "no reply",
      "rejected",
      "interview",
      "selected",
      "offer",
    ]
    if (req.body.status && !validStatuses.includes(req.body.status)) {
      return res.status(400).json({ message: "Invalid update data." })
    }

    const updatedFields = {}
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== undefined) {
        updatedFields[key] = req.body[key]
      }
    })

    const updatedApplication = await application.update(updatedFields)
    res.status(200).json(updatedApplication)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ message: "Server Error" })
  }
})

app.delete("/applications/:id", async (req, res) => {
  try {
    const application = await Application.findByPk(req.params.id)
    if (!application) {
      return res.status(404).json({ message: "Application not found." })
    }

    await application.destroy()
    res.status(204).send()
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ message: "Server Error" })
  }
})

app.post("/applications/:id/interview", async (req, res) => {
  try {
    const application = await Application.findByPk(req.params.id)
    if (!application) {
      return res.status(404).json({ message: "Application not found." })
    }
    const { roundNum, roundType, interviewDate } = req.body
    if (!roundNum || !roundType || !interviewDate) {
      return res.status(400).json({
        message: "Interview round number, type, and date are required.",
      })
    }
    const interview = await Interview.create({
      applicationId: application.id,
      roundNum,
      roundType,
      interviewDate,
      questions: req.body.questions || "",
      roleOffered: req.body.roleOffered || "",
      compensationOffered: req.body.compensationOffered || "",
    })
    res.status(201).json(interview)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ message: "Server Error" })
  }
})

app.get("/applications/:id/interview", async (req, res) => {
  try {
    const application = await Application.findByPk(req.params.id)
    if (!application) {
      return res.status(404).json({ message: "Application not found." })
    }
    const interviews = await Interview.findAll({
      where: { applicationId: application.id },
    })
    res.status(200).json(interviews)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ message: "Server Error" })
  }
})

app.get("/reports/applications", async (req, res) => {
  try {
    const { from, to } = req.query

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

    const applications = await Application.findAll({ where: filter })

    // const groupedByStatus = applications.reduce((acc, app) => {
    //   acc[app.status] = (acc[app.status] || 0) + 1
    //   return acc
    // }, {})

    const groupedByStatus = applications.reduce((acc, app) => {
      if (["interview", "accepted", "rejected"].includes(app.status)) {
      acc[app.status] = (acc[app.status] || 0) + 1
      }
      return acc
    }, {})

    res.status(200).json(groupedByStatus)
  } catch (error) {
    console.error("Error in /reports/applications:", error.message)
    res.status(500).json({ message: "Server Error" })
  }
})

module.exports = app
