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
    const { bookId, tagName } = req.body

    if (!bookId || !tagName) {
      return res
        .status(400)
        .json({ error: "Book ID and Tag Name are required" })
    }

    const book = await Book.findByPk(bookId)
    if (!book) {
      return res.status(404).json({ error: "Book not found" })
    }

    let tag = await Tag.findOne({
      where: { name: tagName }
    })
    
    if (!tag) {
      tag = await Tag.create({ name: tagName })
    }

    try {
      await book.addTag(tag)
    } catch (associationError) {
      console.error("Association error:", associationError)
      const existingAssociation = await BookTags.findOne({
        where: {
          BookId: bookId,
          TagId: tag.id
        }
      })
      
      if (existingAssociation) {
        return res.status(200).json({
          message: "Tag is already associated with this book"
        })
      }
      
      throw associationError 
    }

    return res.status(201).json({
      message: "Tag added to book successfully",
      book: bookId,
      tag: tag.name
    })
  } catch (error) {
    console.error("Error adding tag to book:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}

exports.getBooksByTag = async (req, res) => {
  try {
    const { tagName } = req.query
    
    // Fixed the Tag.findOne query - was missing where clause
    const tag = await Tag.findOne({
      where: {
        name: tagName
      }
    })

    if (!tag) {
      return res.status(404).json({ error: "Tag not found" })
    }

    const books = await Book.findAll({
      include: [{ model: Tag, where: { id: tag.id } }]
    })

    return res.status(200).json({ books })
  } catch (error) {
    console.error("Error fetching books by tag:", error);
    return res.status(500).json({ error: "Internal server error" })
  }
}
