const path = require("path")
const { Sequelize, DataTypes } = require("sequelize")
require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
})

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.resolve(__dirname, process.env.DB_FILE),
  logging: process.env.NODE_ENV !== "test",
})

module.exports = {
  sequelize,
  DataTypes,
}
