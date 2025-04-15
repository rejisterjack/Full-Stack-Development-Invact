module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    "Book",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      thumbnail: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {}
  )

  Book.associate = (models) => {
    Book.belongsTo(models.User, { foreignKey: "userId" })
    Book.belongsToMany(models.Tag, { through: "BookTags" })
  }

  return Book
}
