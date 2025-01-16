const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Division = sequelize.define("Division", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  settled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  expenseId: {
    type: DataTypes.UUID,
    defaultValue: false,
  },
  userId: {
    type: DataTypes.UUID,
    defaultValue: false,
  },
});

sequelize.sync({ alter: true });

module.exports = Division;
