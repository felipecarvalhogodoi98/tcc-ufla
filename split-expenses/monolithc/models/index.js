const sequelize = require("../config/db");

const User = require("./user")(sequelize);
const Group = require("./group")(sequelize);
const Expense = require("./expense")(sequelize);
const Division = require("./division")(sequelize);

User.belongsToMany(Group, { through: "UserGroups" });
User.hasMany(Division, { foreignKey: "userId" });
User.hasMany(Expense, { foreignKey: "createdById", as: "expenses" });

Group.belongsToMany(User, { through: "UserGroups" });
Group.hasMany(Expense, { foreignKey: "groupId", as: "expenses" });

Expense.belongsTo(Group, { foreignKey: "groupId", as: "Group" });
Expense.belongsTo(User, { foreignKey: "createdById", as: "createdBy" });
Expense.hasMany(Division, { foreignKey: "expenseId" });
Expense.findAll({
  include: [
    { model: Group, as: "Group" },
    { model: User, as: "createdBy" },
  ],
});

Division.belongsTo(Expense, { foreignKey: "expenseId" });
Division.belongsTo(User, { foreignKey: "userId" });

module.exports = {
  sequelize,
  User,
  Group,
  Expense,
  Division,
};
