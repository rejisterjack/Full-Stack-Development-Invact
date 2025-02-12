"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("flights", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      origin: Sequelize.STRING,
      destination: Sequelize.STRING,
      flight_number: Sequelize.STRING,
      departure_time: Sequelize.DATE,
      arrival_time: Sequelize.DATE,
      price: Sequelize.FLOAT,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("flights")
  },
}
