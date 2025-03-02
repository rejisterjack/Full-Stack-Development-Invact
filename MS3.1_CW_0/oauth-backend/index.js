const express = require("express")
const cors = require("cors")
const { default: axios } = require("axios")
require("dotenv").config()

const cookieParser = require("cookie-parser")
const { setSecureCookie } = require("./services")

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(cors({
  credentials: true,
  origin: process.env.FRONTEND_URL
}))
app.use(cookieParser())

app.get("/", (req, res) => {
  res.send(`
    <h1>Hello World!</h1>
    <button onclick="alert('Button clicked!')">Click Me</button>
`)
})

app.get("/auth/github", (req, res) => {
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user,repo, security_events`
  res.redirect(githubAuthUrl)
})

app.get("/auth/github/callback", async (req, res) => {
  const { code } = req.query
  try {
    const tokenResponse = await axios.post(
      `https://github.com/login/oauth/access_token`,
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    )

    const accessToken = tokenResponse.data.access_token
    // res.cookie("access_token", accessToken)
    setSecureCookie(res, accessToken)

    return res.redirect(`${process.env.FRONTEND_URL}/v2/profile/github`)
  } catch (error) {
    res.status(500).json({ message: "Failed to authenticate with Github" })
  }
})

app.get("/user/profile/github", async (req, res) => {
  const accessToken = req.cookies.access_token
  if (!accessToken) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  try {
    const userResponse = await axios.get(`https://api.github.com/user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    const user = userResponse.data
    return res.json({user})
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user profile" })
  }
})

app.get("/auth/google", (req, res) => {
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile`
  res.redirect(googleAuthUrl)
})

app.get("/auth/google/callback", async (req, res) => {
  const { code } = req.query
  if (!code) {
    return res.status(400).json({ message: "Code not provided" })
  }
  try {
    const tokenResponse = await axios.post(
      `https://oauth2.googleapis.com/token`,
      {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        code,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )

    const accessToken = tokenResponse.data.access_token
    // res.cookie("access_token", accessToken)
    setSecureCookie(res, accessToken)
    return res.redirect(`${process.env.FRONTEND_URL}/v2/profile/google`)
  } catch (error) {
    res.status(500).json({ message: "Failed to authenticate with Google" })
  }
})

app.get("/user/profile/google", async (req, res) => {
  const accessToken = req.cookies.access_token
  if (!accessToken) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  try {
    const userResponse = await axios.get(
      `https://www.googleapis.com/oauth2/v2/userinfo?alt=json`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    const user = userResponse.data
    return res.json({user})
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user profile" })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
