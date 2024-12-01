const express = require("express");
const taskController = require("../controllers/taskController");
const router = express.Router();

router.get("/:userId", taskController.getUserTasks);
router.post("/:userId", taskController.createTask);
router.put("/:taskId", taskController.updateTask);
router.delete("/:taskId", taskController.deleteTask);
router.delete("/users/:taskId", taskController.deleteTaskByUser);

router.get("/", taskController.getAllTasks);

module.exports = router;
