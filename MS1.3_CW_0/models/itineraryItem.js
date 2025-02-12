const ItineraryItem = (sequelize, DataTypes) => {
  sequelize.define(
    "itineraryItem",
    {
      itineraryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
          model: "itinerary",
          key: "id",
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      itemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  )
}

ItineraryItem.associate = (models) => {
  ItineraryItem.belongsTo(models.Itinerary, {
    foreignKey: "itineraryId",
  })
}

module.exports = ItineraryItem
