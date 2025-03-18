const { sequelize, DataTypes } = require("../config/database")

const Interview = sequelize.define(
  "Interview",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    applicationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roundNum: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roundType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    interviewDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    questions: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    roleOffered: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    compensationOffered: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = Interview