const { Expense } = require("../models");
const { fetchUsersByIds, fetchUserById } = require("../services/userService");
const { fetchGroupById } = require("../services/groupService");

exports.createExpense = async (req, res) => {
  try {
    const { description, amount, groupId, createdById } = req.body;

    if (!description || !amount || !groupId || !createdById) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const group = await fetchGroupById(groupId);
    const createdBy = await fetchUserById(createdById);

    if (!group || !createdBy) {
      return res
        .status(404)
        .json({ message: "Group or responsible not found" });
    }

    const expense = await Expense.create({
      description,
      amount,
      groupId,
      createdById,
    });

    res.status(201).json(expense);
  } catch (error) {
    console.error("Error while creating expense:", error);
    res
      .status(500)
      .json({ message: "Error to create expense", error: error.message });
  }
};

exports.listExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.status(200).json(expenses);
  } catch (error) {
    console.error("Error while listing expenses:", error);
    res
      .status(500)
      .json({ message: "Error to find expenses", error: error.message });
  }
};

exports.listExpenseById = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json(expense);
  } catch (error) {
    console.error("Error while finding expense by ID:", error);
    res
      .status(500)
      .json({ message: "Error to find expense", error: error.message });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount, groupId, createdById } = req.body;

    const expense = await Expense.findByPk(id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    const group = await fetchGroupById(groupId);
    const createdBy = await fetchUserById(createdById);

    if (!group || !createdBy) {
      return res
        .status(404)
        .json({ message: "Group or responsible not found" });
    }

    expense.description = description || expense.description;
    expense.amount = amount || expense.amount;
    expense.groupId = groupId || expense.groupId;
    expense.createdById = createdById || expense.createdById;

    await expense.save();

    const updatedExpense = await Expense.findByPk(id);

    res.status(200).json(updatedExpense);
  } catch (error) {
    console.error("Error while updating expense:", error);
    res
      .status(500)
      .json({ message: "Error to update expense", error: error.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findByPk(id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    await expense.destroy();
    res.status(200).json({ message: "Expense removed with success" });
  } catch (error) {
    console.error("Error while deleting expense:", error);
    res
      .status(500)
      .json({ message: "Error to remove expense", error: error.message });
  }
};
