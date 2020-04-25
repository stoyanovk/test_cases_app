const auth = require("./auth");
const users = require("./users");
const projects = require("./projects");
const tasks = require("./tasks");
const access = require("../../middleware/access");

module.exports = function (server) {
  server.use("/api", auth);
  server.use("/api", access, users);
  server.use("/api", access, projects);
  server.use("/api", access, tasks);
};
