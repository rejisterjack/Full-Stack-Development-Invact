const express = require("express")
const app = express()

const port = 3000
app.use(express.json())

app.get("/", (req, res) => {
  res.send("server is on!")
})

app.listen(port, () => {
  console.log("server is running!")
})
