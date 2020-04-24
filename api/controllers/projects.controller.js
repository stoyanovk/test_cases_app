const Projects = require("../../database/models/projects");
const Users = require("../../database/models/users");
const Workers = require("../../database/models/workers");
const { NotFoundError, WrongParametersError } = require("../../helpers/errors");

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
      project_name: req.project_name,
      description: req.description || "",
      owner_id: req.user.id,
    });

    return res.json({ project: createdProject });
  } catch (e) {
    next(e);
  }
};

module.exports.getProjects = async function (req, res, next) {
  try {
    const projects = await Projects.getProjects(req.user);

    if (projects === null) {
      throw new NotFoundError({ message: "Projects is not found" });
    }
    return res.json({ projects });
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
    return res.json({ project });
  } catch (e) {
    next(e);
  }
};

module.exports.editProject = async function (req, res, next) {
  try {
    const project = await Projects.findOne({
      where: { id: req.params.project_id },
      include: [{ model: Users, attributes: [], where: { id: req.user.id } }],
    });
    if (project === null) {
      throw new NotFoundError({ message: "Project is not found" });
    }
    await project.update({
      project_name: req.body.project_name,
      description: req.body.description,
    });

    return res.json({ project });
  } catch (e) {
    next(e);
  }
};

module.exports.deleteProject = async function (req, res, next) {
  try {
    const projectIsDeleted = await Projects.destroy({
      where: { id: req.params.id },
    });
    if (!projectIsDeleted) {
      throw new NotFoundError({ message: "Project is not found" });
    }
    await Workers.destroy({
      where: { project_id: req.params.id },
    });

    res.json({ message: "Project deleted successfully" });
  } catch (e) {
    next(e);
  }
};
