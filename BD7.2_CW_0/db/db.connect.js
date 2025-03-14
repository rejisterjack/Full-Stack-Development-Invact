const mongoose = require("mongoose")

const mongoUri = "mongodb://localhost:27017/invact"

const initializeDatabase = async () => {
  mongoose
    .connect(mongoUri)
    .then(() => {
      console.log("Connected to MongoDB")
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB", err)
    })
}

module.exports = initializeDatabase
