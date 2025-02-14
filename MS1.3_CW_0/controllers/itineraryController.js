const { default: axios } = require("axios")
const {
  validateFlightQueryParams,
  validateHotelQueryParams,
  validateSiteQueryParams,
} = require("../validations")
const axiosInstance = require("../lib/axios.lib")

const getFlightsByOriginAndDestination = async (req, res) => {
  const errors = validateFlightQueryParams(req.query)

  if (errors.length > 0) return res.status(400).json({ errors })

  try {
    const response = await axiosInstance.get(
      `/flights/search?origin=${req.query.origin}&destination=${req.query.destination}`
    )
    res.json(response.data)
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Error fetching flight details")
  }
}

const getHotelsByLocation = async (req, res) => {
  const errors = validateHotelQueryParams(req.query)

  if (errors.length > 0) return res.status(400).json({ errors })

  try {
    const response = await axiosInstance.get(
      `/hotels/search?location=${req.query.location}`
    )
    res.json(response.data)
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Error fetching hotels by location")
  }
}

const getSitesByLocation = async (req, res) => {
  const errors = validateSiteQueryParams(req.query)

  if (errors.length > 0) return res.status(400).json({ errors })

  try {
    const response = await axiosInstance.get(
      `/sites/search?location=${req.query.location}`
    )
    res.json(response.data)
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Error fetching sites by location")
  }
}

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
  getFlightsByOriginAndDestination,
  getHotelsByLocation,
  getSitesByLocation,
}
