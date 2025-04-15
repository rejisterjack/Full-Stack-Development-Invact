const { User } = require("../models")
const { Op } = require("sequelize")

exports.registerUser = async (req, res) => {
  try {
    const { username, email } = req.body

    if (!username || !email) {
      return res.status(400).json({ error: "Username and email are required" })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" })
    }

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    })

    if (existingUser) {
      return res.status(409).json({ error: "Username or email already exists" })
    }

    const user = await User.create({ username, email })

    return res.status(201).json({
      message: "User created successfully",
      user,
    })
  } catch (error) {
    console.error("Error creating user:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params

    const user = await User.findByPk(id)
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    return res.status(200).json({ user })
  } catch (error) {
    console.error("Error fetching user:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}
