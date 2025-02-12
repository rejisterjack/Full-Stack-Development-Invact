const Hotel = (sequelize, DataTypes) => {
  sequelize.define(
    "hotel",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price_per_night: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      available_rooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  )
}

module.exports = Hotel
