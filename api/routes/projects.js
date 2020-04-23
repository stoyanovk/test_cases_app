const { Router } = require("express");
const projects = require("../controllers/projects.controller");
const checkAdmin = require("../../middleware/checkAdmin");
const routes = new Router();

routes.get("/projects", projects.getProjects);
routes.get("/projects/:project_id", projects.getProjectById);
routes.post("/projects", projects.createProject);
routes.put("/projects/:project_id", projects.editProject);
routes.delete("/projects/:project_id", checkAdmin, projects.deleteProject);

module.exports = routes;
