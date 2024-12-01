const { Task, User } = require("../models");

exports.createTask = async (req, res) => {
  try {
    const { userId } = req.params;
    const { title, description, completed } = req.body;

    console.log("userId", userId);
    const user = await User.findByPk(userId);
    console.log("userId", userId);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const task = await Task.create({
      title,
      description,
      completed,
      userId: user.id,
    });

    res.status(201).json({ message: "Tarefa criada com sucesso", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar a tarefa" });
  }
};

exports.getUserTasks = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId, {
      include: [{ model: Task, as: "tasks" }],
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.status(200).json({ tasks: user.tasks });
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
    const { taskId } = req.params;
    const { title, description, completed } = req.body;

    const task = await Task.findOne({
      where: {
        id: taskId,
        userId: user.id,
      },
    });

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
    const { userId, taskId } = req.params;

    const task = await Task.findOne({
      where: {
        id: taskId,
        userId: user.id,
      },
    });

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

exports.deleteTaskByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const task = await Task.findOne({
      where: {
        userId: userId,
      },
    });

    if (!task) {
      return res.status(404).json({ error: "Tarefas não encontradas!" });
    }

    await task.destroy();

    res.status(200).json({ message: "Tarefas excluídas com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao excluir a tarefas!" });
  }
};
