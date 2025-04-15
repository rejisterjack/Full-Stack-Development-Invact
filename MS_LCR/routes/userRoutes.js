const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")

// POST /api/users - Register a new user
router.post("/", userController.registerUser)

// GET /api/users/:id - Get user by ID
router.get("/:id", userController.getUserById)

module.exports = router
