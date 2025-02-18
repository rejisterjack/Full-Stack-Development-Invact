const { getMovies, getMovieById, addMovie, movies } = require("../movie")
const { app } = require("../server")

const http = require("http")

jest.mock("../movie", () => ({
  ...jest.requireActual("../movie"),
  getMovies: jest.fn(),
  getMovieById: jest.fn(),
  addMovie: jest.fn(),
}))

let server

beforeAll((done) => {
  server = http.createServer(app)
  server.listen(3001, done)
})

afterAll((done) => {
  server.close(done)
})

describe("Mock Movie Functions", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("Test get all movies", () => {
    getMovies.mockReturnValue(movies)
    const result = getMovies()
    expect(result).toEqual(movies)
    expect(getMovies).toHaveBeenCalled()
  })

  test("Test get movie by ID", () => {
    getMovieById.mockReturnValue(movies[0])
    const result = getMovieById(1)
    expect(result).toEqual(movies[0])
    expect(getMovieById).toHaveBeenCalledWith(1)
  })

  test("Test get movie by non-existent ID", () => {
    getMovieById.mockReturnValue(undefined)
    const result = getMovieById(999)
    expect(result).toBeUndefined()
    expect(getMovieById).toHaveBeenCalledWith(999)
  })

  test("Test add new movie", () => {
    let newMovie = {
      id: 5,
      title: "Pulp Fiction New",
      director: "Quentin Tarantino New",
    }
    addMovie.mockReturnValue(newMovie)
    const result = addMovie(newMovie)
    expect(result).toEqual(newMovie)
    expect(addMovie).toHaveBeenCalledWith(newMovie)
  })
})
