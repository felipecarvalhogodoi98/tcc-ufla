const { User } = require("../models");
const axios = require("axios");
const TASK_SERVICE_URL = process.env.TASK_SERVICE_URL;

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByPk(userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();

    res.status(200).json({ message: "Usuário atualizado com sucesso", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar o usuário" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    try {
      await axios.delete(`${TASK_SERVICE_URL}/users/${userId}`);
    } catch (taskError) {
      console.error("Erro ao deletar tarefas do usuário:", taskError.message);
      return res.status(500).json({
        error: "Erro ao deletar as tarefas do usuário. Operação cancelada.",
      });
    }

    await user.destroy();

    res
      .status(200)
      .json({ message: "Usuário e suas tarefas excluídos com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir o usuário:", error.message);
    res.status(500).json({ error: "Erro ao excluir o usuário" });
  }
};
