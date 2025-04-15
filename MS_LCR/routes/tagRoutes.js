const express = require("express")
const router = express.Router()
const tagController = require("../controllers/tagController")

// POST /api/tags - Create a new tag
router.post("/", tagController.createTag)

// POST /api/tags/book - Add a tag to a book
router.post("/book", tagController.addTagToBook)

// GET /api/tags/books/:tagId - Get all books with a specific tag
router.get("/books/:tagId", tagController.getBooksByTag)

module.exports = router
