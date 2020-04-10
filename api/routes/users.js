const { Router } = require("express");
const auth = require("../controllers/auth.controllers");
const { registerValidations } = require("../../validations/register");
const { loginValidations } = require("../../validations/login");
const access = require("../../middleware/access");

const routes = new Router();

routes.get("/users", async (req, res) => {
  res.json({ data: { status: "ok" } });
});

routes.post("/register", registerValidations, auth.createUser);

routes.post("/auth", loginValidations, auth.login);

module.exports = routes;
