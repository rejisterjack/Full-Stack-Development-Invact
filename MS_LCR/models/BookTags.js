module.exports = (sequelize, DataTypes) => {
  const BookTags = sequelize.define("BookTags", {}, {})

  return BookTags
}
