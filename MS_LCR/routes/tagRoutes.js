const express = require("express")
const router = express.Router()
const tagController = require("../controllers/tagController")

router.post("/", tagController.createTag)

router.post("/book", tagController.addTagToBook)

router.get("/books/:tagId", tagController.getBooksByTag)

module.exports = router
