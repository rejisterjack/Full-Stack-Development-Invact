const { Book, User } = require("../models")
const axios = require("axios")

exports.searchBooks = async (req, res) => {
  try {
    const { query } = req.query

    if (!query) {
      return res.status(400).json({ error: "Search query is required" })
    }

    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        query
      )}`
    )

    if (!response.data.items) {
      return res.status(200).json({ books: [] })
    }

    const books = response.data.items.map((item) => {
      const volumeInfo = item.volumeInfo
      return {
        title: volumeInfo.title || "Unknown Title",
        author: volumeInfo.authors
          ? volumeInfo.authors.join(", ")
          : "Unknown Author",
        thumbnail: volumeInfo.imageLinks
          ? volumeInfo.imageLinks.thumbnail
          : null,
      }
    })

    return res.status(200).json({ books })
  } catch (error) {
    console.error("Error searching books:", error)
    return res.status(500).json({ error: "Failed to search books" })
  }
}

exports.saveBook = async (req, res) => {
  try {
    const { userId, title, author, thumbnail } = req.body

    if (!userId || !title || !author) {
      return res
        .status(400)
        .json({ error: "UserId, title, and author are required" })
    }

    const user = await User.findByPk(userId)
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    const existingBook = await Book.findOne({
      where: {
        userId,
        title,
        author,
      },
    })

    if (existingBook) {
      return res
        .status(409)
        .json({ error: "This book is already in your collection" })
    }

    const book = await Book.create({
      userId,
      title,
      author,
      thumbnail,
    })

    return res.status(201).json({
      message: "Book saved successfully",
      book,
    })
  } catch (error) {
    console.error("Error saving book:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}

exports.getUserBooks = async (req, res) => {
  try {
    const { userId } = req.params

    const user = await User.findByPk(userId)
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    const books = await Book.findAll({
      where: { userId },
      include: ["Tags"],
    })

    return res.status(200).json({ books })
  } catch (error) {
    console.error("Error fetching user books:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}
