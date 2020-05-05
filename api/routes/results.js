const { Router } = require("express");
const results = require("../controllers/results.controller");
const routes = new Router();

routes.post("/tasks/:task_id/results", results.addResult);
routes.get("/tasks/:task_id/results", results.getResults);
routes.get("/results/:result_id", results.getResultById);
routes.put("/results/:result_id", results.editResult);
routes.delete("/results/:result_id", results.deleteResult);

module.exports = routes;
