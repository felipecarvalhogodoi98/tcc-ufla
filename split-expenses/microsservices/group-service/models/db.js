const { Sequelize } = require("sequelize");
module.exports = new Sequelize({
  dialect: "sqlite",
  storage: "group-service.db",
});
