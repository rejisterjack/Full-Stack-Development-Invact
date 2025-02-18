const express = require("express")
const app = express()
app.use(express.json())

const port = 3000

// Mock database
let games = [
  {
    id: 1,
    title: "The Legend of Zelda",
    genre: "Adventure",
    developer: "Nintendo",
  },
  {
    id: 2,
    title: "Super Mario Bros",
    genre: "Platformer",
    developer: "Nintendo",
  },
]

let developers = [
  { id: 1, name: "Nintendo", country: "Japan" },
  { id: 2, name: "Valve", country: "USA" },
]

// Helper functions
const getAllGames = () => games
const getGameById = (id) => games.find((game) => game.id === id)
const addGame = (title, genre, developer) => {
  const newGame = { id: games.length + 1, title, genre, developer }
  games.push(newGame)
  return newGame
}

const getDeveloperById = (id) => developers.find((dev) => dev.id === id)
const addDeveloper = (name, country) => {
  const newDeveloper = { id: developers.length + 1, name, country }
  developers.push(newDeveloper)
  return newDeveloper
}

// Routes
app.get("/games", (req, res) => {
  res.json(getAllGames())
})

app.get("/games/details/:id", (req, res) => {
  const game = getGameById(parseInt(req.params.id))
  if (game) {
    res.json(game)
  } else {
    res.status(404).send("Game not found")
  }
})

app.post("/games/new", (req, res) => {
  const { title, genre, developer } = req.body
  const newGame = addGame(title, genre, developer)
  res.status(200).json(newGame)
})

app.get("/developers/details/:id", (req, res) => {
  const developer = getDeveloperById(parseInt(req.params.id))
  if (developer) {
    res.status(200).json(developer)
  } else {
    res.status(404).send("Developer not found")
  }
})

app.post("/developers/new", (req, res) => {
  const { name, country } = req.body
  const newDeveloper = addDeveloper(name, country)
  res.json(newDeveloper)
})

module.exports = {
  app,
  getAllGames,
  getGameById,
  addGame,
  getDeveloperById,
  addDeveloper,
}
