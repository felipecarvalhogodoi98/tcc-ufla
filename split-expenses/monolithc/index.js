// app.js
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sequelize = require("./config/db");
const routes = require("./routes");

app.use(bodyParser.json());

app.use("/", routes);

const PORT = process.env.PORT || 3000;

sequelize
  .sync({ force: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error to connect with database:", error);
  });
