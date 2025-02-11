const express = require("express")
const User = require("./models/User")
const sequelize = require("./lib/sequelize")
const cors = require("cors")
require("dotenv").config()

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

sequelize
  .sync()
  .then(() => {
    console.log("Database synced successfully")
  })
  .catch((error) => {
    console.error("Error syncing database:", error)
  })

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll()
    res.json({ users })
  } catch (error) {
    res.status(500).send("Error fetching users")
  }
})

app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (user) {
      res.json({ user })
    } else {
      res.status(404).send("User not found")
    }
  } catch (error) {
    res.status(500).send("Error fetching user")
  }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
