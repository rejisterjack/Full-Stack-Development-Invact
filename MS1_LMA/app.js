const express = require("express")
const db = require("./models")
const app = express()

app.use(express.json())

async function addUser(data) {
  const { username, email } = data
  if (!username || !email) {
    return { status: 400, message: "Username and email are required" }
  }
  const existingUser = await db.User.findOne({ where: { email } })
  if (existingUser) {
    return { status: 400, message: "Email already exists" }
  }
  const newUser = await db.User.create({ username, email })
  return { status: 201, message: "User created successfully", user: newUser }
}

async function addBook(data) {
  const { title, author, genre, publicationYear } = data
  if (!title || !author) {
    return { status: 400, message: "Title and author are required" }
  }
  const existingBook = await db.Book.findOne({ where: { title, author } })
  if (existingBook) {
    return { status: 400, message: "Book already exists" }
  }
  const newBook = await db.Book.create({
    title,
    author,
    genre,
    publicationYear,
  })
  return { status: 201, message: "Book created successfully", book: newBook }
}

async function searchBooks(data) {
  const { title, author } = data
  if (!title && !author) {
    return { status: 400, message: "Title or author is required" }
  }

  const whereClause = {}
  if (title) {
    whereClause.title = { [db.Sequelize.Op.like]: `%${title}%` }
  }
  if (author) {
    whereClause.author = { [db.Sequelize.Op.like]: `%${author}%` }
  }

  const books = await db.Book.findAll({ where: whereClause })

  if (!books.length) {
    return { status: 404, message: "No books found", books: [] }
  }

  return { status: 200, message: "Books retrieved successfully", books }
}

async function addReadingList(data) {
  const statusEnum = ["Want to Read", "Reading", "Finished"]
  const { userId, bookId, status } = data
  if (!userId || !bookId || !statusEnum.includes(status)) {
    return { statusCode: 400, message: "Invalid data" }
  }
  const user = await db.User.findByPk(userId)
  const book = await db.Book.findByPk(bookId)
  if (!user || !book) {
    return { statusCode: 404, message: "Invalid user or book ID" }
  }
  const existingEntry = await db.ReadingList.findOne({
    where: { userId, bookId },
  })
  if (existingEntry) {
    const updatedEntry = await existingEntry.update({ status }, { new: true })
    return {
      statusCode: 200,
      message: "Entry updated successfully",
      readingList: updatedEntry,
    }
  } else {
    const newEntry = await db.ReadingList.create({ userId, bookId, status })
    return {
      statusCode: 201,
      message: "Entry added successfully",
      readingList: newEntry,
    }
  }
}

async function updateBook(bookId, data) {
  const { title, genre } = data
  const book = await db.Book.findByPk(bookId)
  if (!book) {
    return { status: 404, message: "Book not found" }
  }
  const updatedBook = await book.update({ title, genre })
  return {
    status: 200,
    message: "Book details updated successfully",
    book: updatedBook,
  }
}

async function getUserByReadingList(userId) {
  const readingList = await db.ReadingList.findAll({
    where: { userId },
    include: [
      { model: db.Book, as: "books", attributes: ["title", "author", "genre"] },
    ],
  })
  if (!readingList.length) {
    return {
      status: 404,
      message: "User not found or no books in reading list",
    }
  }
  return { status: 200, readingList }
}

async function removeBookFromReadingList(readingListId) {
  const entry = await db.ReadingList.findByPk(readingListId)
  if (!entry) {
    return { status: 404, message: "Reading list entry not found" }
  }
  await entry.destroy()
  return { status: 200, message: "Book removed from reading list" }
}

app.post("/api/users", async (req, res) => {
  const { status, message, user } = await addUser(req.body)
  res.status(status).json({ message, user })
})

app.post("/api/books", async (req, res) => {
  const { status, message, book } = await addBook(req.body)
  res.status(status).json({ message, book })
})

app.get("/api/books/search", async (req, res) => {
  const { status, message, books } = await searchBooks(req.query)
  res.status(status).json({ message, books })
})

app.post("/api/reading-list", async (req, res) => {
  const { statusCode, message, readingList } = await addReadingList(req.body)
  res.status(statusCode).json({ message, readingList })
})

app.post("/api/books/:bookId", async (req, res) => {
  const { bookId } = req.params
  const { status, message, book } = await updateBook(bookId, req.body)
  res.status(status).json({ message, book })
})

app.get("/api/reading-list/:userId", async (req, res) => {
  const { userId } = req.params
  const { status, message, readingList } = await getUserByReadingList(userId)
  res.status(status).json({ message, readingList })
})

app.post("/api/reading-list/:readingListId", async (req, res) => {
  const { readingListId } = req.params
  const { status, message } = await removeBookFromReadingList(readingListId)
  res.status(status).json({ message })
})

module.exports = app
