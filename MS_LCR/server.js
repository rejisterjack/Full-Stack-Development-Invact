const express = require("express")
const dotenv = require("dotenv")
const { sequelize } = require("./models")

// Load environment variables from .env file
dotenv.config()

// Initialize express app
const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Import routes
const userRoutes = require("./routes/userRoutes")
const bookRoutes = require("./routes/bookRoutes")
const tagRoutes = require("./routes/tagRoutes")

// Use routes
app.use("/api/users", userRoutes)
app.use("/api/books", bookRoutes)
app.use("/api/tags", tagRoutes)

// Default route
app.get("/", (req, res) => {
  res.send("Book Collection API is running...")
})

// Set port
const PORT = process.env.PORT || 3000

// Start server
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
