const express = require("express")
const app = express()

const port = 3000
app.use(express.json())

let stocks = [
  { stockId: 1, ticker: "AAPL", companyName: "Apple Inc.", price: 150.75 },
  { stockId: 2, ticker: "GOOGL", companyName: "Alphabet Inc.", price: 2750.1 },
  { stockId: 3, ticker: "TSLA", companyName: "Tesla, Inc.", price: 695.5 },
]

let trades = [
  {
    tradeId: 1,
    stockId: 1,
    quantity: 10,
    tradeType: "buy",
    tradeDate: "2024-08-07",
  },
  {
    tradeId: 2,
    stockId: 2,
    quantity: 5,
    tradeType: "sell",
    tradeDate: "2024-08-06",
  },
  {
    tradeId: 3,
    stockId: 3,
    quantity: 7,
    tradeType: "buy",
    tradeDate: "2024-08-05",
  },
]

const getAllStocks = () => stocks

const getStockByTicker = (ticker) => {
  return stocks.find((stock) => stock.ticker === ticker)
}

const addTrade = (trade) => {
  const newTrade = {
    tradeId: trades.length + 1,
    stockId: trade.stockId,
    quantity: trade.quantity,
    tradeType: trade.tradeType,
    tradeDate: trade.tradeDate,
  }
  trades.push(trade)
  return newTrade
}

// Exercise 1: Retrieve All Stocks
app.get("/stocks", (req, res) => {
  res.status(200).json({ stocks: getAllStocks() })
})

// Exercise 2: Retrieve Stock by Ticker
app.get("/stocks/:ticker", (req, res) => {
  const ticker = req.params.ticker
  const stock = getStockByTicker(ticker)

  if (stock) {
    res.status(200).json({ stock })
  } else {
    res.status(404).json({ message: "Stock not found" })
  }
})

// Exercise 3: Add a New Trade
app.post("/trades/new", (req, res) => {
  const trade = req.body
  if (
    !trade.stockId ||
    !trade.quantity ||
    !trade.tradeType ||
    !trade.tradeDate
  ) {
    return res.status(400).json({ message: "Invalid trade" })
  }
  const newTrade = addTrade(trade)
  res.status(201).json({ trade: newTrade })
})

app.get("/", (req, res) => {
  res.send("server is on!")
})

module.exports = {
  app,
  port,
  getAllStocks,
  getStockByTicker,
  addTrade,
}
