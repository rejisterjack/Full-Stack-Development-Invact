const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  releaseYear: {
    type: Number,
    required: true,
  },
  genre: {
    type: [String],
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  actors: {
    type: [String],
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  plot: {
    type: String,
    required: true,
  },
  awards: {
    type: String,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  trailerUrl: {
    type: String,
    required: true,
  },
})

const Movie = mongoose.model("Movie", movieSchema)

module.exports = Movie
