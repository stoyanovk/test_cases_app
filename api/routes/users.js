const { Router } = require("express");
const auth = require("../controllers/auth.controllers");
const {
  registerValidations,
  loginValidations,
  resetValidations,
  restorePassword,
} = require("../../validations");
const access = require("../../middleware/access");
const routes = new Router();

routes.get("/users", access, async (req, res) => {
  res.json({ data: { status: "ok" } });
});

routes.post("/register", registerValidations, auth.register);

routes.post("/auth", loginValidations, auth.login);

routes.post("/reset", resetValidations, auth.reset);

routes.post("/reset/password/:token", restorePassword, auth.restorePassword);

module.exports = routes;
