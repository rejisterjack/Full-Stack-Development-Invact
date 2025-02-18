const {
  app,
  getAllReviews,
  getReviewById,
  addReview,
  getUserById,
  addUser,
} = require("./server")
const request = require("supertest")
const http = require("http")

jest.mock("./server", () => ({
  ...jest.requireActual("./server"),
  getAllReviews: jest.fn(),
  getReviewById: jest.fn(),
  addReview: jest.fn(),
  getUserById: jest.fn(),
  addUser: jest.fn(),
}))

let server

beforeAll((done) => {
  server = http.createServer(app)
  server.listen(done)
})

afterAll((done) => {
  server.close(done)
})

describe("supertest test cases", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it("should retrive all revies", async () => {
    const mockResult = [
      { id: 1, content: "Great product!", userId: 1 },
      { id: 2, content: "Not bad, could be better.", userId: 2 },
    ]
    getAllReviews.mockResolvedValue(mockResult)
    const result = await request(server).get("/reviews")
    expect(result.statusCode).toEqual(200)
    expect(result.body).toEqual(mockResult)
  })
  it("should retrive a specific review by id", async () => {
    const mockResult = {
      id: 1,
      content: "Great product!",
      userId: 1,
    }
    getReviewById.mockResolvedValue(mockResult)
    const result = await request(server).get("/reviews/details/1")
    expect(result.statusCode).toEqual(200)
    expect(result.body).toEqual(mockResult)
  })

  it("should check if the user not present", async () => {
    getReviewById.mockResolvedValue(null)
    const result = await request(server).get("/reviews/details/999")
    expect(result.statusCode).toEqual(404)
  })

  it("should add a new reive", async () => {
    const mockResult = {
      id: 3,
      content: "Hello world",
      userId: 1,
    }
    addReview.mockResolvedValue(mockResult)
    const result = await request(server)
      .post("/reviews/new")
      .send({ content: "Hello world", userId: 1 })
    expect(result.statusCode).toEqual(201)
    expect(result.body).toEqual(mockResult)
  })

  it("should receive a specific user by id", async () => {
    const mockResult = {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
    }
    getUserById.mockResolvedValue(mockResult)
    const result = await request(server).get("/users/details/1")
    expect(result.status).toEqual(200)
    expect(result.body).toEqual(mockResult)
  })

  it("should check if the user not present", async () => {
    const result = await request(server).get("/users/details/999")
    expect(result.status).toEqual(404)
  })

  it("should add a new user", async () => {
    const mockUser = {
      id: 3,
      name: "hello world",
      email: "hello@gmail.com",
    }
    addUser.mockResolvedValue(mockUser)
    const result = await request(server)
      .post("/users/new")
      .send({ name: "hello world", email: "hello@gmail.com" })
    expect(result.statusCode).toEqual(201)
    expect(result.body).toEqual(mockUser)
  })
})
