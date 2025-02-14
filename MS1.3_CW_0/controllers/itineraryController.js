const { default: axios } = require("axios")

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    "Content-Type": "application/json",
    CLIENT_KEY: process.env.CLIENT_KEY,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
  },
})

const getFlights = async (req, res) => {
  try {
    const response = await axiosInstance.get(
      `/flights?test_error=${req.query.test_error}&rate_limit=${req.query.rate_limit}`
    )
    res.send(response.data)
  } catch (error) {
    console.log(error.message)

    if (error.response.status === 429) {
      res.status(429).send("Rate limit exceeded")
      return
    } else if (
      error.response.status === 500 &&
      error.response.data.error === "Simulated error for testing purposes"
    ) {
      res.status(500).send("Simulated error for testing purposes")
      return
    }
    res.status(500).send("Error fetching flights")
  }
}

const getHotels = async (req, res) => {
  try {
    const response = await axiosInstance.get("/hotels")
    res.send(response.data)
  } catch (error) {
    console.log(error.message)

    if (error.response.status === 429) {
      res.status(429).send("Rate limit exceeded")
      return
    } else if (
      error.response.status === 500 &&
      error.response.data.error === "Simulated error for testing purposes"
    ) {
      res.status(500).send("Simulated error for testing purposes")
      return
    }

    res.status(500).send("Error fetching hotels")
  }
}

const getSites = async (req, res) => {
  try {
    const response = await axiosInstance.get("/sites")
    res.send(response.data)
  } catch (error) {
    console.log(error.message)

    if (error.response.status === 429) {
      res.status(429).send("Rate limit exceeded")
      return
    } else if (
      error.response.status === 500 &&
      error.response.data.error === "Simulated error for testing purposes"
    ) {
      res.status(500).send("Simulated error for testing purposes")
      return
    }

    res.status(500).send("Error fetching sites")
  }
}

module.exports = {
  getFlights,
  getHotels,
  getSites,
}
