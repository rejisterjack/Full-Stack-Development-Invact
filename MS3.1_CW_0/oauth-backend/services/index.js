const setSecureCookie = (res, token) => {
  res.cookie("access_token", token, {
    httpOnly: false, // true for production
    secure: false, // true for production
    maxAge: 3600000,
  })
  return res
}

module.exports = {
  setSecureCookie,
}
