const { sequelize, DataTypes } = require("../lib/sequelize")
const Book = require("./Book")
const Genre = require("./Genre")

const BookGenres = sequelize.define("BookGenres", {
  bookId: {
    type: DataTypes.INTEGER,
    references: {
      model: Book,
      key: "id",
    },
  },
  genreId: {
    type: DataTypes.INTEGER,
    references: {
      model: Genre,
      key: "id",
    },
  },
})

Book.belongsToMany(Genre, { through: BookGenres })
Genre.belongsToMany(Book, { through: BookGenres })

module.exports = BookGenres
