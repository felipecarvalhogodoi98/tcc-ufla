const express = require("express");
const { User } = require("../models");
const router = express.Router();
const userController = require("../controller/userController");

router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.post("/getByIds", userController.getAllUsersByIds);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
