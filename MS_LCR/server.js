const express = require("express")
const dotenv = require("dotenv")
const { sequelize } = require("./models")

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const userRoutes = require("./routes/userRoutes")
const bookRoutes = require("./routes/bookRoutes")
const tagRoutes = require("./routes/tagRoutes")

app.use("/api/users", userRoutes)
app.use("/api/books", bookRoutes)
app.use("/api/tags", tagRoutes)

app.get("/", (req, res) => {
  res.send("Book Collection API is running...")
})

const PORT = process.env.PORT || 3000

async function startServer() {
  try {
    await sequelize.sync()
    console.log("Database synchronized successfully.")

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error("Failed to start server:", error)
  }
}

startServer()
