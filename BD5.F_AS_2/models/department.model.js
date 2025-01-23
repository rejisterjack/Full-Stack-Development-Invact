const { sequelize, DataTypes } = require("../lib")

const department = sequelize.define("department", {
  name: DataTypes.STRING,
})

module.exports = { department }
