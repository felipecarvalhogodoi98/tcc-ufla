const express = require("express");
const router = express.Router();
const groupController = require("../controller/groups");

router.post("/", groupController.createGroup);
router.get("/", groupController.getAllGroups);
router.get("/:id", groupController.getGroupById);
router.post("/:groupId/users", groupController.addUsersToGroup);
router.delete("/:groupId/users/:userId", groupController.removeUserFromGroup);

module.exports = router;
