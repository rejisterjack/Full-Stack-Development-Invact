const { sequelize, DataTypes } = require("../lib")

const role = sequelize.define("role", {
  title: DataTypes.STRING,
})

module.exports = { role }
