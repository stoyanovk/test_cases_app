const { Op } = require("sequelize");
const Projects = require("../../database/models/projects");
const Comments = require("../../database/models/comments");
const Results = require("../../database/models/results");
const Tasks = require("../../database/models/tasks");
const { NotFoundError, WrongParametersError } = require("../../helpers/errors");
const ResponseBuilder = require("../../helpers/responseBuilder");

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

    return res.json(
      new ResponseBuilder({
        code: 201,
        data: { token: req.token, task: createdTask },
      })
    );
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

    return res.json(new ResponseBuilder({ data: { token: req.token, tasks } }));
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
      include: [
        { model: Comments, attributes: ["description"] },
        { model: Results, attributes: ["result", "createdAt"] },
      ],
    });
    if (task === null) {
      throw new NotFoundError({ message: "Task is not found" });
    }
    return res.json(new ResponseBuilder({ data: { token: req.token, task } }));
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
      project_name: req.body.task_name || task.task_name,
      description: req.body.description || task.description,
    });

    return res.json(new ResponseBuilder({ data: { token: req.token, task } }));
  } catch (e) {
    next(e);
  }
};

module.exports.deleteTask = async function (req, res, next) {
  try {
    const taskIsDeleted = await Tasks.destroy({
      where: {
        [Op.or]: [{ id: req.params.task_id }, { task_id: req.params.task_id }],
      },
    });
    if (!taskIsDeleted) {
      throw new NotFoundError({ message: "Task is not found" });
    }
    return res.json(
      new ResponseBuilder({
        data: { token: req.token, message: "Task deleted successfully" },
      })
    );
  } catch (e) {
    next(e);
  }
};
