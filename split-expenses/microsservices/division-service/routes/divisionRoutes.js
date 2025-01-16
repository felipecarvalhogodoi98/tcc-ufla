const express = require("express");
const router = express.Router();
const divisionController = require("../controller/divisionController");

router.post("/split", divisionController.divideExpense);
router.get("/user/:userId", divisionController.getUserDebts);
router.put("/settle/:divisionId", divisionController.settleDivision);
router.put("/settle-all", divisionController.settleAllDivisionsForUser);
router.get("/expense/:expenseId", divisionController.getTotalDebtForExpense);

module.exports = router;
