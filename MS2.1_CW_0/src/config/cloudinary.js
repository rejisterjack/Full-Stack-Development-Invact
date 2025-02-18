const cloudinary = require("cloudinary").v2
require("dotenv").config()
const crypto = require("crypto")

const cloudinaryConfig = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })
}

const generateSignature = async (paramsToSign) => {
  const { api_secret } = cloudinary.config()
  const sortedParams = Object.keys(paramsToSign)
    .sort()
    .map((key) => `${key}=${paramsToSign[key]}`)
    .join("&")

  const signature = crypto
    .createHash("sha1")
    .update(`${sortedParams}${api_secret}`)
    .digest("hex")

  return signature
}

const uploadToCloudinary = async (file) => {
  const timestamp = Math.round(new Date().getTime() / 1000)
  const paramsToSign = {
    timestamp,
  }
  const signature = await generateSignature(paramsToSign)
  return await cloudinary.uploader.upload(file, {
    folder: "Invact",
    ...paramsToSign,
    signature,
    api_key: process.env.CLOUDINARY_API_KEY,
  })
}

module.exports = { cloudinaryConfig, generateSignature, uploadToCloudinary }
