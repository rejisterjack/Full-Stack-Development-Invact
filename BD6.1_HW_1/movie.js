const movies = [
  { id: 1, title: "The Shawshank Redemption", director: "Frank Darabont" },
  { id: 2, title: "The Godfather", director: "Francis Ford Coppola" },
  { id: 3, title: "The Dark Knight", director: "Christopher Nolan" },
  { id: 4, title: "Pulp Fiction", director: "Quentin Tarantino" },
]

const getMovies = () => movies

const getMovieById = (id) => {
  return movies.find((item) => item.id === parseInt(id)) 
}

const addMovie = (movie) => {
  const newMovie = {
    id: movie.id,
    title: movie.title,
    director: movie.director,
  }
  movies.push(newMovie)
  return newMovie
}

module.exports = {
  movies,
  addMovie,
  getMovies,
  getMovieById,
}
