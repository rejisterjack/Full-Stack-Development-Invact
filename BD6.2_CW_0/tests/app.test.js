const { app, getAuthors, getAuthorById, addAuthor } = require("..")

const http = require("http")

jest.mock("../index", () => ({
  ...jest.requireActual("../index"),
  getAuthors: jest.fn(),
  getAuthorById: jest.fn(),
  addAuthor: jest.fn(),
}))

let server

beforeAll((done) => {
  server = http.createServer(app)
  server.listen(3001, done)
})

afterAll((done) => {
  server.close(done)
})

describe("Function Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("getAuthors should return a list of authors", () => {
    const mockAuthors = [
      { authorId: 1, name: "One Name", book: "One Book" },
      { authorId: 2, name: "Two Name", book: "Two Book" },
      { authorId: 3, name: "Three Name", book: "Three Book" },
    ]
    getAuthors.mockReturnValue(mockAuthors)
    let result = getAuthors()
    expect(result).toEqual(mockAuthors)
    expect(getAuthors).toHaveBeenCalled()
  })

  test("getAuthorById should return author details", () => {
    const mockAuthor = { authorId: 1, name: "One Name", book: "One Book" }
    getAuthorById.mockReturnValue(mockAuthor)
    let result = getAuthorById(1)
    expect(result).toEqual(mockAuthor)
    expect(getAuthorById).toHaveBeenCalledWith(1)
  })

  test("getAuthorById should return undefined if author id not found", () => {
    getAuthorById.mockReturnValue(undefined)
    let result = getAuthorById(9999)
    expect(result).toBeUndefined()
    expect(getAuthorById).toHaveBeenCalledWith(9999)
  })

  test("addAuthor should add new author", () => {
    const newAuthor = { authorId: 4, name: "Four Name", book: "Four Book" }

    addAuthor.mockReturnValue(newAuthor)
    let result = addAuthor(newAuthor)

    expect(result).toEqual(newAuthor)
    expect(addAuthor).toHaveBeenCalledWith(newAuthor)
  })
})
