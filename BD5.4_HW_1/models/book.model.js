const { sequelize, DataTypes } = require("../lib");

const book = sequelize.define("book", {
  title: DataTypes.STRING,
  genre: DataTypes.STRING,
  publicationYear: DataTypes.INTEGER,
});

module.exports = { book };
