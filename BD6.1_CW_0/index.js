const express = require("express")

const app = express()
const port = 3000

app.use(express.json())

app.get("/", (req, res) => {
  res.send("server is on!")
})

app.get("/api/books", (req, res) => {
  res.json(getBooks())
})

app.get("/api/books/:id", (req, res) => {
  const book = getBookById(req.params.id)
  if (!book)
    return res.status(404).send("The book with the given ID was not found")
  res.json(book)
})

app.post("/api/books", (req, res) => {
  const book = addBook(req.body)
  res.status(201).json(book)
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

module.exports = app