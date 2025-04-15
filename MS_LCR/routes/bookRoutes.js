const express = require("express")
const router = express.Router()
const bookController = require("../controllers/bookController")

// GET /api/books/search - Search books from Google Books API
router.get("/search", bookController.searchBooks)

// POST /api/books/save - Save a book to user's collection
router.post("/save", bookController.saveBook)

// GET /api/books/user/:userId - Get all books for a specific user
router.get("/user/:userId", bookController.getUserBooks)

module.exports = router
