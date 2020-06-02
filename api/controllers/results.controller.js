const Tasks = require("../../database/models/tasks");
const Results = require("../../database/models/results");
const Comments = require("../../database/models/comments");
const { NotFoundError, WrongParametersError } = require("../../helpers/errors");
const ResponseBuilder = require("../../helpers/responseBuilder");

module.exports.addResult = async function (req, res, next) {
  try {
    if (!req.params.task_id) {
      throw new WrongParametersError();
    }

    const task = await Tasks.findByPk(req.params.task_id);

    if (task === null) {
      throw new NotFoundError({ message: "Task is not found" });
    }
    const result = await Results.create({
      result: req.body.result,
      task_id: req.params.task_id,
      owner_id: req.user.id,
    });

    return res.json(
      new ResponseBuilder({ code: 201, data: { token: req.token, result } })
    );
  } catch (e) {
    next(e);
  }
};

module.exports.getResults = async function (req, res, next) {
  try {
    if (!req.params.task_id) {
      throw new WrongParametersError();
    }
    const results = await Results.findAll({
      where: { task_id: req.params.task_id },
    });
    return res.json(
      new ResponseBuilder({ data: { token: req.token, results } })
    );
  } catch (e) {
    next(e);
  }
};

module.exports.getResultById = async function (req, res, next) {
  try {
    const result = await Results.findByPk(req.params.result_id, {
      include: { model: Comments, attributes: ["description"] },
    });
    if (result === null) {
      throw new NotFoundError({ message: "Result is not found" });
    }
    return res.json(
      new ResponseBuilder({ data: { token: req.token, result } })
    );
  } catch (e) {
    next(e);
  }
};

module.exports.editResult = async function (req, res, next) {
  try {
    const result = await Results.findByPk(req.params.result_id);
    if (result === null) {
      throw new NotFoundError({ message: "result is not found" });
    }
    await result.update({
      result: req.body.result,
      owner_id: req.user.id,
    });
    return res.json(
      new ResponseBuilder({ data: { token: req.token, result } })
    );
  } catch (e) {
    next(e);
  }
};

module.exports.deleteResult = async function (req, res, next) {
  try {
    const resultIsDeleted = await Results.destroy({
      where: {
        id: req.params.result_id,
      },
    });
    if (!resultIsDeleted) {
      throw new NotFoundError({ message: "Result is not found" });
    }

    return res.json(
      new ResponseBuilder({
        data: { token: req.token, message: "Comment deleted successfully" },
      })
    );
  } catch (e) {
    next(e);
  }
};
