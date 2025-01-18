const { sequelize, DataTypes } = require("../lib");

const author = sequelize.define("author", {
  name: DataTypes.STRING,
  birthDay: DataTypes.INTEGER,
});

module.exports = { author };
