const Projects = require("../../database/models/projects");
const Tasks = require("../../database/models/tasks");
const { NotFoundError, WrongParametersError } = require("../../helpers/errors");
const ResponseSender = require("../../helpers/responseSender");

module.exports.createTask = async function (req, res, next) {
  try {
    const project = await Projects.findByPk(req.params.project_id);
    if (!project) {
      throw new WrongParametersError();
    }
    const createdTask = await Tasks.create({
      task_name: req.body.task_name,
      description: req.body.description || "",
      owner_id: req.user.id,
      project_id: req.params.project_id,
    });
    return new ResponseSender(req, res).send({
      code: 201,
      data: { task: createdTask },
    });
  } catch (e) {
    next(e);
  }
};

module.exports.getTasks = async function (req, res, next) {
  try {
    if (!req.params.project_id) {
      throw new WrongParametersError();
    }

    const tasks = await Tasks.findAll({
      where: { project_id: req.params.project_id },
    });

    return new ResponseSender(req, res).send({
      data: { tasks },
    });
  } catch (e) {
    next(e);
  }
};

module.exports.getTaskById = async function (req, res, next) {
  try {
    const task = await Tasks.findOne({
      where: {
        id: req.params.task_id,
      },
    });
    if (task === null) {
      throw new NotFoundError({ message: "Task is not found" });
    }
    return new ResponseSender(req, res).send({
      data: { task },
    });
  } catch (e) {
    next(e);
  }
};

module.exports.editTask = async function (req, res, next) {
  try {
    const task = await Tasks.findByPk(req.params.task_id);

    if (task === null) {
      throw new NotFoundError({ message: "Task is not found" });
    }
    await task.update({
      task_name: req.body.task_name || task.task_name,
      description: req.body.description || task.description,
    });

    return new ResponseSender(req, res).send({
      data: { task },
    });
  } catch (e) {
    next(e);
  }
};

module.exports.deleteTask = async function (req, res, next) {
  try {
    const taskIsDeleted = await Tasks.destroy({
      where: { id: req.params.task_id },
    });
    if (!taskIsDeleted) {
      throw new NotFoundError({ message: "Task is not found" });
    }
    return new ResponseSender(req, res).send({
      data: { message: "Task deleted successfully" },
    });
  } catch (e) {
    next(e);
  }
};
