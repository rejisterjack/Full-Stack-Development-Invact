const { sequelize } = require("./database")

const connectDB = async () => {
  try {
    sequelize.sync({ force: false })
    console.log("Connection to SQLite has been established successfully.")
  } catch (error) {
    console.error("Unable to connect to the database:", error)
  }
}

module.exports = connectDB
