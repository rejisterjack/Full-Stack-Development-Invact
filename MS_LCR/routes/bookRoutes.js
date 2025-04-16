const express = require("express")
const router = express.Router()
const bookController = require("../controllers/bookController")

router.get("/search", bookController.searchBooks)

router.post("/save", bookController.saveBook)

router.get("/user/:userId", bookController.getUserBooks)

module.exports = router
