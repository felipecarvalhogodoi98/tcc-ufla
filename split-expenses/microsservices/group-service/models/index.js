const sequelize = require("./db");
const Group = require("./Group");

sequelize.sync({ alter: true });

module.exports = {
  sequelize,
  Group,
};
