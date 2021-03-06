const { Router } = require("express");
const auth = require("../controllers/auth.controller");
const {
  registerValidations,
  loginValidations,
  resetValidations,
  restorePassword,
} = require("../../validations/authValidators");

const access = require("../../middleware/access");

const routes = new Router();

routes.get("/auth/me", access, auth.getLoginUser);

routes.get("/auth/logout", access, auth.logout);

routes.post("/auth/register", registerValidations, auth.register);

routes.get("/auth/:token/confirm-register", auth.confirm);

routes.post("/auth/login", loginValidations, auth.login);

routes.post("/auth/reset-password", resetValidations, auth.resetPassword);

routes.put("/auth/:token/set-password", restorePassword, auth.restorePassword);

module.exports = routes;
