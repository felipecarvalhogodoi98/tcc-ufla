const { Task } = require("../models");
const axios = require("axios");
const USER_SERVICE_URL = process.env.USER_SERVICE_URL;

exports.createTask = async (req, res) => {
  try {
    const { userId } = req.params;
    const { title, description, completed } = req.body;

    const user = await axios.get(`${USER_SERVICE_URL}/${userId}`);

    if (!user.data) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const task = await Task.create({
      title,
      description,
      completed,
      userId,
    });

    res.status(201).json({ message: "Tarefa criada com sucesso", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar a tarefa" });
  }
};

exports.getUserTasks = async (req, res) => {
  console.log("getUserTasks", "aqui");
  try {
    const { userId } = req.params;

    const user = await axios.get(`${USER_SERVICE_URL}/${userId}`);
    if (!user.data) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const tasks = await Task.findAll({ where: { userId } });
    res.status(200).json({ tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar as tarefas do usuário" });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { userId, taskId } = req.params;
    const { title, description, completed } = req.body;

    const task = await Task.findOne({ where: { id: taskId } });
    console.log(task);
    if (!task) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.completed = completed !== undefined ? completed : task.completed;

    await task.save();

    res.status(200).json({ message: "Tarefa atualizada com sucesso", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar a tarefa" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findOne({ where: { id: taskId } });
    if (!task) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }

    await task.destroy();

    res.status(200).json({ message: "Tarefa excluída com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao excluir a tarefa" });
  }
};

exports.deleteByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const deletedCount = await Task.destroy({
      where: { userId },
    });

    if (deletedCount === 0) {
      return res
        .status(404)
        .json({ error: "Nenhuma tarefa encontrada para este usuário" });
    }

    res
      .status(200)
      .json({ message: `${deletedCount} tarefa(s) excluída(s) com sucesso` });
  } catch (error) {
    console.error("Erro ao excluir tarefas do usuário:", error.message);
    res.status(500).json({ error: "Erro ao excluir as tarefas do usuário" });
  }
};
