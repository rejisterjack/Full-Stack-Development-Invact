const isFilePresent = (req, res, next) => {
  if (!req.files) {
    return res.status(400).json({ message: "Please upload a file" })
  }
  if (Array.isArray(req.files) && req.files.length === 0) {
    return res.status(400).json({ message: "Please upload a file" })
  }
  next()
}

module.exports = isFilePresent
