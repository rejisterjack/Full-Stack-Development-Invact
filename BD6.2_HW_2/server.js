

const express = require("express")
const { getMovieById, getMovies, addMovie } = require("./movie")

const app = express()
const port = 3000

app.use(express.json())

app.get("/", (req, res) => {
  res.send("server is on!")
})

app.get("/movies", (req, res) => {
  const movies = getMovies()
  res.status(200).json(movies)
})

app.get("/movies/:movieId", (req, res) => {
  const movie = getMovieById(+req.params.movieId)
  console.log(movie, "movie")
  if (!movie) {
    res.status(404).json({ message: "no movie found" })
  }
  res.status(200).json(movie)
})

app.post("/movies", (req, res) => {
  const movie = addMovie(req.body)
  res.status(200).json(movie)
})

module.exports = {
  app,
}
