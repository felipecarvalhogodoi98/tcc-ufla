const express = require("express");
const { User } = require("../models");
const router = express.Router();
const userControler = require("./../controller/users");

router.post("/", userControler.createUser);
router.get("/", userControler.getAllUsers);
router.get("/:id", userControler.getUserById);
router.put("/:id", userControler.updateUser);
router.delete("/:id", userControler.deleteUser);

module.exports = router;
