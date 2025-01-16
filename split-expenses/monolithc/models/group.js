module.exports = (sequelize) => {
  const { DataTypes } = require("sequelize");
  return sequelize.define("Group", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
