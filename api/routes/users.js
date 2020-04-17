const { Router } = require("express");
const users = require("../controllers/users.controller");
const routes = new Router();
const checkAdmin = require("../../middleware/checkAdmin");

routes.get("/users", checkAdmin, users.getUsers);
routes.get("/users/:id", checkAdmin, users.getUserById);
routes.put("/users/:id", users.editUser);
routes.delete("/users/:id", checkAdmin, users.deleteUser);

module.exports = routes;
