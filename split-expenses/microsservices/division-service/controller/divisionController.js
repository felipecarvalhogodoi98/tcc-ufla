const { Division } = require("../models");
const { fetchExpenseById } = require("../services/expenseService");
const { fetchGroupById } = require("../services/groupService");
const { fetchUserById, fetchUsersByIds } = require("../services/userService");

exports.divideExpense = async (req, res) => {
  try {
    const { expenseId } = req.body;

    const expense = await fetchExpenseById(expenseId);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    const group = await fetchGroupById(expense.groupId);
    const users = await fetchUsersByIds(group.userIds);

    if (!users || users.length === 0) {
      return res.status(400).json({ message: "No users found in the group" });
    }

    const splitAmount = parseFloat((expense.amount / users.length).toFixed(2));

    const divisions = await Promise.all(
      users.map(async (user) =>
        Division.create({
          expenseId: expense.id,
          userId: user.id,
          amount: splitAmount,
          settled: false,
        })
      )
    );

    res
      .status(201)
      .json({ message: "Expense divided successfully" }, divisions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error dividing expense" });
  }
};

exports.getUserDebts = async (req, res) => {
  try {
    const { userId } = req.params;

    const divisions = await Division.findAll({
      where: { userId, settled: false },
    });

    if (!divisions.length) {
      return res.status(404).json({ message: "No pending debts for user" });
    }

    const totalDebt = divisions.reduce(
      (acc, division) => acc + parseFloat(division.amount),
      0
    );

    res.status(200).json({ totalDebt, divisions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user debts" });
  }
};

exports.settleDivision = async (req, res) => {
  try {
    const { divisionId } = req.params;

    const division = await Division.findByPk(divisionId);

    if (!division) {
      return res.status(404).json({ message: "Division not found" });
    }

    if (division.settled) {
      return res.status(400).json({ message: "Division already settled" });
    }

    division.settled = true;
    await division.save();

    res
      .status(200)
      .json({ message: "Division settled successfully", division });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error settling division" });
  }
};

exports.settleAllDivisionsForUser = async (req, res) => {
  try {
    const { expenseId, userId } = req.body;

    const divisions = await Division.findAll({
      where: { expenseId, userId, settled: false },
    });

    if (!divisions.length) {
      return res.status(404).json({ message: "No pending divisions found" });
    }

    await Promise.all(
      divisions.map((division) => division.update({ settled: true }))
    );

    res.status(200).json({ message: "All divisions settled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error settling divisions" });
  }
};

exports.getTotalDebtForExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;

    const divisions = await Division.findAll({
      where: { expenseId, settled: false },
    });

    if (!divisions.length) {
      return res
        .status(404)
        .json({ message: "No pending divisions for expense" });
    }

    const totalDebt = divisions.reduce(
      (acc, division) => acc + parseFloat(division.amount),
      0
    );

    res.status(200).json({ totalDebt, divisions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching total debt" });
  }
};
