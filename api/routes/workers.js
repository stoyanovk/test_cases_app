const { Router } = require("express");
const workers = require("../controllers/workers.controller");
const routes = new Router();

routes.post("/workers", workers.addWorker);
routes.get("/projects/:project_id/workers", workers.getWorkers);
routes.delete("/projects/:project_id/workers/:worker_id", workers.deleteWorker);

module.exports = routes;
