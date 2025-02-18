const validateFlightQueryParams = (queryParams) => {
  const errors = []

  if (!queryParams.origin) {
    errors.push("Origin is required")
  }

  if (!queryParams.destination) {
    errors.push("Destination is required")
  }

  return errors
}

const validateSiteQueryParams = (queryParams) => {
  const errors = []

  if (!queryParams.siteName) {
    errors.push("Site name is required")
  }

  if (!queryParams.location) {
    errors.push("Location is required")
  }

  return errors
}

const validateHotelQueryParams = (queryParams) => {
  const errors = []

  if (!queryParams.hotelName) {
    errors.push("Hotel name is required")
  }

  if (!queryParams.city) {
    errors.push("City is required")
  }

  return errors
}

module.exports = {
  validateFlightQueryParams,
  validateSiteQueryParams,
  validateHotelQueryParams,
}
