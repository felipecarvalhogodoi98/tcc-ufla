const express = require("express");
const router = express.Router();
const expenseController = require("../controller/expenseController");

router.get("/", expenseController.listExpenses);
router.get("/:id", expenseController.listExpenseById);
router.post("/", expenseController.createExpense);
router.put("/:id", expenseController.updateExpense);
router.delete("/:id", expenseController.deleteExpense);

module.exports = router;
