const app = require("./app")
const db = require("./models")
const request = require("supertest")

beforeAll(async () => {
  await db.sequelize.sync({ force: true })
})

afterAll(async () => {
  await db.sequelize.close()
})

describe("User API", () => {
  test("should create a new user", async () => {
    const response = await request(app).post("/api/users").send({
      username: "testuser",
      email: "testuser@example.com",
    })
    expect(response.status).toBe(201)
    expect(response.body.message).toBe("User created successfully")
    expect(response.body.user).toHaveProperty("id")
  })

  test("should not create a user with an existing email", async () => {
    const response = await request(app).post("/api/users").send({
      username: "testuser2",
      email: "testuser@example.com",
    })
    expect(response.status).toBe(400)
    expect(response.body.message).toBe("Email already exists")
  })
})

describe("Book API", () => {
  test("should create a new book", async () => {
    const response = await request(app).post("/api/books").send({
      title: "Test Book",
      author: "Test Author",
      genre: "Fiction",
      publicationYear: 2023,
    })
    expect(response.status).toBe(201)
    expect(response.body.message).toBe("Book created successfully")
    expect(response.body.book).toHaveProperty("id")
  })

  test("should not create a duplicate book", async () => {
    const response = await request(app).post("/api/books").send({
      title: "Test Book",
      author: "Test Author",
    })
    expect(response.status).toBe(400)
    expect(response.body.message).toBe("Book already exists")
  })

  test("should search for books by title", async () => {
    const response = await request(app).get("/api/books/search").query({
      title: "Test",
    })
    expect(response.status).toBe(200)
    expect(response.body.books.length).toBeGreaterThan(0)
  })
})

describe("Reading List API", () => {
  let userId, bookId

  beforeAll(async () => {
    const user = await db.User.create({ username: "reader", email: "reader@example.com" })
    const book = await db.Book.create({ title: "Read Book", author: "Author" })
    userId = user.id
    bookId = book.id
  })

  test("should add a book to the reading list", async () => {
    const response = await request(app).post("/api/reading-list").send({
      userId,
      bookId,
      status: "Want to Read",
    })
    expect(response.status).toBe(201)
    expect(response.body.message).toBe("Entry added successfully")
    expect(response.body.readingList).toHaveProperty("id")
  })

  test("should update the reading list entry", async () => {
    const response = await request(app).post("/api/reading-list").send({
      userId,
      bookId,
      status: "Reading",
    })
    expect(response.status).toBe(200)
    expect(response.body.message).toBe("Entry updated successfully")
  })

  test("should retrieve the user's reading list", async () => {
    const response = await request(app).get(`/api/reading-list/${userId}`)
    expect(response.status).toBe(200)
    expect(response.body.readingList.length).toBeGreaterThan(0)
  })

  test("should remove a book from the reading list", async () => {
    const readingListEntry = await db.ReadingList.findOne({ where: { userId, bookId } })
    const response = await request(app).post(`/api/reading-list/${readingListEntry.id}`)
    expect(response.status).toBe(200)
    expect(response.body.message).toBe("Book removed from reading list")
  })
})

describe("Book Update API", () => {
  let bookId

  beforeAll(async () => {
    const book = await db.Book.create({ title: "Old Title", author: "Author" })
    bookId = book.id
  })

  test("should update book details", async () => {
    const response = await request(app).post(`/api/books/${bookId}`).send({
      title: "New Title",
      genre: "Non-Fiction",
    })
    expect(response.status).toBe(200)
    expect(response.body.message).toBe("Book details updated successfully")
    expect(response.body.book.title).toBe("New Title")
  })
})
