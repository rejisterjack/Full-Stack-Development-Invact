const { sequelize, DataTypes } = require("../lib")
const { employee } = require("./employee.model")
const { role } = require("./role.model")

const employeeRole = sequelize.define("employeeRole", {
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    model: employee,
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    model: role,
  },
})

employee.belongsToMany(role, { through: employeeRole })
role.belongsToMany(employee, { through: employeeRole })

module.exports = { employeeRole }
