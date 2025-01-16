const { Sequelize } = require("sequelize");
module.exports = new Sequelize({
  dialect: "sqlite",
  storage: "division-service.db",
});
