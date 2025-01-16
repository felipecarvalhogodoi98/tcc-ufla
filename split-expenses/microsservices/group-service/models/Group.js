const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Group = sequelize.define("Group", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userIds: {
    type: DataTypes.JSON,
    allowNull: true,
  },
});

sequelize.sync({ alter: true });

module.exports = Group;
