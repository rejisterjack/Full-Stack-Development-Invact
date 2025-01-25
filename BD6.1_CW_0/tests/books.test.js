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
})
