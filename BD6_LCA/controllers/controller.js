const jwt = require("jsonwebtoken")

const defaultUser = {
  email: "user@example.com",
  password: "password",
}

const login = (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).send("Email and password are required")
  }
  if (email !== defaultUser.email || password !== defaultUser.password) {
    return res.status(401).send("Invalid credentials")
  }
  res.status(200).json({
    success: true,
    token: jwt.sign({ email }, "my-secret-key", { expiresIn: "1h" }),
  })
}

module.exports = {
  login,
}
