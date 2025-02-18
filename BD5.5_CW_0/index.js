const express = require("express")
const { sequelize } = require("./lib")
const { post } = require("./models/post.model")
const cors = require("cors")
const { user } = require("./models/user.model")
const { like } = require("./models/like.model")
const { Op } = require("@sequelize/core")

const app = express()
const port = 3000

const posts = [
  {
    id: 1,
    name: "Post1",
    author: "Author1",
    content: "This is the content of post 1",
    title: "Title1",
  },
  {
    id: 2,
    name: "Post2",
    author: "Author2",
    content: "This is the content of post 2",
    title: "Title2",
  },
  {
    id: 3,
    name: "Post3",
    author: "Author3",
    content: "This is the content of post 3",
    title: "Title3",
  },
  {
    id: 4,
    name: "Post4",
    author: "Author4",
    content: "This is the content of post 4",
    title: "Title4",
  },
  {
    id: 5,
    name: "Post5",
    author: "Author5",
    content: "This is the content of post 5",
    title: "Title5",
  },
  {
    id: 6,
    name: "Post6",
    author: "Author6",
    content: "This is the content of post 6",
    title: "Title6",
  },
  {
    id: 7,
    name: "Post7",
    author: "Author7",
    content: "This is the content of post 7",
    title: "Title7",
  },
  {
    id: 8,
    name: "Post8",
    author: "Author8",
    content: "This is the content of post 8",
    title: "Title8",
  },
  {
    id: 9,
    name: "Post9",
    author: "Author9",
    content: "This is the content of post 9",
    title: "Title9",
  },
  {
    id: 10,
    name: "Post10",
    author: "Author10",
    content: "This is the content of post 10",
    title: "Title10",
  },
]

const users = [
  {
    id: 1,
    username: "user1",
    email: "user1@example.com",
    password: "password1",
  },
  {
    id: 2,
    username: "user2",
    email: "user2@example.com",
    password: "password2",
  },
  {
    id: 3,
    username: "user3",
    email: "user3@example.com",
    password: "password3",
  },
  {
    id: 4,
    username: "user4",
    email: "user4@example.com",
    password: "password4",
  },
  {
    id: 5,
    username: "user5",
    email: "user5@example.com",
    password: "password5",
  },
  {
    id: 6,
    username: "user6",
    email: "user6@example.com",
    password: "password6",
  },
  {
    id: 7,
    username: "user7",
    email: "user7@example.com",
    password: "password7",
  },
  {
    id: 8,
    username: "user8",
    email: "user8@example.com",
    password: "password8",
  },
  {
    id: 9,
    username: "user9",
    email: "user9@example.com",
    password: "password9",
  },
  {
    id: 10,
    username: "user10",
    email: "user10@example.com",
    password: "password10",
  },
]

app.use(express.static("static"))
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.send("server is on!")
})

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true })
    await post.bulkCreate(posts)
    await user.bulkCreate(users)
    res.status(200).json({ message: "Database seeded successfully!" })
  } catch (err) {
    res.status(500).json({ error: err.response })
  }
})

app.get("/posts", async (req, res) => {
  try {
    const posts = await post.findAll()
    if (posts.length === 0)
      return res.status(404).json({
        message: "No post found",
      })
    res.status(200).json({ posts })
  } catch (err) {
    res.status(500).json({ error: err.response })
  }
})

const handleCreatePost = async (postData) => {
  const newPostData = await post.create(postData)
  return newPostData
}

app.post("/posts/new", async (req, res) => {
  try {
    const postData = await handleCreatePost(req.body)
    res.status(200).json({
      postData,
    })
  } catch (err) {
    res.status(500).json({ error: err.response })
  }
})

const handleUpdatePost = async (id = 0, data = {}) => {
  let postData = await post.findOne({ where: { id } })
  if (!postData) return {}
  let updatedPostData = await postData.set(data).save()
  return updatedPostData
}

app.put("/posts/update/:id", async (req, res) => {
  try {
    const postData = await handleUpdatePost(+req.params.id, req.body.postData)
    res.status(200).json({
      postData,
    })
  } catch (err) {
    res.status(500).json({ error: err.response })
  }
})

const handleDeletePost = async (id = 0) => {
  const postData = await post.destroy({ where: { id } })
  if (postData === 0) {
    return { status: false }
  } else {
    return { status: true }
  }
}

app.delete("/posts/delete/:id", async (req, res) => {
  try {
    const postData = await handleDeletePost(+req.params.id)
    if (!postData.status) {
      return res.status(404).json({ message: "post not found" })
    }
    res.status(200).json({
      message: "post deleted successfully",
    })
  } catch (err) {
    res.status(500).json({ error: err.response })
  }
})

app.get("/users", async (req, res) => {
  try {
    const usersData = await user.findAll()
    if (usersData.length === 0)
      return res.status(404).json({
        message: "no users found",
      })
    res.status(200).json(usersData)
  } catch (err) {
    res.status(500).json({ error: err.response })
  }
})

const handleCreateUser = async (data) => {
  const userData = await user.create(data)
  return userData
}

app.post("/users/new", async (req, res) => {
  try {
    const userData = await handleCreateUser(req.body)
    res.status(200).json({ message: "user created successfully", userData })
  } catch (err) {
    res.status(500).json({ error: err.response })
  }
})

const handleUpdateUser = async (id = 0, data = {}) => {
  const currentUser = await user.findOne({
    where: { id },
  })
  if (currentUser === 0)
    return res.status(404).json({ message: "user not found" })
  let updatedUserData = await currentUser.set(data).save()
  return updatedUserData
}

app.put("/users/update/:id", async (req, res) => {
  try {
    const userData = handleUpdateUser(+req.params.id, req.body)
    res.status(200).json({ userData })
  } catch (err) {
    res.status(500).json({ error: err.response })
  }
})

const handleDeleteUser = async (id = 0) => {
  const currentUser = await user.destroy({ where: { id } })
  if (currentUser === 0) {
    return { status: false }
  } else {
    return { status: true }
  }
}

app.delete("/users/delete/:id", async (req, res) => {
  try {
    const currentUser = await handleDeleteUser(+req.params.id)
    if (!currentUser.status) {
      return res.status(404).json({
        message: "user not found",
      })
    }
    res.status(200).json({ message: "user deleted successfully" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

const handleLikePost = async (userId = 0, postId = 0) => {
  const likePost = await like.create({ userId, postId })
  return {
    message: "post liked successfully",
    likePost,
  }
}

app.get("/users/:id/like", async (req, res) => {
  try {
    const likePost = await handleLikePost(+req.params.id, req.query.postId)
    res.status(200).json(likePost)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

const handleDisLikePost = async (userId = 0, postId = 0) => {
  const dislikePost = await like.destroy({ where: { userId, postId } })
  if (dislikePost === 0) {
    return { message: "post not found" }
  } else {
    return { message: "post disliked successfully" }
  }
}

app.get("/users/:id/dislike", async (req, res) => {
  try {
    const disLikePost = await handleDisLikePost(
      +req.params.id,
      req.query.postId
    )
    res.status(200).json(disLikePost)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

const handleGetLikedPosts = async (userId) => {
  const likedPosts = await like.findAll({
    where: { userId },
    attributes: ["postId"],
  })
  if (likedPosts.length === 0) {
    return { status: false, message: "No liked posts found" }
  }
  const likedPostsData = await post.findAll({
    where: { id: { [Op.in]: likedPosts.map((post) => post.postId) } },
  })
  return { status: true, likedPosts, likedPostsData }
}

app.get("/users/:id/liked", async (req, res) => {
  try {
    const { status, likedPosts, likedPostsData, message } =
      await handleGetLikedPosts(+req.params.id)
    if (!status) {
      return res.status(404).json({ message })
    }
    res.status(200).json({ likedPosts, likedPostsData })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

const handleGetLikedPostsByTitle = async (userId, title) => {
  const likedPosts = await like.findAll({
    where: { userId },
    attributes: ["postId"],
  })
  if (likedPosts.length === 0) {
    return { status: false, message: "No liked posts found" }
  }
  const likedPostsData = await post.findAll({
    where: { id: { [Op.in]: likedPosts.map((post) => post.postId) }, title },
  })
  return { status: true, likedPosts, likedPostsData }
}

app.get("/users/:id/liked-titles", async (req, res) => {
  try {
    const { status, likedPosts, likedPostsData, message } =
      await handleGetLikedPostsByTitle(+req.params.id, req.query.title)
    if (!status) {
      return res.status(404).json({ message })
    }
    res.status(200).json({ likedPosts, likedPostsData })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
