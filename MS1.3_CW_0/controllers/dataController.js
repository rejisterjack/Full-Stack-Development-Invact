const Flight = require("../models/flight")
const Hotel = require("../models/hotel")
const Itinerary = require("../models/itinerary")
const ItineraryItem = require("../models/itineraryItem")
const Site = require("../models/site")

const createItinerary = async (req, res) => {
  try {
    const { flights, hotels, sites, name } = req.body
    const itinerary = await Itinerary.create({
      name,
    })

    if (flights && flights.length > 0) {
      for (const flight of flights) {
        const savedFlight = await Flight.create(flight)
        await ItineraryItem.create({
          itineraryId: itinerary.id,
          type: "flight",
          itemId: savedFlight.id,
        })
      }
    }

    if (hotels && hotels.length > 0) {
      for (const hotel of hotels) {
        const savedHotel = await Hotel.create(hotel)
        await ItineraryItem.create({
          itineraryId: itinerary.id,
          type: "hotel",
          itemId: savedHotel.id,
        })
      }
    }

    if (sites && sites.length > 0) {
      for (const site of sites) {
        const savedSite = await Site.create(site)
        await ItineraryItem.create({
          itineraryId: itinerary.id,
          type: "site",
          itemId: savedSite.id,
        })
      }
    }

    res.status(201).json({
      message: "Itinerary created successfully",
      itinerary,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const getItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findByPk(req.params.id, {
      include: [
        {
          model: ItineraryItem,
          include: [
            {
              model: Flight,
              as: "flight",
            },
            {
              model: Hotel,
              as: "hotel",
            },
            {
              model: Site,
              as: "site",
            },
          ],
        },
      ],
    })

    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found" })
    }

    const items = await ItineraryItem.findAll({
      where: {
        itineraryId: itinerary.id,
      },
    })

    const flights = []
    const hotels = []
    const sites = []

    for (const item of items) {
      if (item.type === "flight") {
        const flight = await Flight.findByPk(item.itemId)
        if (flight) flights.push(flight)
      } else if (item.type === "hotel") {
        const hotel = await Hotel.findByPk(item.itemId)
        if (hotel) hotels.push(hotel)
      } else if (item.type === "site") {
        const site = await Site.findByPk(item.itemId)
        if (site) sites.push(site)
      }
    }

    itinerary.dataValues.flights = flights
    itinerary.dataValues.hotels = hotels
    itinerary.dataValues.sites = sites

    res.status(200).json({ itinerary, flights, hotels, sites })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  createItinerary,
  getItinerary,
}
