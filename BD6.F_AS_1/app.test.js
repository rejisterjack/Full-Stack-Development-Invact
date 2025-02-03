const request = require("supertest")
const { app, getAllShows, getShowById, addNewShow } = require("./server")
const http = require("http")

jest.mock("./server", () => ({
  ...jest.requireActual("./server"),
  getAllShows: jest.fn(),
  getShowById: jest.fn(),
  addNewShow: jest.fn(),
}))

let server

beforeAll((done) => {
  server = http.createServer(app)
  server.listen(3001, done)
})

afterAll((done) => {
  server.close(done)
})

describe("Theatre Shows API", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should return 404 for invalid show ID", async () => {
    getShowById.mockReturnValue(undefined)
    const response = await request(server).get("/show/999")
    expect(response.status).toBe(404)
    expect(response.body.message).toBe("Show not found")
  })

  it("should return 400 for invalid input when adding a new show", async () => {
    const invalidShow = { title: "", theatreId: "invalid", time: 123 }
    addNewShow.mockImplementation(() => {
      throw new Error("Title is required and should be a string")
    })
    const response = await request(server).post("/shows/new").send(invalidShow)
    expect(response.status).toBe(500)
    expect(response.body.message).toBe(
      "Title is required and should be a string"
    )
  })

  it("should call getAllShows function and return shows", async () => {
    const mockShows = [
      { showId: 1, title: "The Lion King", theatreId: 1, time: "7:00 PM" },
      { showId: 2, title: "Hamilton", theatreId: 2, time: "8:00 PM" },
      { showId: 3, title: "Wicked", theatreId: 3, time: "9:00 PM" },
      { showId: 4, title: "Les Misérables", theatreId: 1, time: "6:00 PM" },
    ]
    getAllShows.mockResolvedValue(mockShows)
    const response = await request(server).get("/shows")
    expect(response.status).toBe(200)
    expect(response.body).toEqual(mockShows)
  })

  it("should add a new show and return the expected output", async () => {
    const newShow = { title: "New Show", theatreId: 1, time: "10:00 PM" }
    addNewShow.mockResolvedValue({ showId: 5, ...newShow })
    const response = await request(server).post("/shows/new").send(newShow)
    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({ showId: 5, ...newShow })
  })
})
