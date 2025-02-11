require("dotenv").config()
const express = require("express")
const axiosInstance = require("./lib/axios")

const PORT = process.env.PORT || 8000

const app = express()

app.get("/", (req, res) => {
  res.send("Hello World")
})

const getFlight = async (origin, destination) => {
  try {
    const response = await axiosInstance.get(`/flights/search`, {
      params: {
        origin,
        destination,
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

// getFlight("bengaluru", "dehradun")
//   .then((data) => {
//     console.log(data)
//   })
//   .catch((error) => {
//     console.error(error)
//   })

const getConcertsByArtistAndCity = async (artist, city) => {
  try {
    const response = await axiosInstance.get(`/concerts/search`, {
      params: {
        artist,
        city,
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

// getConcertsByArtistAndCity("Taylor Swift", "Las Vegas")
//   .then((data) => {
//     console.log(data)
//   })
//   .catch((error) => {
//     console.error(error)
//   })

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
