module.exports = (sequelize) => {
  const { DataTypes } = require("sequelize");
  return sequelize.define("Division", {
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
  });
};
