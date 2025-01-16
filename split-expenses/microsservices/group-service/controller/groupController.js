const { Group } = require("../models");
const { fetchUsersByIds } = require("../services/userService");
exports.createGroup = async (req, res) => {
  try {
    const { name, userIds } = req.body;

    const group = await Group.create({
      name,
      userIds,
    });

    let users = [];
    if (userIds && userIds.length > 0) {
      users = await fetchUsersByIds(userIds);
    }

    const groupWithUsers = {
      ...group.toJSON(),
      users,
    };

    res.status(201).json(groupWithUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error to create group." });
  }
};

exports.getAllGroups = async (req, res) => {
  try {
    const groups = await Group.findAll();

    res.status(200).json(groups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error to list groups." });
  }
};

exports.getGroupById = async (req, res) => {
  try {
    const { id } = req.params;

    const group = await Group.findByPk(id);

    if (!group) {
      return res.status(404).json({ message: "Group not find." });
    }

    res.status(200).json(group);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error to find group." });
  }
};

exports.addUsersToGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { userIds } = req.body;

    const group = await Group.findByPk(groupId);

    if (!group) {
      return res.status(404).json({ message: "Grupo not found." });
    }

    let users = [];
    if (userIds && userIds.length > 0) {
      users = await fetchUsersByIds(userIds);
    }

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "Users not found." });
    }

    const existingUserIds = group.userIds || [];
    const newUserIds = [
      ...new Set([...existingUserIds, ...users.map((user) => user.id)]),
    ];

    group.userIds = newUserIds;

    await group.save();

    const updatedGroup = await Group.findByPk(groupId);

    res.status(200).json(updatedGroup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error to add users to a group." });
  }
};

exports.removeUserFromGroup = async (req, res) => {
  try {
    const { groupId, userId } = req.params;

    const group = await Group.findByPk(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found." });
    }

    const index = group.userIds.findIndex((id) => id == userId);
    if (index > -1) {
      group.userIds = group.userIds.filter((id) => id != userId);
      await group.save();
    } else {
      return res.status(404).json({ message: "User not found in the group." });
    }

    const updatedGroup = await Group.findByPk(groupId);

    return res.status(200).json(updatedGroup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error to remove user to a group." });
  }
};
