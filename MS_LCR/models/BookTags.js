module.exports = (sequelize) => {
  const BookTags = sequelize.define("BookTags", {}, {})

  return BookTags
}
