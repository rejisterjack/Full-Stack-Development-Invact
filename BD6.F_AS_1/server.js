const express = require("express")
const app = express()

const port = 3000
app.use(express.json())

let theatres = [
  { theatreId: 1, name: "Regal Cinemas", location: "Downtown" },
  { theatreId: 2, name: "AMC Theatres", location: "Midtown" },
  { theatreId: 3, name: "Cinemark", location: "Uptown" },
]

let shows = [
  { showId: 1, title: "The Lion King", theatreId: 1, time: "7:00 PM" },
  { showId: 2, title: "Hamilton", theatreId: 2, time: "8:00 PM" },
  { showId: 3, title: "Wicked", theatreId: 3, time: "9:00 PM" },
  { showId: 4, title: "Les Misérables", theatreId: 1, time: "6:00 PM" },
]

const validateShow = (show) => {
  if (!show.title || typeof show.title !== "string") {
    return { valid: false, message: "Title is required and should be a string" }
  }
  if (!show.theatreId || typeof show.theatreId !== "number") {
    return {
      valid: false,
      message: "Theatre ID is required and should be a number",
    }
  }
  if (!show.time || typeof show.time !== "string") {
    return { valid: false, message: "Time is required and should be a string" }
  }
  return { valid: true }
}

const getAllShows = () => shows
const getShowById = (id) => shows.find((s) => s.id === +id)
const addNewShow = ({ title, theatreId, time }) => {
  const newShow = {
    showId: shows.length + 1,
    title,
    theatreId,
    time,
  }
  const validation = validateShow(newShow)
  if (!validation.valid) {
    throw new Error(validation.message)
  }
  shows.push(newShow)
  return newShow
}

app.get("/shows", (req, res) => {
  const shows = getAllShows()
  res.status(200).json(shows)
})

app.get("/show/:id", (req, res) => {
  const show = getShowById(req.params.id)
  if (!show) return res.status(404).json({ message: "Show not found" })
  res.status(200).json(show)
})

app.post("/shows/new", (req, res) => {
  try {
    const newShow = addNewShow(req.body)
    res.status(201).json(newShow)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.get("/", (req, res) => {
  res.send("server is on!")
})

module.exports = {
  app,
  port,
  getAllShows,
  getShowById,
  addNewShow,
  validateShow,
}
