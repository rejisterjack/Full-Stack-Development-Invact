const { sequelize, DataTypes } = require("../lib")
const { agent } = require("./agent.model")
const { ticket } = require("./ticket.model")

const ticketAgent = sequelize.define("ticketAgent", {
  ticketId: {
    type: DataTypes.INTEGER,
    references: {
      model: ticket,
      key: "ticketId",
    },
  },
  agentId: {
    type: DataTypes.INTEGER,
    references: {
      model: agent,
      key: "agentId",
    },
  },
})

ticket.belongsToMany(agent, { through: ticketAgent })
agent.belongsToMany(ticket, { through: ticketAgent })

module.exports = { ticketAgent }