require("dotenv").config()
const express = require("express")
const fileRouter = require("./src/router/fileRouter")
const { fileURLToPath } = require("url")
const path = require("path")
const fs = require("fs")
const cors = require("cors")

const app = express()
const PORT = process.env.PORT || 3000

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

const uploadDir = path.join(__dirname, "uploads")
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir)
}

app.use(cors())
app.use(express.json())
app.use("/src/uploads", express.static("uploads"))

app.use("/files", fileRouter)

app.use("/", (req, res) => {
  res.send("welcome to file upload")
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
