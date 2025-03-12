const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  idNo: String,
  dob: Date,
  mail: String,
  telNo: String,
  address: String,
})

const User = mongoose.model("User", userSchema)

module.exports = User
