const { Router } = require("express");
const comments = require("../controllers/comments.controller");
const routes = new Router();

routes.post("/tasks/:task_id/comments", comments.createComment);
routes.post("/results/:result_id/comments", comments.createComment);
routes.get("/tasks/:task_id/comments", comments.getComments);
routes.get("/results/:result_id/comments", comments.getComments);
routes.get("/comments/:comment_id", comments.getCommentById);
routes.put("/comments/:comment_id", comments.editComment);
routes.delete("/comments/:comment_id", comments.deleteComment);

module.exports = routes;
