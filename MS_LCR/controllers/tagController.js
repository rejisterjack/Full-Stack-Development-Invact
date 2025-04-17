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

    let bookTag

    if (!bookId || !tagName) {
      return res
        .status(400)
        .json({ message: "Book ID and Tag Name is required" })
    }

    const book = await Book.findByPk(bookId)
    if (!book) {
      return res.status(404).json({ message: "No book found" })
    }

    const tag = await Tag.findOne({
      where: {
        name: tagName,
      },
    })

    if (!tag) {
      bookTag = await Tag.create({ name: tagName })
      // await BookTags.create({
      //   bookId: bookId,
      //   tagId: bookTag.id,
      // })
      return res.status(201).json({ message: "tag added to book successfully" })
    }

    // await BookTags.create({
    //   bookId: bookId,
    //   tagId: tag.id,
    // })
    return res.status(201).json({ message: "tag added to book successfully" })
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
}

exports.getBooksByTag = async (req, res) => {
  try {
    const { tagName } = req.query
    const tag = await Tag.findOne({
      name: tagName,
    })

    if (!tag) {
      return res.status(404).json({ error: "Tag not found" })
    }

    const books = await Book.findAll({
      include: [{ model: Tag, where: { name: tagName } }],
    })

    return res.status(200).json({books})
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
}
