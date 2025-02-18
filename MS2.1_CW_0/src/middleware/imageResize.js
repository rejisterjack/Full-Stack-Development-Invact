const sharp = require("sharp")
const fs = require("fs")
const path = require("path")

const imageResize = async (req, res, next) => {
  try {
    const originalFilePath = req.files[0].path
    const parsePath = path.parse(originalFilePath)
    const outputFilePath = path.join(
      parsePath.dir,
      `${parsePath.name}-resized$.jpeg`
    )

    await sharp(originalFilePath)
      .resize({ width: 1500 })
      .jpeg({
        quality: 100,
        chromaSubsampling: "4:4:4",
        mozjpeg: true,
        trellisQuantisation: true,
        overshootDeringing: true,
        optimizeScans: true,
        optimizeCoding: true,
        quantisationTable: 2,
      })
      .toFile(outputFilePath)
    req.files[0].path = outputFilePath
    req.originalFilePath = originalFilePath
    next()
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

module.exports = imageResize
