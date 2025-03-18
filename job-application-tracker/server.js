const app = require("./app")
const connectDB = require("./config/connectDB")

connectDB().then(() => {
  app.listen(8000, () => {
    console.log("Server is running on http://localhost:8000")
  })
})
