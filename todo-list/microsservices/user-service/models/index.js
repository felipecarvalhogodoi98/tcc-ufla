const sequelize = require("./db");
const User = require("./User");

sequelize.sync({ alter: true });

module.exports = {
  sequelize,
  User,
};
