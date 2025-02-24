const express = require("express")
const { sequelize } = require("./lib/sequelize")
const {
  seedDatabase,
  getAllBooks,
  getBooksByAuthor,
  getBooksByGenre,
  addBook,
} = require("./controllers/libController")

const app = express()
const port = process.env.PORT || 3000

app.get("/seed_db", seedDatabase)
app.get("/books", getAllBooks)
app.get("/authors/:authorId/books", getBooksByAuthor)
app.get("/genres/:genreId/books", getBooksByGenre)
app.post("/books", addBook)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
