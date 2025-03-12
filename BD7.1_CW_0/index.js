const initializeDatabase = require("./db/db.connect")
const fs = require("fs")
const Movie = require("./models/movie.model")

initializeDatabase()
const jsonData = fs.readFileSync("./movies.json", "utf-8")
const moviesData = JSON.parse(jsonData)

function seedData() {
  try {
    moviesData.forEach(async (movie) => {
      const newMovie = new Movie(movie)
      await newMovie.save()
    })
    console.log("Data seeded successfully")
  } catch (error) {
    console.error("Error seeding data", error)
  }
}

// seedData()