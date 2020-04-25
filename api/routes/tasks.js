const { Router } = require("express");
const tasks = require("../controllers/tasks.controller");
const routes = new Router();

routes.post("/tasks", tasks.createTask);
routes.get("/tasks", tasks.getTasks);
routes.get("/tasks/:task_id", tasks.getTaskById);
routes.put("/tasks/:task_id", tasks.editTask);
routes.delete("/tasks/:task_id", tasks.deleteTask);

module.exports = routes;
