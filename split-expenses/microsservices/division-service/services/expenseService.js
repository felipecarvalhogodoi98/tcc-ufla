const axios = require("axios");

const EXPENSE_SERVICE_URL = process.env.EXPENSE_SERVICE_URL;

async function fetchExpenseById(expenseId) {
  try {
    const response = await axios.get(`${EXPENSE_SERVICE_URL}/${expenseId}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching expense:", error.message);

    if (error.status == 404) return false;
    throw new Error("Unable to fetch expense from Expense Service.");
  }
}

module.exports = {
  fetchExpenseById,
};
