const auth = require("./auth");
const users = require("./users");
const projects = require("./projects");
const tasks = require("./tasks");
const comments = require("./comments");
const results = require("./results");
const workers = require("./workers");
const access = require("../../middleware/access");

module.exports = function (server) {
  server.use("/api", auth);
  server.use("/api", access, users);
  server.use("/api", access, projects);
  server.use("/api", access, tasks);
  server.use("/api", access, comments);
  server.use("/api", access, results);
  server.use("/api", workers, workers);
};
