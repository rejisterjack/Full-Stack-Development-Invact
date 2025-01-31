const {
  app,
  port,
  validateUser,
  validateBook,
  validateReview,
} = require("./server")
const request = require("supertest")
const http = require("http")

jest.mock("./server", () => ({
  ...jest.requireActual("./server"),
  validateUser: jest.fn(),
  validateBook: jest.fn(),
  validateReview: jest.fn(),
}))

let server

beforeAll((done) => {
  server = http.createServer(app)
  server.listen(3001, done)
})

afterAll((done) => {
  server.close(done)
})

describe("POST /api/users", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it("should return 400 if user is invalid", async () => {
    validateUser.mockReturnValue("Name is required and should be a string")
    const res = await request(server)
      .post("/api/users")
      .send({ email: "hello@gmail.com" })
      .expect(400)
    expect(res.text).toBe("Name is required and should be a string")
  })

  it("should return 201 if user is valid", async () => {
    validateUser.mockReturnValue()
    const res = await request(server)
      .post("/api/users")
      .send({ name: "Alice", email: "hello@gmail.com" })
      .expect(201)
    expect(res.body).toEqual({ id: 1, name: "Alice", email: "hello@gmail.com" })
  })

  it("should return 400 if user is invalid", async () => {
    validateUser.mockReturnValue("Email is required and should be a string")
    const res = await request(server)
      .post("/api/users")
      .send({ name: "hello world" })
      .expect(400)
    expect(res.text).toBe("Email is required and should be a string")
  })
})

describe("POST /api/books", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it("should return 400 if book is invalid", async () => {
    validateBook.mockReturnValue("Title is required and should be a string")
    const res = await request(server)
      .post("/api/books")
      .send({ author: "Herman Melville" })
      .expect(400)
    expect(res.text).toBe("Title is required and should be a string")
  })

  it("should return 201 if book is valid", async () => {
    validateBook.mockReturnValue()
    const res = await request(server)
      .post("/api/books")
      .send({ title: "Moby Dick", author: "Herman Melville" })
      .expect(201)
    expect(res.body).toEqual({
      id: 1,
      title: "Moby Dick",
      author: "Herman Melville",
    })
  })

  it("should return 400 if book is invalid", async () => {
    validateBook.mockReturnValue("Author is required and should be a string")
    const res = await request(server)
      .post("/api/books")
      .send({ title: "Moby Dick" })
      .expect(400)
    expect(res.text).toBe("Author is required and should be a string")
  })
})

describe("POST /api/reviews", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it("should return 400 if review is invalid", async () => {
    validateReview.mockReturnValue("Content is required and should be a string")
    const res = await request(server)
      .post("/api/reviews")
      .send({ userId: 1 })
      .expect(400)
    expect(res.text).toBe("Content is required and should be a string")
  })

  it("should return 201 if review is valid", async () => {
    validateReview.mockReturnValue()
    const res = await request(server)
      .post("/api/reviews")
      .send({ content: "Great book!", userId: 1 })
      .expect(201)
    expect(res.body).toEqual({ id: 1, content: "Great book!", userId: 1 })
  })

  it("should return 400 if review is invalid", async () => {
    validateReview.mockReturnValue(
      "UserId is required and should be an integer"
    )
    const res = await request(server)
      .post("/api/reviews")
      .send({ content: "Great book!" })
      .expect(400)
    expect(res.text).toBe("UserId is required and should be an integer")
  })
})

describe("validateUser", () => {
  it("should return an error if name is missing", () => {
    const result = validateUser({ email: "test@example.com" })
    expect(result).toBe("Name is required and should be a string")
  })

  it("should return an error if name is not a string", () => {
    const result = validateUser({ name: 123, email: "test@example.com" })
    expect(result).toBe("Name is required and should be a string")
  })

  it("should return an error if email is missing", () => {
    const result = validateUser({ name: "Alice" })
    expect(result).toBe("Email is required and should be a string")
  })

  it("should return an error if email is not a string", () => {
    const result = validateUser({ name: "Alice", email: 123 })
    expect(result).toBe("Email is required and should be a string")
  })

  it("should return undefined if user is valid", () => {
    const result = validateUser({ name: "Alice", email: "test@example.com" })
    expect(result).toBeUndefined()
  })
})

describe("validateBook", () => {
  it("should return an error if title is missing", () => {
    const result = validateBook({ author: "Herman Melville" })
    expect(result).toBe("Title is required and should be a string")
  })

  it("should return an error if title is not a string", () => {
    const result = validateBook({ title: 123, author: "Herman Melville" })
    expect(result).toBe("Title is required and should be a string")
  })

  it("should return an error if author is missing", () => {
    const result = validateBook({ title: "Moby Dick" })
    expect(result).toBe("Author is required and should be a string")
  })

  it("should return an error if author is not a string", () => {
    const result = validateBook({ title: "Moby Dick", author: 123 })
    expect(result).toBe("Author is required and should be a string")
  })

  it("should return undefined if book is valid", () => {
    const result = validateBook({
      title: "Moby Dick",
      author: "Herman Melville",
    })
    expect(result).toBeUndefined()
  })
})

describe("validateReview", () => {
  it("should return an error if content is missing", () => {
    const result = validateReview({ userId: 1 })
    expect(result).toBe("Content is required and should be a string")
  })

  it("should return an error if content is not a string", () => {
    const result = validateReview({ content: 123, userId: 1 })
    expect(result).toBe("Content is required and should be a string")
  })

  it("should return an error if userId is missing", () => {
    const result = validateReview({ content: "Great book!" })
    expect(result).toBe("UserId is required and should be an integer")
  })

  it("should return an error if userId is not an integer", () => {
    const result = validateReview({ content: "Great book!", userId: "1" })
    expect(result).toBe("UserId is required and should be an integer")
  })

  it("should return undefined if review is valid", () => {
    const result = validateReview({ content: "Great book!", userId: 1 })
    expect(result).toBeUndefined()
  })
})
