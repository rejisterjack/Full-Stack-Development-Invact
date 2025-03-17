const { Schema, default: mongoose } = require("mongoose")

const recipeSchema = new Schema(
  {
    title: String,
    author: String,
    difficulty: String,
    prepTime: Number,
    cookTime: Number,
    ingredients: [String],
    instructions: [String],
    imageUrl: String,
  },
  {
    timestamps: true,
  }
)

const Recipe = mongoose.model("Recipe", recipeSchema)
module.exports = Recipe
