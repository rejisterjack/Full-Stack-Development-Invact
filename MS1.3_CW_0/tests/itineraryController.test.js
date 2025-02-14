const {
  getFlightsByOriginAndDestination,
  getHotelsByLocation,
  getSitesByLocation,
} = require("../controllers/itineraryController")
const axiosInstance = require("../lib/axios.lib")

jest.mock("../lib/axios.lib", () => ({
  get: jest.fn(),
}))

describe("Itinerary Controller", () => {
  let req, res

  beforeEach(() => {
    req = {}
    res = {
      json: jest.fn(),
      status: jest.fn(() => res),
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("Itinerary Controller Tests", () => {
    test("should fetch flights by origin and destination", async () => {
      const mockResponse = {
        flights: [
          {
            id: 3,
            origin: "JFK",
            destination: "LAX",
            flight_number: "AA-123",
            departureTime: "2022-01-01T12:00:00.000Z",
            arrivalTime: "2022-01-01T15:00:00.000Z",
            price: 300,
          },
        ],
      }
      axiosInstance.get.mockResolvedValue({ data: mockResponse })

      req.query = {
        origin: "JFK",
        destination: "LAX",
      }

      await getFlightsByOriginAndDestination(req, res)
      expect(axiosInstance.get).toHaveBeenCalledWith(
        "/flights/search?origin=JFK&destination=LAX"
      )
      expect(res.json).toHaveBeenCalledWith(mockResponse)
    })
  })
})
