require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
const {
  createItinerary,
  getItinerary,
} = require("./controllers/dataController")
const {
  getFlights,
  getHotels,
  getSites,
  getFlightsByOriginAndDestination,
  getHotelsByLocation,
  getSitesByLocation,
} = require("./controllers/itineraryController")
const { sequelize } = require("./models")

const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(cors())

app.post("/itinerary", createItinerary)
app.get("/itinerary/:id", getItinerary)
app.get("/data/flights", getFlights)
app.get("/data/hotels", getHotels)
app.get("/data/sites", getSites)
app.get("/flight/search", getFlightsByOriginAndDestination)
app.get("/hotel/search", getHotelsByLocation)
app.get("/site/search", getSitesByLocation)

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection established")
  })
  .catch((error) => {
    console.error("Database connection failed:", error)
  })

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
