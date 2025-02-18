const express = require("express")
const app = express()
app.use(express.json())

const port = 3000

let reviews = [
  { id: 1, content: "Great product!", userId: 1 },
  { id: 2, content: "Not bad, could be better.", userId: 2 },
]

let users = [
  { id: 1, name: "John Doe", email: "john.doe@example.com" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
]

const getAllReviews = () => reviews
const getReviewById = (id) => reviews.find((review) => review.id === id)
const addReview = (content, userId) => {
  const newReview = { id: reviews.length + 1, content, userId }
  reviews.push(newReview)
  return newReview
}

const getUserById = (id) => users.find((user) => user.id === id)
const addUser = (name, email) => {
  const newUser = { id: users.length + 1, name, email }
  users.push(newUser)
  return newUser
}

app.get("/reviews", (req, res) => {
  res.json(getAllReviews())
})

app.get("/reviews/details/:id", (req, res) => {
  const review = getReviewById(parseInt(req.params.id))
  if (review) {
    res.json(review)
  } else {
    res.status(404).send("Review not found")
  }
})

app.post("/reviews/new", (req, res) => {
  const { content, userId } = req.body
  const newReview = addReview(content, userId)
  res.status(201).json(newReview)
})

app.get("/users/details/:id", (req, res) => {
  const user = getUserById(parseInt(req.params.id))
  if (user) {
    res.json(user)
  } else {
    res.status(404).send("User not found")
  }
})

app.post("/users/new", (req, res) => {
  const { name, email } = req.body
  const newUser = addUser(name, email)
  res.status(201).json(newUser)
})

module.exports = {
  app,
  getAllReviews,
  getReviewById,
  addReview,
  getUserById,
  addUser,
}
