const sequelize = require("./db");
const Expense = require("./Expense");

sequelize.sync({ alter: true });

module.exports = {
  sequelize,
  Expense,
};
