const { Router } = require("express");
const users = require("../models/users");
const results = require("../models/results");
const tasks = require("../models/tasks");
const projects = require("../models/projects");
const comments = require("../models/comments");
const workers = require("../models/workers");
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
