const { Group, User } = require("../models");

exports.createGroup = async (req, res) => {
  try {
    const { name, userIds } = req.body;

    const group = await Group.create({ name });

    if (userIds && userIds.length > 0) {
      const users = await User.findAll({ where: { id: userIds } });
      await group.addUsers(users);
    }

    const groupWithUsers = await Group.findByPk(group.id, {
      include: [{ model: User, attributes: ["id", "name"] }],
    });

    res.status(201).json(groupWithUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error to create group." });
  }
};

exports.getAllGroups = async (req, res) => {
  try {
    const groups = await Group.findAll({
      include: [{ model: User, attributes: ["id", "name"] }],
    });

    res.status(200).json(groups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error to list groups." });
  }
};

exports.getGroupById = async (req, res) => {
  try {
    const { id } = req.params;

    const group = await Group.findByPk(id, {
      include: [{ model: User, attributes: ["id", "name"] }],
    });

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

    const users = await User.findAll({ where: { id: userIds } });
    await group.addUsers(users);

    const updatedGroup = await Group.findByPk(groupId, {
      include: [{ model: User, attributes: ["id", "name"] }],
    });

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

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    await group.removeUser(user);

    const updatedGroup = await Group.findByPk(groupId, {
      include: [{ model: User, attributes: ["id", "name"] }],
    });

    res.status(200).json(updatedGroup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error to remove user to a group." });
  }
};
