const { Op } = require("sequelize");
const Tasks = require("../../database/models/tasks");
const Results = require("../../database/models/results");
const Comments = require("../../database/models/comments");
const { NotFoundError, WrongParametersError } = require("../../helpers/errors");

module.exports.createComment = async function (req, res, next) {
  try {
    let commentOwner;
    if (req.params.result_id) {
      commentOwner = await Results.findByPk(req.query.result_id);
    }
    if (req.params.task_id) {
      commentOwner = await Results.findByPk(req.query.result_id);
    }
    if (!commentOwner) {
      throw new WrongParametersError();
    }
    const createdComments = await Comments.create({
      description: req.body.description || "",
      task_id: req.query.task_id || null,
      result_id: req.query.result_id || null,
    });

    return res.json({ comment: createdComments });
  } catch (e) {
    next(e);
  }
};

module.exports.getTasks = async function (req, res, next) {
  try {
    if (!req.query.project_id) {
      throw new WrongParametersError();
    }

    const tasks = await Tasks.findAll({
      where: { project_id: req.query.project_id, task_id: null },
      include: {
        model: Tasks,
        as: "sub_task",
      },
    });

    return res.json({ tasks });
  } catch (e) {
    next(e);
  }
};

module.exports.getTaskById = async function (req, res, next) {
  console.log(req.params.task_id);
  try {
    const task = await Tasks.findOne({
      where: {
        id: req.params.task_id,
      },
      include: { model: Tasks, as: "sub_task" },
    });
    if (task === null) {
      throw new NotFoundError({ message: "Task is not found" });
    }
    return res.json({ task });
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

    return res.json({ task });
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
    res.json({ message: "Task deleted successfully" });
  } catch (e) {
    next(e);
  }
};
