const sequelize = require("../config/db");
const User = require("./User");
const Task = require("./Task");

Task.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasMany(Task, { foreignKey: "userId", as: "tasks" });

module.exports = {
  sequelize,
  User,
  Task,
};
