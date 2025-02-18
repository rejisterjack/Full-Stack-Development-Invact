const { sequelize, DataTypes } = require("../lib")

const agent = sequelize.define("agent", {
  agentId: DataTypes.INTEGER,
  name: DataTypes.STRING,
  email: DataTypes.STRING,
})

module.exports = { agent }
