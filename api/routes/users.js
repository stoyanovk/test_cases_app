const { Router } = require("express");
const auth = require("../controllers/auth.controllers");
const { registerValidations } = require("../../validations/register");
const { loginValidations } = require("../../validations/login");
const access = require("../../middleware/access");
const Users = require("../../models/users");

// const users = require("../../models/users");
// const tasks = require("../../models/tasks");
// const projects = require("../../models/projects");
// const comments = require("../../models/comments");
// const workers = require("../../models/workers");
const routes = new Router();

routes.get("/users", access, async (req, res) => {
  res.json({ data: { user: req.user } });
});

routes.post("/register", registerValidations, auth.createUser);
routes.post("/login", loginValidations, auth.login);
module.exports = routes;
