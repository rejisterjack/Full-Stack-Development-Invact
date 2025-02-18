const { sequelize, DataTypes } = require("../lib")
const { customer } = require("./customer.model")
const { ticket } = require("./ticket.model")

const ticketCustomer = sequelize.define("ticketCustomer", {
  ticketId: {
    type: DataTypes.INTEGER,
    references: {
      model: ticket,
      key: "ticketId",
    },
  },
  customerId: {
    type: DataTypes.INTEGER,
    references: {
      model: customer,
      key: "customerId",
    },
  },
})

ticket.belongsToMany(customer, { through: ticketCustomer })
customer.belongsToMany(ticket, { through: ticketCustomer })

module.exports = { ticketCustomer }
