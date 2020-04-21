const Projects = require("../../models/projects");
const Users = require("../../models/users");
const Workers = require("../../models/workers");
const { NotFoundError } = require("../../helpers/errors");

module.exports.createProject = async function (req, res, next) {
  try {
    const project = await Projects.findOne({
      where: { project_name: req.body.project_name },
    });
    if (project) {
      return res.json({
        message: "a project with the same name already exists",
      });
    }

    const createdProject = await Projects.createProject(req.body, req.user);
    // const createdProject = await Projects.createProject(req.body, { id: 2 });

    const admin = await Users.findOne({ admin: true });

    await Workers.create({ project_id: createdProject.id, user_id: admin.id });

    return res.json({ project: createdProject });
  } catch (e) {
    next(e);
  }
};

module.exports.getProjects = async function (req, res, next) {
  try {
    // const projects = await Projects.getCurrentUserProjects(req.user.id);
    const projects = await Projects.findAll({
      include: { model: Users },
    });

    if (projects === null) {
      throw new NotFoundError({ message: "Projects is not found" });
    }
    return res.json({ projects });
  } catch (e) {
    next(e);
  }
};

module.exports.getProjectsById = async function (req, res, next) {
  try {
    const project = await Projects.findOne({
      where: { id: req.params.project_id },
      include: [{ model: Users, attributes: [], where: { id: req.user.id } }],
    });
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
