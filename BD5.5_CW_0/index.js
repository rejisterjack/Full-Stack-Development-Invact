const express = require("express");
const { sequelize } = require("./lib");
const { post } = require("./models/post.model");
const cors = require("cors");
const { user } = require("./models/user.model");

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
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("server is on!");
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
  return newPostData;
};

app.post("/posts/new", async (req, res) => {
  try {
    const postData = await handleCreatePost(req.body);
    res.status(200).json({
      postData,
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

app.put("/posts/update/:id", async (req, res) => {
  try {
    const postData = await handleUpdatePost(+req.params.id, req.body.postData);
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

app.delete("/posts/delete/:id", async (req, res) => {
  try {
    const postData = await handleDeletePost(+req.params.id);
    if (!postData.status) {
      return res.status(404).json({ message: "post not found" });
    }
    res.status(200).json({
      message: "post deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.response });
  }
});

app.get("/users", async (req, res) => {
  try {
    const usersData = await user.findAll();
    if (usersData.length === 0)
      return res.status(404).json({
        message: "no users found",
      });
    res.status(200).json(usersData);
  } catch (err) {
    res.status(500).json({ error: err.response });
  }
});

const handleCreateUser = async (data) => {
  const userData = await user.create(data);
  return userData;
};

app.post("/users/new", async (req, res) => {
  try {
    const userData = await handleCreateUser(req.body);
    res.status(200).json({ message: "user created successfully", userData });
  } catch (err) {
    res.status(500).json({ error: err.response });
  }
});

const handleUpdateUser = async (id = 0, data = {}) => {
  const currentUser = await user.findOne({
    where: { id },
  });
  if (currentUser === 0)
    return res.status(404).json({ message: "user not found" });
  let updatedUserData = await currentUser.set(data).save();
  return updatedUserData;
};

app.put("/users/update/:id", async (req, res) => {
  try {
    const userData = handleUpdateUser(+req.params.id, req.body);
    res.status(200).json({ userData });
  } catch (err) {
    res.status(500).json({ error: err.response });
  }
});

const handleDeleteUser = async (id = 0) => {
  const currentUser = await user.destroy({ where: { id } });
  if (currentUser === 0) {
    return { status: false };
  } else {
    return { status: true };
  }
};

app.delete("/users/delete/:id", async (req, res) => {
  try {
    const currentUser = await handleDeleteUser(+req.params.id);
    if (!currentUser.status) {
      return res.status(404).json({
        message: "user not found",
      });
    }
    res.status(200).json({ message: "user deleted successfully"});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
