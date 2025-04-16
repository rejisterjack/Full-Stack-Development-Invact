const express = require("express")
const dotenv = require("dotenv")

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.send("Welcome to Book Collection API")
})

module.exports = app
