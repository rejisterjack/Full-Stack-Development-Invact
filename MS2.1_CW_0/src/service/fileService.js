const { uploadToCloudinary, cloudinaryConfig } = require("../config/cloudinary")
const fs = require("fs")

cloudinaryConfig()

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
    console.log(error.message)
    throw new Error(error.message)
  }
}

module.exports = { cloudinaryUpload }
