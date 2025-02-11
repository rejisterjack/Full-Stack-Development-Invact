const axios = require("axios")
require("dotenv").config()

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    CLIENT_KEY: process.env.CLIENT_KEY,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
  },
})

module.exports = axiosInstance