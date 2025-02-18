const {
  app,
  getAllGames,
  getGameById,
  addGame,
  getDeveloperById,
  addDeveloper,
} = require("./server")
const http = require("http")
const request = require("supertest")

jest.mock("./server", () => ({
  ...jest.requireActual("./server"),
  getAllGames: jest.fn(),
  getGameById: jest.fn(),
  addGame: jest.fn(),
  getDeveloperById: jest.fn(),
  addDeveloper: jest.fn(),
}))

let server

beforeAll((done) => {
  server = http.createServer(app)
  server.listen(3001, done)
})

afterAll((done) => {
  server.close(done)
})

describe("Games Test Cases", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should get all games", async () => {
    const mockResult = [
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
    getAllGames.mockResolvedValue(mockResult)
    const result = await request(server).get("/games")
    expect(result.statusCode).toEqual(200)
    expect(result.body).toEqual(mockResult)
  })

  it("test get by id", async () => {
    const mockResult = {
      id: 1,
      title: "The Legend of Zelda",
      genre: "Adventure",
      developer: "Nintendo",
    }
    getGameById.mockResolvedValue(mockResult)
    const result = await request(server).get("/games/details/1")
    expect(result.status).toEqual(200)
    expect(result.body).toEqual(mockResult)
  })

  it("test get fame by non-existent id", async () => {
    getGameById.mockResolvedValue(null)
    const result = await request(server).get("/games/details/999")
    expect(result.status).toEqual(404)
  })

  it("should add a new game", async () => {
    const mockResult = {
      id: 3,
      title: "title",
      genre: "genre",
      developer: "dev",
    }
    addGame.mockResolvedValue(mockResult)
    const result = await request(server).post("/games/new").send({
      title: "title",
      genre: "genre",
      developer: "dev",
    })
    expect(result.statusCode).toEqual(200)
    expect(result.body).toEqual(mockResult)
  })

  it("should test get developer by id", async () => {
    const mockResult = { id: 1, name: "Nintendo", country: "Japan" }
    getDeveloperById.mockResolvedValue(mockResult)
    const result = await request(server).get("/developers/details/1")
    expect(result.statusCode).toEqual(200)
    expect(result.body).toEqual(mockResult)
  })

  it("should test get developer by non existent id", async () => {
    getDeveloperById.mockResolvedValue(null)
    const result = await request(server).get("/developers/details/990")
    expect(result.statusCode).toEqual(404)
  })

  it("should test add a new developer", async () => {
    const mockResult = {
      id: 3,
      name: "three",
      country: "three",
    }
    addDeveloper.mockResolvedValue(mockResult)
    const result = await request(server).post("/developers/new").send({
      name: "three",
      country: "three",
    })
    expect(result.statusCode).toEqual(200)
    expect(result.body).toEqual(mockResult)
  })
})
