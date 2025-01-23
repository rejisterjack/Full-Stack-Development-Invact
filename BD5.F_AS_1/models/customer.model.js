const { sequelize, DataTypes } = require("../lib")

const customer = sequelize.define("customer", {
  customerId: DataTypes.INTEGER,
  name: DataTypes.STRING,
  email: DataTypes.STRING,
})

module.exports = { customer }
