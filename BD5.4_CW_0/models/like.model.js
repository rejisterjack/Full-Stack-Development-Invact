const { sequelize, DataTypes } = require("../lib");
const { post } = require("./post.model");
const { user } = require("./user.model");

const like = sequelize.define("like", {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: user,
      key: "id",
    },
  },
  postId: {
    type: DataTypes.INTEGER,
    references: {
      model: post,
      key: "id",
    },
  },
});

user.belongsToMany(post, { through: like });
post.belongsToMany(user, { through: like });

module.exports = { like };
