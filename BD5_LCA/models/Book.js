const { sequelize } = require("../lib/sequelize")
const Author = require("./Author")

const Book = sequelize.define("Book", {
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  publicationYear: DataTypes.INTEGER,
  authorId: DataTypes.INTEGER,
})

Book.belongsTo(Author, {
  foreignKey: "authorId",
})
Author.hasMany(Book)

module.exports = Book
