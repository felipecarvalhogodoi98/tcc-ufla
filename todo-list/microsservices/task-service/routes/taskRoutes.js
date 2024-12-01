const express = require("express");
const taskController = require("../controller/taskController");

const router = express.Router();

router.post("/:userId", taskController.createTask);
router.get("/:userId", taskController.getUserTasks);
router.put("/:taskId", taskController.updateTask);
router.delete("/:taskId", taskController.deleteTask);
router.delete("/users/:userId", taskController.deleteByUser);

router.get("/", taskController.getAllTasks);

module.exports = router;
