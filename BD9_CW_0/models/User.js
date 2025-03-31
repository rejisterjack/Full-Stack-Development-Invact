const { Schema, model } = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const User = model("User", userSchema)
module.exports = User
