const Author = require("../models/Author.js")
const Book = require("../models/Book.js")
const Genre = require("../models/Genre.js")
const { authorsData, genresData, booksData } = require("../seed.js")
const { sequelize } = require("../lib/sequelize.js")
const BookGenres = require("../models/BookGenres.js")

const seedDatabase = async (req, res) => {
  try {
    await sequelize.sync({ force: true })

    await Author.bulkCreate(authorsData)
    const genres = await Genre.bulkCreate(genresData)
    const books = await Book.bulkCreate(booksData)
    await BookGenres.bulkCreate([
      { bookId: books[0].id, genreId: genres[0].id },
      { bookId: books[1].id, genreId: genres[0].id },
      { bookId: books[1].id, genreId: genres[1].id },
    ])

    res.json({ message: "Database seeded successfully" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll({
      include: [{ model: Author }, { model: Genre }],
    })
    res.json(books)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getBooksByAuthor = async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.authorId)
    if (!author) {
      return res.status(404).json({ error: "Author not found" })
    }

    const books = await Book.findAll({
      where: { authorId: req.params.authorId },
      include: [{ model: Genre }],
    })
    res.json(books)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getBooksByGenre = async (req, res) => {
  try {
    const genre = await Genre.findByPk(req.params.genreId)
    if (!genre) {
      return res.status(404).json({ error: "Genre not found" })
    }

    const books = await genre.getBooks({
      include: [{ model: Author }],
    })
    res.json(books)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const addBook = async (req, res) => {
  try {
    const { title, description, publicationYear, authorId, genreIds } = req.body

    if (!title || !description || !publicationYear || !authorId || !genreIds) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    const author = await Author.findByPk(authorId)
    if (!author) {
      return res.status(404).json({ error: "Author not found" })
    }

    const genres = await Genre.findAll({
      where: { id: genreIds },
    })
    if (genres.length !== genreIds.length) {
      return res.status(404).json({ error: "One or more genres not found" })
    }

    const book = await Book.create({
      title,
      description,
      publicationYear,
      authorId,
    })

    await book.setGenres(genres)

    const completeBook = await Book.findByPk(book.id, {
      include: [{ model: Author }, { model: Genre }],
    })

    res.status(201).json(completeBook)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  seedDatabase,
  getAllBooks,
  getBooksByAuthor,
  getBooksByGenre,
  addBook,
}
