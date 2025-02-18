const { uploadToCloudinary } = require("../config/cloudinary")

const cloudinaryUpload = async (file) => {
  try {
    const cloudinaryResponse = await uploadToCloudinary(file.path)
    fs.unlinkSync(file.path, (err) => {
      if (err) {
        throw new Error(err.message)
      }
    })
    return cloudinaryResponse
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = { cloudinaryUpload }
