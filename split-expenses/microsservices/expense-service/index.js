require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const expenseRoutes = require("./routes/expenseRoutes");
const { sequelize } = require("./models");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use("/expenses", expenseRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Expenses service is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error to connect with db:", error);
  });
