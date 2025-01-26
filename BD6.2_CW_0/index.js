const express = require("express")
const app = express()

const port = 3000
app.use(express.json())

const authors = [
  { authorId: 1, name: "One Name", book: "One Book" },
  { authorId: 2, name: "Two Name", book: "Two Book" },
  { authorId: 3, name: "Three Name", book: "Three Book" },
]

function getAuthors() {
  return authors
}

function getAuthorById(id) {
  return authors.find((author) => author.authorId === +id)
}

function addAuthor(author) {
  authors.push(author)
  return author
}

app.get("/", (req, res) => {
  res.send("server is on!")
})

app.get("/authors", (req, res) => {
  res.json(getAuthors())
})

app.get("/authors/details/:id", (req, res) => {
  let author = getAuthorById(+req.params.id)
  if (!author) return res.status(404).send("Author not found")
  res.status(200).send(author)
})

app.get("/authors/new", (req, res) => {
  const { authorId, name, book } = req.query
  let addedAuthor = addAuthor({ authorId, name, book })
  res.status(201).json(addedAuthor)
})

module.exports = { app, getAuthors, getAuthorById, addAuthor }
