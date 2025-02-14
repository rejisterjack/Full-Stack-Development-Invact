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
    const response = await axiosInstance.get("/flights")
    res.send(response.data)
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Error fetching flights")
  }
}

const getHotels = async (req, res) => {
  try {
    const response = await axiosInstance.get("/hotels")
    res.send(response.data)
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Error fetching hotels")
  }
}

const getSites = async (req, res) => {
  try {
    const response = await axiosInstance.get("/sites")
    res.send(response.data)
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Error fetching sites")
  }
}

module.exports = {
  getFlights,
  getHotels,
  getSites,
}
