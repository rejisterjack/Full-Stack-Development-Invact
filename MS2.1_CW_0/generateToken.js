const jwt = require("jsonwebtoken")
require("dotenv").config()

const secret = process.env.JWT_SECRET

const payload = { id: "12345", username: "testuser", role: "user" }

const token = jwt.sign(payload, secret, { expiresIn: "1h" })

console.log("Generated Token:", token)

try {
  const verified = jwt.verify(token, secret)
  console.log("Token is valid:", verified)
} catch (err) {
  console.error("JWT Verification Error:", err.message)
}
