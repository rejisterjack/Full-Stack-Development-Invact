const express = require("express")
const { sequelize } = require("./lib/sequelize")

const app = express()
const port = process.env.PORT || 8000

app.get("/seed_db", seedDatabase)
app.get("/books", getAllBooks)
app.get("/authors/:authorId/books", getBooksByAuthor)
app.get("/genres/:genreId/books", getBooksByGenre)
app.post("/books", addBook)

sequelize.sync().then(() => {
  console.log("Database synced")
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
  })
})
