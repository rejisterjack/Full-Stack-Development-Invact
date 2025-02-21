const multer = require("multer")
const { UNEXPECTED_FILE_TYPE } = require("../constants/file")
const path = require("path")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "MS2.1_CW_0/uploads")
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb(
      new multer.MulterError(
        UNEXPECTED_FILE_TYPE.code,
        UNEXPECTED_FILE_TYPE.message
      )
    )
  }
}

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
}).array("file", 1)

module.exports = upload
