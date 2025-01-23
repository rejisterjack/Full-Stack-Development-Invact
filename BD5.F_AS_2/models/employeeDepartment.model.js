const { sequelize, DataTypes } = require("../lib")
const { department } = require("./department.model")
const { employee } = require("./employee.model")

const employeeDepartment = sequelize.define("employeeDepartment", {
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    model: employee,
  },
  departmentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    model: department,
  },
})

employee.belongsToMany(department, { through: employeeDepartment })
department.belongsToMany(employee, { through: employeeDepartment })

module.exports = { employeeDepartment }