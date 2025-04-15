const { Tag, Book, BookTags } = require("../models")

exports.createTag = async (req, res) => {
  try {
    const { name } = req.body

    if (!name) {
      return res.status(400).json({ error: "Tag name is required" })
    }

    const existingTag = await Tag.findOne({ where: { name } })
    if (existingTag) {
      return res
        .status(409)
        .json({ error: "Tag already exists", tag: existingTag })
    }

    const tag = await Tag.create({ name })

    return res.status(201).json({
      message: "Tag created successfully",
      tag,
    })
  } catch (error) {
    console.error("Error creating tag:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}

exports.addTagToBook = async (req, res) => {
  try {
    const { bookId, tagId } = req.body

    if (!bookId || !tagId) {
      return res.status(400).json({ error: "Book ID and Tag ID are required" })
    }

    const book = await Book.findByPk(bookId)
    if (!book) {
      return res.status(404).json({ error: "Book not found" })
    }

    const tag = await Tag.findByPk(tagId)
    if (!tag) {
      return res.status(404).json({ error: "Tag not found" })
    }

    const existingRelation = await BookTags.findOne({
      where: { BookId: bookId, TagId: tagId },
    })

    if (existingRelation) {
      return res.status(409).json({ error: "This book already has this tag" })
    }

    await BookTags.create({ BookId: bookId, TagId: tagId })

    return res.status(201).json({
      message: "Tag added to book successfully",
    })
  } catch (error) {
    console.error("Error adding tag to book:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}

exports.getBooksByTag = async (req, res) => {
  try {
    const { tagId } = req.params

    const tag = await Tag.findByPk(tagId)
    if (!tag) {
      return res.status(404).json({ error: "Tag not found" })
    }

    const books = await Book.findAll({
      include: [
        {
          model: Tag,
          where: { id: tagId },
          through: { attributes: [] },
        },
      ],
    })

    return res.status(200).json({ books })
  } catch (error) {
    console.error("Error fetching books by tag:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}
