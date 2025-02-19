const { UNEXPECTED_FILE_TYPE } = require("../constants/file")

const multer = require("multer")
const { Router } = require("express")
const upload = require("../middleware/fileUpload")
const imageResize = require("../middleware/imageResize")
const isFilePresent = require("../middleware/validators/isFilePresent")
const authenticateJWT = require("../middleware/authentication")

const fileRouter = Router()

fileRouter.post(
  "/upload",
  authenticateJWT,
  (req, res, next) => {
    upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === UNEXPECTED_FILE_TYPE.code) {
          return res.status(400).json({ message: UNEXPECTED_FILE_TYPE.message })
        } else {
          return res.status(500).json({ message: err.message })
        }
      } else {
        next()
      }
    })
  },
  (req, res) => {
    res.json({ message: "File uploaded successfully" })
  },
  imageResize,
  isFilePresent
)

module.exports = fileRouter
