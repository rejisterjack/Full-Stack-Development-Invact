const express = require("express");
const { sequelize } = require("./lib");
const { post } = require("./models/post.model");
const { error } = require("console");
const { where } = require("sequelize");

const app = express();
const port = 3000;
const posts = [
  {
    title: "Getting Started with Node.js",
    content:
      "This post will guide you through the basics of Node.js and how to set up a Node.js project.",
    author: "Alice Smith",
  },
  {
    title: "Advanced Express.js Techniques",
    content:
      "Learn advanced techniques and best practices for building applications with Express.js.",
    author: "Bob Johnson",
  },
  {
    title: "ORM with Sequelize",
    content:
      "An introduction to using Sequelize as an ORM for Node.js applications.",
    author: "Charlie Brown",
  },
  {
    title: "Boost Your JavaScript Skills",
    content:
      "A collection of useful tips and tricks to improve your JavaScript programming.",
    author: "Dana White",
  },
  {
    title: "Designing RESTful Services",
    content: "Guidelines and best practices for designing RESTful APIs.",
    author: "Evan Davis",
  },
  {
    title: "Mastering Asynchronous JavaScript",
    content:
      "Understand the concepts and patterns for writing asynchronous code in JavaScript.",
    author: "Fiona Green",
  },
  {
    title: "Modern Front-end Technologies",
    content:
      "Explore the latest tools and frameworks for front-end development.",
    author: "George King",
  },
  {
    title: "Advanced CSS Layouts",
    content: "Learn how to create complex layouts using CSS Grid and Flexbox.",
    author: "Hannah Lewis",
  },
  {
    title: "Getting Started with React",
    content: "A beginner's guide to building user interfaces with React.",
    author: "Ian Clark",
  },
  {
    title: "Writing Testable JavaScript Code",
    content:
      "An introduction to unit testing and test-driven development in JavaScript.",
    author: "Jane Miller",
  },
];

app.use(express.static("static"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is on!");
});

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await post.bulkCreate(posts);
    res.status(200).json({
      message: "Database seeded successfully!",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const postsData = await post.findAll();
    if (postsData.length === 0) {
      res.status(404).json({
        message: "No posts found",
      });
    }
    res.status(200).json({
      posts: postsData,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.post("/posts/new", async (req, res) => {
  try {
    const postData = req.body.newPost || {};
    const newPostData = await post.create(postData);
    res.status(200).json({
      post: newPostData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/posts/update/:id", async (req, res) => {
  try {
    const postData = req.body || {};
    const currentPost = await post.findOne({
      where: { id: req.params.id || 0 },
    });
    if (!currentPost)
      return res.status(404).json({
        message: "No post found",
      });
    const updatedData = await currentPost.set(postData).save();
    console.log("updatedData", updatedData);
    return res.status(200).json({
      message: "post updated successfully",
      post: updatedData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/posts/delete", async (req, res) => {
  try {
    const currentPost = await post.destroy({
      where: { id: req.body.id || 0 },
    });
    if (!currentPost)
      return res.status(404).json({
        message: "No post found",
      });
    return res.status(200).json({
      message: "post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`TravelEase API listening at http://localhost:${port}`);
});
