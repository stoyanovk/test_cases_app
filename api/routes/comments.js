const { Router } = require("express");
const comments = require("../controllers/comments.controller");
const routes = new Router();

routes.post("/comments/:result_id", comments.createComment);
routes.post("/comments/:task_id", comments.createComment);
// routes.get("/tasks", tasks.getTasks);
// routes.get("/tasks/:task_id", tasks.getTaskById);
// routes.put("/tasks/:task_id", tasks.editTask);
// routes.delete("/tasks/:task_id", tasks.deleteTask);

module.exports = routes;
