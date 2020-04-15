const { Router } = require("express");
const users = require("../controllers/users.controller");
const routes = new Router();

routes.get("/users", users.getUsers);
routes.get("/users/:id", users.getUserById);
routes.put("/users");
routes.delete("/users");
module.exports = routes;
