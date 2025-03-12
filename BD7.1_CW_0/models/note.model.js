const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    category: {
      type: String,
      enum: ["work", "personal", "misc"],
      default: "misc",
    },
    tags: [String],
  },
  {
    timestamps: true,
  }
)
