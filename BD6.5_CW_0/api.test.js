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

describe("Validation Functions", () => {
  describe("validateUser", () => {
    it("should return null for a valid user", () => {
      validateUser.mockReturnValue(undefined)
      const user = { name: "John Doe", email: "john@example.com" }
      const result = validateUser(user)
      expect(result).toBeUndefined()
    })

    it("should return an error if name is missing", () => {
      validateUser.mockReturnValue("Name is required and should be a string")
      const user = { email: "john@example.com" }
      const result = validateUser(user)
      expect(result).toBe("Name is required and should be a string")
    })

    it("should return an error if name is not a string", () => {
      validateUser.mockReturnValue("Name is required and should be a string")
      const user = { name: 123, email: "john@example.com" }
      const result = validateUser(user)
      expect(result).toBe("Name is required and should be a string")
    })

    it("should return an error if email is missing", () => {
      validateUser.mockReturnValue("Email is required and should be a string")
      const user = { name: "John Doe" }
      const result = validateUser(user)
      expect(result).toBe("Email is required and should be a string")
    })

    it("should return an error if email is not a string", () => {
      const user = { name: "John Doe", email: 123 }
      const result = validateUser(user)
      expect(result).toBe("Email is required and should be a string")
    })
  })

  describe("validateBook", () => {
    it("should return null for a valid book", () => {
      validateBook.mockReturnValue(undefined)
      const book = { title: "The Great Gatsby", author: "F. Scott Fitzgerald" }
      const result = validateBook(book)
      expect(result).toBeUndefined()
    })

    it("should return an error if title is missing", () => {
      validateBook.mockReturnValue("Title is required and should be a string")
      const book = { author: "F. Scott Fitzgerald" }
      const result = validateBook(book)
      expect(result).toBe("Title is required and should be a string")
    })

    it("should return an error if title is not a string", () => {
      validateBook.mockReturnValue("Title is required and should be a string")
      const book = { title: 123, author: "F. Scott Fitzgerald" }
      const result = validateBook(book)
      expect(result).toBe("Title is required and should be a string")
    })

    it("should return an error if author is missing", () => {
      validateBook.mockReturnValue("Author is required and should be a string")
      const book = { title: "The Great Gatsby" }
      const result = validateBook(book)
      expect(result).toBe("Author is required and should be a string")
    })

    it("should return an error if author is not a string", () => {
      validateBook.mockReturnValue("Author is required and should be a string")
      const book = { title: "The Great Gatsby", author: 123 }
      const result = validateBook(book)
      expect(result).toBe("Author is required and should be a string")
    })
  })

  describe("validateReview", () => {
    it("should return null for a valid review", () => {
      validateReview.mockReturnValue(undefined)
      const review = { content: "Great book!", userId: 1 }
      const result = validateReview(review)
      expect(result).toBeUndefined()
    })

    it("should return an error if content is missing", () => {
      validateReview.mockReturnValue(
        "Content is required and should be a string"
      )
      const review = { userId: 1 }
      const result = validateReview(review)
      expect(result).toBe("Content is required and should be a string")
    })

    it("should return an error if content is not a string", () => {
      validateReview.mockReturnValue(
        "Content is required and should be a string"
      )
      const review = { content: 123, userId: 1 }
      const result = validateReview(review)
      expect(result).toBe("Content is required and should be a string")
    })

    it("should return an error if userId is missing", () => {
      validateReview.mockReturnValue(
        "UserId is required and should be an integer"
      )
      const review = { content: "Great book!" }
      const result = validateReview(review)
      expect(result).toBe("UserId is required and should be an integer")
    })

    it("should return an error if userId is not an integer", () => {
      validateReview.mockReturnValue(
        "UserId is required and should be an integer"
      )
      const review = { content: "Great book!", userId: "1" }
      const result = validateReview(review)
      expect(result).toBe("UserId is required and should be an integer")
    })

    it("should return an error if userId does not correspond to an existing user", () => {
      validateReview.mockReturnValue(
        "UserId does not correspond to an existing user"
      )
      const review = { content: "Great book!", userId: 999 }
      const result = validateReview(review)
      expect(result).toBe("UserId does not correspond to an existing user")
    })
  })
})
 