const express = require("express")
const { login } = require("./controllers/controller")
const rateLimiter = require("./middleware/rateLimiter")

const app = express()
app.use(express.json())

app.post("/login", rateLimiter, login)

module.exports = app
