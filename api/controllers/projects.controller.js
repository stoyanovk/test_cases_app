const Projects = require("../../database/models/projects");
const Tasks = require("../../database/models/tasks");
const { NotFoundError, WrongParametersError } = require("../../helpers/errors");
const ResponseSender = require("../../helpers/responseSender");

module.exports.createProject = async function (req, res, next) {
  try {
    const project = await Projects.findOne({
      where: { project_name: req.body.project_name },
    });

    if (project) {
      throw new WrongParametersError({
        message: "Project with this name already exist",
      });
    }

    const createdProject = await Projects.create({
      project_name: req.body.project_name,
      description: req.body.description || "",
      owner_id: req.user.id,
    });

    return new ResponseSender(req, res).send({
      code: 201,
      data: { project: createdProject },
    });
  } catch (e) {
    next(e);
  }
};

module.exports.getProjects = async function (req, res, next) {
  try {
    let projects = null;
    if (req.query.project_name) {
      projects = await Projects.getUserProjectsBySubstring(
        req.user,
        req.query.project_name
      );
    }
    if (!Object.keys(req.query).length) {
      projects = await Projects.getUserProjects(req.user);
    }

    if (projects === null) {
      throw new NotFoundError({ message: "Projects is not found" });
    }

    return new ResponseSender(req, res).send({
      data: { projects },
    });
  } catch (e) {
    next(e);
  }
};

module.exports.getProjectById = async function (req, res, next) {
  try {
    const project = await Projects.getProjectById(
      req.user,
      req.params.project_id
    );
    if (project === null) {
      throw new NotFoundError({ message: "Project is not found" });
    }
    return new ResponseSender(req, res).send({
      data: { project },
    });
  } catch (e) {
    next(e);
  }
};

module.exports.editProject = async function (req, res, next) {
  try {
    const project = await Projects.findByPk(req.params.project_id, {
      include: [
        {
          model: Tasks,
          attributes: ["task_name", "description", "id"],
        },
      ],
    });
    if (project === null) {
      throw new NotFoundError({ message: "Project is not found" });
    }
    await project.update({
      project_name: req.body.project_name,
      description: req.body.description,
    });
    return new ResponseSender(req, res).send({
      data: { project },
    });
  } catch (e) {
    next(e);
  }
};

module.exports.deleteProject = async function (req, res, next) {
  try {
    const projectIsDeleted = await Projects.destroy({
      where: { id: req.params.project_id },
    });
    if (!projectIsDeleted) {
      throw new NotFoundError({ message: "Project is not found" });
    }

    return new ResponseSender(req, res).send({
      data: { message: "Project deleted successfully" },
    });
  } catch (e) {
    next(e);
  }
};
