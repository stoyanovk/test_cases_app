const { Router } = require("express");
const auth = require("../controllers/auth.controller");
const {
  registerValidations,
  loginValidations,
  resetValidations,
  restorePassword,
} = require("../../validations");
const routes = new Router();

routes.post("/auth/register", registerValidations, auth.register);

routes.post("/auth/login", loginValidations, auth.login);

routes.post("/auth/reset-password", resetValidations, auth.resetPassword);

routes.put(
  "/auth/reset-password/:token",
  restorePassword,
  auth.restorePassword
);

module.exports = routes;
