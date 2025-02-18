const { getBooks, getBookById, addBook } = require("../book")

describe("Books Functions", () => {
  it("should get all books", () => {
    let books = getBooks()
    expect(books.length).toBe(4)
    expect(books).toEqual([
      { id: 1, title: "1984", author: "George Orwell" },
      {
        id: 2,
        title: "Brave New World",
        author: "Aldous Huxley",
      },
      {
        id: 3,
        title: "Fahrenheit 451",
        author: "Ray Bradbury",
      },
      {
        id: 4,
        title: "Foundation",
        author: "Isaac Asimov",
      },
    ])
  })

  it("should get a book by id", () => {
    expect(getBookById(1).id).toBe(1)
    expect(getBookById(2).id).toBe(2)
  })

  it("should return undefined for a non-existing book", () => {
    expect(getBookById()).toBeUndefined()
    expect(getBookById(99)).toBeUndefined()
  })

  it("should add a new book", () => {
    let newBook = { title: "New Book", author: "Author Name" }
    let addedBook = addBook(newBook)
    expect(addedBook).toEqual({
      id: getBooks().length,
      title: "New Book",
      author: "Author Name",
    })
  })
})
