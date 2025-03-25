const rateLimit = new Map()

const rateLimiter = (req, res, next) => {
  const ip = req.ip
  const now = Date.now()

  if (!rateLimit.has(ip)) {
    rateLimit.set(ip, [])
  }

  let timestamps = rateLimit.get(ip)

  timestamps = timestamps.filter((timestamp) => now - timestamp < 60000)

  if (timestamps.length >= 5) {
    return res
      .status(429)
      .json({ error: "Too many login attempts. Try again later." })
  }

  timestamps.push(now)

  rateLimit.set(ip, timestamps)

  next()
}

module.exports = rateLimiter
