const jwt = require("jsonwebtoken")
require("dotenv").config()

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1IiwidXNlcm5hbWUiOiJ0ZXN0dXNlciIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzM5OTkwNDQyLCJleHAiOjE3Mzk5OTQwNDJ9.a93oxP54OmIYyj_Rp55nr7E6JkonAvqjVPHJ8OhKiQ4"
const secret = process.env.JWT_SECRET

try {
  const verified = jwt.verify(token, secret)
  console.log("Token is valid:", verified)
} catch (err) {
  console.error("JWT Verification Error:", err.message)
}
