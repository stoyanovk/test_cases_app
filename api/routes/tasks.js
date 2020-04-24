const { Router } = require("express");
const tasks = require("../controllers/tasks.controller");
const routes = new Router();

// routes.post("/tasks/:project_id", tasks.createTask);
// routes.get("/projects", projects.getProjects);
// routes.get("/projects/:project_id", projects.getProjectById);
// routes.put("/projects/:project_id", projects.editProject);
// routes.delete("/projects/:project_id", checkAdmin, projects.deleteProject);

module.exports = routes;
