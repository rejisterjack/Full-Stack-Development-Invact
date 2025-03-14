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

// find and update
async function updateMovie(movieId, movieTitle, dataToUpdate) {
  try {
    // const updatedMovie = await Movie.findByIdAndUpdate(movieId, dataToUpdate, {
    //   new: true,
    //   runValidators: true,
    // })
    const updatedMovie = await Movie.findOneAndUpdate(
      { title: movieTitle },
      dataToUpdate,
      {
        new: true,
        runValidators: true,
      }
    )
    console.log("Movie updated successfully", updatedMovie)
  } catch (error) {
    console.error("Error updating movie", error)
  }
}

updateMovie(
  "67d1a695255a3d47268e5047",
  "The Dark Knight",
  { director: "Karan Johar" }
)

// seedData()
