const { Router } = require("express");
const auth = require("../controllers/auth.controllers");
const { registerValidations } = require("../../validations/register");

// const users = require("../../models/users");
// const tasks = require("../../models/tasks");
// const projects = require("../../models/projects");
// const comments = require("../../models/comments");
// const workers = require("../../models/workers");
const routes = new Router();

routes.get("/users", (req, res) => {
  res.json({ hello: "hello users" });
});

routes.post("/users", registerValidations, auth.createUser);
module.exports = routes;
