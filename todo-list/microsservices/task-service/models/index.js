const sequelize = require("./db");
const Task = require("./Task");

sequelize.sync({ alter: true });

module.exports = {
  sequelize,
  Task,
};
