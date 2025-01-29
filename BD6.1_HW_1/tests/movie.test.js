const { getMovies, getMovieById, addMovie } = require("../movie")

describe("Movie Functions", () => {
  it("shoud get all movies", () => {
    let movies = getMovies()
    expect(movies.length).toBe(4)
    expect(movies).toEqual([
      { id: 1, title: "The Shawshank Redemption", director: "Frank Darabont" },
      { id: 2, title: "The Godfather", director: "Francis Ford Coppola" },
      { id: 3, title: "The Dark Knight", director: "Christopher Nolan" },
      { id: 4, title: "Pulp Fiction", director: "Quentin Tarantino" },
    ])
  })

  it("should get a movie by id", () => {
    expect(getMovieById(1)).toEqual({
      id: 1,
      title: "The Shawshank Redemption",
      director: "Frank Darabont",
    })
  })

  it("should return undefined for a non-existing movie", () => {
    expect(getMovieById(999)).toBeUndefined()
    expect(getMovieById()).toBeUndefined()
  })

  it("should add a movie", () => {
    const newMovieData = {
      id: 5,
      title: "five title",
      director: "five director",
    }
    const newMovie = addMovie(newMovieData)
    expect(getMovieById(5)).toEqual(newMovieData)
  })
})
