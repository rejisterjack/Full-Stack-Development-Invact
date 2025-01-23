const express = require("express")
const { sequelize } = require("./lib")
const { ticket } = require("./models/ticket.model")
const { customer } = require("./models/customer.model")
const { agent } = require("./models/agent.model")
const { ticketCustomer } = require("./models/ticketCustomer.model")
const { ticketAgent } = require("./models/ticketAgent.model")

const app = express()
const port = 3000

app.use(express.json())

async function getTicketCustomers(ticketId) {
  const ticketCustomers = await ticketCustomer.findAll({
    where: { ticketId },
  })

  let customerData
  for (let cus of ticketCustomers) {
    customerData = await customer.findOne({
      where: { customerId: cus.customerId },
    })
  }

  return customerData
}

async function getTicketAgents(ticketId) {
  const ticketAgents = await ticketAgent.findAll({
    where: { ticketId },
  })
  let agentData
  for (let ag of ticketAgents) {
    agentData = await agent.findOne({
      where: { agentId: ag.agentId },
    })
  }

  return agentData
}

async function getTicketDetails(ticketData) {
  const customer = await getTicketCustomers(ticketData.id)
  const agent = await getTicketAgents(ticketData.id)

  return {
    ...ticketData.dataValues,
    customer,
    agent,
  }
}

app.get("/", (req, res) => {
  res.send("server is on!")
})

app.get("/seed_db", async (req, res) => {
  await sequelize.sync({ force: true })

  let tickets = await ticket.bulkCreate([
    {
      ticketId: 1,
      title: "Login Issue",
      description: "Cannot login to account",
      status: "open",
      priority: 1,
      customerId: 1,
      agentId: 1,
    },
    {
      ticketId: 2,
      title: "Payment Failure",
      description: "Payment not processed",
      status: "closed",
      priority: 2,
      customerId: 2,
      agentId: 2,
    },
    {
      ticketId: 3,
      title: "Bug Report",
      description: "Found a bug in the system",
      status: "open",
      priority: 3,
      customerId: 1,
      agentId: 1,
    },
  ])

  let customers = await customer.bulkCreate([
    { customerId: 1, name: "Alice", email: "alice@example.com" },
    { customerId: 2, name: "Bob", email: "bob@example.com" },
  ])

  let agents = await agent.bulkCreate([
    { agentId: 1, name: "Charlie", email: "charlie@example.com" },
    { agentId: 2, name: "Dave", email: "dave@example.com" },
  ])

  await ticketCustomer.bulkCreate([
    { ticketId: tickets[0].id, customerId: customers[0].id },
    { ticketId: tickets[2].id, customerId: customers[0].id },
    { ticketId: tickets[1].id, customerId: customers[1].id },
  ])

  await ticketAgent.bulkCreate([
    { ticketId: tickets[0].id, agentId: agents[0].id },
    { ticketId: tickets[2].id, agentId: agents[0].id },
    { ticketId: tickets[1].id, agentId: agents[1].id },
  ])

  return res.json({ message: "Database seeded successfully" })
})

app.get("/tickets", async (req, res) => {
  try {
    const tickets = await ticket
      .findAll()
      .then(
        async (tickets) =>
          await Promise.all(
            tickets.map(async (ticket) => await getTicketDetails(ticket))
          )
      )

    res.status(200).json({ tickets })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.get("/tickets/details/:id", async (req, res) => {
  try {
    const ticketData = await ticket.findByPk(+req.params.id)
    if (!ticketData) {
      return res.status(404).json({ message: "Ticket not found" })
    }

    const ticketDetails = await getTicketDetails(ticketData)
    res.status(200).json({ ticketDetails })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.get("/tickets/status/:status", async (req, res) => {
  try {
    const tickets = await ticket.findAll({
      where: { status: req.params.status },
    })
    const ticketsData = await Promise.all(
      tickets.map(async (ticket) => await getTicketDetails(ticket))
    )
    res.status(200).json({ tickets: ticketsData })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.get("/tickets/sort-by-priority", async (req, res) => {
  try {
    const tickets = await ticket
      .findAll({
        order: [["priority", "DESC"]],
      })
      .then((tickets) =>
        Promise.all(
          tickets.map(async (ticket) => await getTicketDetails(ticket))
        )
      )
    res.status(200).json({ tickets })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

const handleAddTicket = async (newTicket) => {
  const newTicketInfo = await ticket.create(newTicket)
  await ticketCustomer.create({
    ticketId: newTicketInfo.id,
    customerId: newTicket.customerId,
  })
  await ticketAgent.create({
    ticketId: newTicketInfo.id,
    agentId: newTicket.agentId,
  })
  const newTicketData = await getTicketDetails(newTicketInfo)
  return newTicketData
}

app.post("/tickets/new", async (req, res) => {
  try {
    const newTicket = req.body
    const newTicketData = await handleAddTicket(newTicket)
    res.status(200).json({ ticket: newTicketData })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.put("/tickets/update/:id", async (req, res) => {
  try {
    const ticketData = await ticket.findByPk(+req.params.id)
    if (!ticketData) {
      return res.status(404).json({ message: "Ticket not found" })
    }
    const updatedTicket = await ticketData.set(req.body).save()
    const updatedTicketData = await getTicketDetails(updatedTicket)
    res.status(200).json({ ticket: updatedTicketData })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.delete("/tickets/delete", async (req, res) => {
  try {
    const ticketData = await ticket.destroy({
      where: { id: req.body.id },
    })
    res.status(200).json({ message: "Ticket deleted successfully", ticketData })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
