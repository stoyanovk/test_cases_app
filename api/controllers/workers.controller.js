const Workers = require("../../database/models/workers");
const Users = require("../../database/models/users");
const Projects = require("../../database/models/projects");
const { NotFoundError } = require("../../helpers/errors");
const ResponseBuilder = require("../../helpers/responseBuilder");

module.exports.addWorker = async function (req, res, next) {
  try {
    await Workers.create({
      project_id: req.body.projectId,
      user_id: req.body.userId,
    });

    return res.json(
      new ResponseBuilder({
        code: 201,
        data: { token: req.token, message: "Worker added successfully" },
      })
    );
  } catch (e) {
    next(e);
  }
};

module.exports.getWorkers = async function (req, res, next) {
  try {
    const project = await Projects.findOne({
      where: { id: req.params.project_id },
      include: [
        {
          model: Users,
          attributes: ["id", "user_name", "admin", "email"],
        },
      ],
    });
    if (!project) {
      throw new NotFoundError({ message: "Workers is not found" });
    }
    const { users: workers } = project;

    return res.json(
      new ResponseBuilder({
        data: { token: req.token, workers },
      })
    );
  } catch (e) {
    next(e);
  }
};

module.exports.deleteWorker = async function (req, res, next) {
  try {
    const isDeleted = await Workers.destroy({
      where: {
        project_id: req.params.project_id,
        user_id: req.params.worker_id,
      },
    });

    if (!isDeleted) {
      throw new NotFoundError({ message: "Worker is not found" });
    }

    return res.json(
      new ResponseBuilder({
        data: { token: req.token, message: "Worker is not found" },
      })
    );
  } catch (e) {
    next(e);
  }
};
