const { sequelize } = require("../lib/sequelize")
const Book = require("./Book")

const Genre = sequelize.define("Genre", {
  name: DataTypes.STRING,
  description: DataTypes.TEXT,
})

Book.belongsToMany(Genre, { through: "BookGenres" })
Genre.belongsToMany(Book, { through: "BookGenres" })

module.exports = Genre
