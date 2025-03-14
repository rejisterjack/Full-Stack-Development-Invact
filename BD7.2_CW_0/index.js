const initializeDatabase = require("./db/db.connect")
const Post = require("./models/post.model")

initializeDatabase()

const getAllPosts = async () => {
  try {
    const posts = await Post.find().populate("author")
    console.log("All posts", posts)
  } catch (error) {
    console.error("Error fetching posts", error)
  }
}
