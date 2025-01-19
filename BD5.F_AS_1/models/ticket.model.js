const { sequelize, DataTypes } = require("../lib")

const ticket = sequelize.define("ticket", {
  tickerId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.STRING,
  status: {
    type: DataTypes.ENUM("open", "closed"),
    allowNull: false,
  },
  priority: DataTypes.INTEGER,
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  agentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
})

module.exports = { ticket }
