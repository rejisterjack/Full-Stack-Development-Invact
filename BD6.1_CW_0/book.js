const books = [
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
]

function getBooks() {
  return books
}

function getBookById(id) {
  return books.find((book) => book.id === parseInt(id))
}

function addBook(book) {
  const newBook = {
    id: books.length + 1,
    title: book.title,
    author: book.author,
  }
  books.push(newBook)
  return newBook
}

module.exports = {
  getBooks,
  addBook,
  getBookById,
  books
}
