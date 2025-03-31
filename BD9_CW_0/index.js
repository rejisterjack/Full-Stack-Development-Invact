const express = require("express")
const cors = require("cors")
const { connectDB } = require("./connectDB")
require("dotenv").config()
const authRoutes = require("./routes/auth.routes")
const { Server } = require("socket.io")
const http = require("http")
const Messages = require("./models/Messages")
const User = require("./models/User")

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})

app.use(cors())
app.use(express.json())

app.use("/auth", authRoutes)

io.on("connection", (socket) => {
  console.log("New client connected", socket.id)

  socket.on("send_message", async (data) => {
    const { sender, receiver, message } = data
    const newMessage = new Messages({
      sender: sender,
      receiver: receiver,
      message: message,
    })
    await newMessage.save()
    io.emit("receive_message", data)
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id)
  })
})

app.get("/messages", async (req, res) => {
  const { sender, receiver } = req.query
  try {
    const messages = await Messages.find({
      $or: [
        { sender: sender, receiver: receiver },
        { sender: receiver, receiver: sender },
      ],
    }).sort({ createdAt: 1 })

    res.status(200).json(messages)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" })
  }
})

app.get("/users", async (req, res) => {
  const currentUser = req.query.currentUser
  try {
    const users = await User.find({ username: { $ne: currentUser } }).select(
      "-password"
    )
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" })
  }
})

connectDB()
  .then(() => {
    const port = process.env.PORT || 3000
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error)
    process.exit(1)
  })
