const express = require("express")
const connectDB = require("./connnectDB")
const Recipe = require("./Recipe")

const app = express()
app.use(express.json())

app.get("/", (req, res) => {
  console.log("Hello World")
})

app.post("/recipes", async (req, res) => {
  try {
    const newRecipe = await Recipe.create(req.body)
    res.status(201).json({ newRecipe })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.get("/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find()
    res.status(201).json({ recipes })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.get("/recipes/title/:title", async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ title: req.params.title })
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" })
    }
    res.status(200).json({ recipe })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.get("/recipes/author/:author", async (req, res) => {
  try {
    const recipes = await Recipe.find({ author: req.params.author })
    res.status(200).json({ recipes })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.get("/recipes/difficulty/easy", async (req, res) => {
  try {
    const recipes = await Recipe.find({ difficulty: "Easy" })
    res.status(200).json({ recipes })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.patch("/recipes/:id/difficulty", async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { difficulty: "Easy" },
      { new: true }
    )
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" })
    }
    res.status(200).json({ recipe })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.patch("/recipes/title/:title", async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndUpdate(
      { title: req.params.title },
      { prepTime: 40, cookTime: 45 },
      { new: true }
    )
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" })
    }
    res.status(200).json({ recipe })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.delete("/recipes/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id)
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" })
    }
    res.status(200).json({ message: "Recipe deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

connectDB().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000")
  })
})
