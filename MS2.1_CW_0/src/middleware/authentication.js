const jwt = require("jsonwebtoken")
require("dotenv").config()

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Unauthorized1" })
  }
  const token = authHeader.split(" ")[1]

  if (!token) {
    return res.status(403).json({ message: "Unauthorized2" })
  }

  console.log(token, process.env.JWT_SECRET, "user")
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET)
    req.user = user
    next()
  } catch (err) {
    return res.status(403).json({ message: "Unauthorized3" })
  }
}

module.exports = authenticateJWT
