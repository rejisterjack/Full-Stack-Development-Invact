const { sequelize, DataTypes } = require("../lib");
const { author } = require("./author.model");
const { book } = require("./book.model");

const bookAuthor = sequelize.define("bookAuthor", {
  authorId: {
    type: DataTypes.INTEGER,
    references: {
      model: author,
      key: id,
    },
  },
  bookId: {
    type: DataTypes.INTEGER,
    references: {
      model: book,
      key: id,
    },
  },
});

author.belongsToMany(book, { through: bookAuthor });
book.belongsToMany(author, { through: bookAuthor });
module.exports = { bookAuthor };
