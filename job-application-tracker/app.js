const express = require("express")
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

module.exports = app
