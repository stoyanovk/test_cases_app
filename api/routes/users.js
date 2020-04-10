const { Router } = require("express");
const auth = require("../controllers/auth.controllers");
const { registerValidations } = require("../../validations/register");
const passport = require("passport");

const routes = new Router();

routes.get("/users", (req, res) => {
  res.json({ user: req.user });
});
routes.get("/logout", (req, res) => {
  req.session.destroy();
  res.json({ user: req.user });
});
routes.post("/register", registerValidations, auth.createUser);
routes.post("/auth", passport.authenticate("local"), (req, res) => {
  res.json({ user: req.user });
});
module.exports = routes;
