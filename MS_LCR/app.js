// This file serves as the main Express application setup
const express = require("express")
const dotenv = require("dotenv")

// Load environment variables
dotenv.config()

// Initialize express app
const app = express()

// Add middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to Book Collection API")
})

// Export the Express app for use in server.js
module.exports = app
