const sequelize = require("./db");
const Division = require("./Division");

sequelize.sync({ alter: true });

module.exports = {
  sequelize,
  Division,
};
