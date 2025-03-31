const express = require("express")
const cors = require("cors")
const { connectDB } = require("./connectDB")
require("dotenv").config()
const authRoutes = require("./routes/auth.routes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/auth", authRoutes)

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`)
    })
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error)
    process.exit(1)
  })
