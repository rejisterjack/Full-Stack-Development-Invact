const { sequelize, DataTypes } = require("../config/database")

const Application = sequelize.define(
  "Application",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jdUrl: DataTypes.STRING,
    appliedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.ENUM(
        "no reply",
        "rejected",
        "interview",
        "selected",
        "accepted"
      ),
      defaultValue: "no reply",
    },
    interviewRounds: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = Application
