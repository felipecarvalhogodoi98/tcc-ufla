const express = require("express");
const router = express.Router();

router.use("/users", require("./users"));
router.use("/groups", require("./groups"));
router.use("/expenses", require("./expenses"));
router.use("/division", require("./division"));

module.exports = router;
