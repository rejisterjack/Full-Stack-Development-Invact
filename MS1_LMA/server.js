const app = require("./app")
const db = require("./models")

const PORT = process.env.PORT || 8000

db.sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error)
  })
