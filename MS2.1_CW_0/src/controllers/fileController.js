const { cloudinaryUpload } = require("../service/fileService")

const fileController = async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).json({ message: "No file uploaded" })
    }

    if (Array.isArray(req.files) && req.files.length > 1) {
      return res.status(400).json({ message: "Please upload only one file" })
    }

    const file = req.files[0]
    const response = await cloudinaryUpload(file)
    res
      .status(200)
      .json({ message: "File uploaded successfully", uploadResult: response })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = fileController
