const { Router } = require("express");
const users = require("../controllers/users.controller");
const routes = new Router();
const { editUserValidator } = require("../../validations/usersValidators");
const checkAdmin = require("../../middleware/checkAdmin");


routes.get("/users", checkAdmin, users.getUsers);
routes.get("/users/:id", users.getUserById);
routes.put("/users/:id", editUserValidator, users.editUser);
routes.delete("/users/:id", checkAdmin, users.deleteUser);

module.exports = routes;
