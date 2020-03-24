const { Router } = require("express");
const users = require("../models/user");
const routes = new Router();

routes.get("/", (req, res) => {
  res.json({ hello: "hello users" });
});

routes.post("/", (req, res) => {
  try {
    user.create({
      user_name: "admin",
      user_password: "12345678",
      email: "admin@example.com"
    });
  } catch (e) {
    console.log(e);
  }
});
module.exports = routes;
