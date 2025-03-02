const setSecureCookie = (res, token) => {
  res.cookie("access_token", token, {
    httpOnly: true,
    maxAge: 3600000,
  })
  return res
}

module.exports = {
  setSecureCookie,
}
