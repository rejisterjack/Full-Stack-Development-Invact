import Author from "../models/Author.js"
import Book from "../models/Book.js"
import Genre from "../models/Genre.js"
import { authorsData, genresData, booksData } from "../seed.js"
import { sequelize } from "../lib/sequelize.js"

export const seedDatabase = async (req, res) => {
  try {
    await sequelize.sync({ force: true })

    const authors = await Author.bulkCreate(authorsData)
    const genres = await Genre.bulkCreate(genresData)
    const books = await Book.bulkCreate(booksData)

    await books[0].setGenres([genres[0]])
    await books[1].setGenres([genres[0], genres[1]])

    res.json({ message: "Database seeded successfully" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll({
      include: [{ model: Author }, { model: Genre }],
    })
    res.json(books)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getBooksByAuthor = async (req, res) => {
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

export const getBooksByGenre = async (req, res) => {
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

export const addBook = async (req, res) => {
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
