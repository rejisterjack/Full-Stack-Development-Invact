const { sequelize, DataTypes } = require("../lib")

const employee = sequelize.define("employee", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
})

module.exports = { employee }