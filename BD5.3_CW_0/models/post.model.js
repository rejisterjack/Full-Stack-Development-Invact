const { sequelize, DataTypes } = require("../lib");

const post = sequelize.define("post", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: DataTypes.TEXT,
  author: DataTypes.TEXT,
  content: DataTypes.TEXT,
  title: DataTypes.TEXT,
});

module.exports = { post };
