const Itinerary = (sequelize, DataTypes) => {
  sequelize.define(
    "itinerary",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  )
}

Itinerary.associate = (models) => {
  Itinerary.hasMany(models.ItineraryItem, {
    foreignKey: "itineraryId",
  })
}

module.exports = Itinerary
