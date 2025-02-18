const {
  app,
  port,
  getAllStocks,
  getStockByTicker,
  addTrade,
} = require("./server")
const http = require("http")
const request = require("supertest")

jest.mock("./server", () => ({
  ...jest.requireActual("./server"),
  getAllStocks: jest.fn(),
  getStockByTicker: jest.fn(),
  addTrade: jest.fn(),
}))

let server

beforeAll((done) => {
  server = http.createServer(app)
  server.listen(3001, done)
})

afterAll((done) => {
  server.close(done)
})

describe("stock trace api", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("get all stocks", async () => {
    const stocks = [
      { stockId: 1, ticker: "AAPL", companyName: "Apple Inc.", price: 150.75 },
      {
        stockId: 2,
        ticker: "GOOGL",
        companyName: "Alphabet Inc.",
        price: 2750.1,
      },
      { stockId: 3, ticker: "TSLA", companyName: "Tesla, Inc.", price: 695.5 },
    ]
    getAllStocks.mockResolvedValue(stocks)
    const result = await request(server).get("/stocks")
    expect(result.statusCode).toBe(200)
    expect(result.body).toEqual({ stocks })
  })

  it("should return all the stocks", () => {
    const stocks = [
      { stockId: 1, ticker: "AAPL", companyName: "Apple Inc.", price: 150.75 },
      {
        stockId: 2,
        ticker: "GOOGL",
        companyName: "Alphabet Inc.",
        price: 2750.1,
      },
      { stockId: 3, ticker: "TSLA", companyName: "Tesla, Inc.", price: 695.5 },
    ]
    getAllStocks.mockReturnValue(stocks)
    const result = getAllStocks()
    expect(result).toEqual(stocks)
    expect(getAllStocks).toHaveBeenCalled()
  })

  test("mock add trade function", async () => {
    const trade = {
      stockId: 1,
      quantity: 10,
      tradeType: "buy",
      tradeDate: "2024-08-07",
    }

    const resolvedTrade = {
      tradeId: 4,
      ...trade,
    }
    addTrade.mockResolvedValue({ trade: resolvedTrade })
    const result = await request(server).post("/trades/new").send(trade)
    expect(result.statusCode).toBe(201)
    expect(result.body).toEqual({ trade: resolvedTrade })
  })

  test("mock add trade function error", async () => {
    const trade = {
      //   stockId: 1,
      quantity: 10,
      tradeType: "buy",
      tradeDate: "2024-08-07",
    }

    addTrade.mockRejectedValue(null)
    const result = await request(server).post("/trades/new").send(trade)
    expect(result.statusCode).toBe(400)
  })
})
