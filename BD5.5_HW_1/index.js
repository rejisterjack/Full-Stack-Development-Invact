const express = require("express");
const { sequelize } = require("./lib");
const { author } = require("./models/author.model");
const { book } = require("./models/book.model");

const app = express();
const port = 3000;

const books = [
  {
    title: "Harry Potter and the Philosopher's Stone",
    genre: "Fantasy",
    publicationYear: 1997,
  },
  { title: "A Game of Thrones", genre: "Fantasy", publicationYear: 1996 },
  { title: "The Hobbit", genre: "Fantasy", publicationYear: 1937 },
];
const authors = [{ name: "J.K Rowling", birthYear: 1965 }];

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("server is on!");
});

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await author.bulkCreate(authors);
    await book.bulkCreate(books);
    res.status(200).json({ message: "database seeded successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/authors/new", async (req, res) => {
  try {
    const authorData = req.body.newAuthor || {};
    const newAuthorData = await author.create(authorData);
    res.status(200).json({
      message: "new author created successfully",
      author: newAuthorData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/authors/update/:id", async (req, res) => {
  try {
    const authorData = req.body || {};
    const currentAuthor = await author.findOne({
      where: { id: +req.params.id || 0 },
    });
    if (!currentAuthor)
      return res.status(404).json({ message: "no author found" });
    const updatedAuthorData = await currentAuthor.set(authorData).save();
    res.status(200).json({
      message: "author updated successfully",
      author: updatedAuthorData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
