const express = require("express");
const { resolve } = require("path");
const { sequelize } = require("./lib");
const { post } = require("./models/post.model");
const cors = require("cors");

const app = express();
const port = 3000;
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
    author: "Author1",
    content: "This is the content of post 3",
    title: "Title3",
  },
];

app.use(express.static("static"));
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(resolve(__dirname, "pages/index.html"));
});

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await post.bulkCreate(posts);
    res.status(200).json({ message: "Database seeded successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.response });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await post.findAll();
    if (posts.length === 0)
      return res.status(404).json({
        message: "No post found",
      });
    res.status(200).json({ posts });
  } catch (err) {
    res.status(500).json({ error: err.response });
  }
});

const handleCreatePost = async (postData) => {
  const newPostData = await post.create(postData);
  return { newPostData };
};

app.post("/posts/new", async (req, res) => {
  try {
    const postData = await handleCreatePost(req.body);
    res.status(200).json({
      postData: postData.newPostData,
    });
  } catch (err) {
    res.status(500).json({ error: err.response });
  }
});

const handleUpdatePost = async (id = 0, data = {}) => {
  let postData = await post.findOne({ where: { id } });
  if (!postData) return {};
  let updatedPostData = await postData.set(data).save();
  return updatedPostData;
};

app.post("/posts/update/:id", async (req, res) => {
  try {
    const postData = await handleUpdatePost(+req.params.id, req.body);
    res.status(200).json({
      postData,
    });
  } catch (err) {
    res.status(500).json({ error: err.response });
  }
});

const handleDeletePost = async (id = 0) => {
  const postData = await post.destroy({ where: { id } });
  if (postData === 0) {
    return { status: false };
  } else {
    return { status: true };
  }
};

app.post("/posts/delete", async (req, res) => {
  try {
    const postData = await handleDeletePost(+req.params.id);
    if (!postData.status) {
      return res.status(404).json({ message: "Track not found" });
    }
    res.status(200).json({
      postData,
    });
  } catch (err) {
    res.status(500).json({ error: err.response });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
