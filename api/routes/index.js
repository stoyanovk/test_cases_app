const auth = require("./auth");
const users = require("./users");
const projects = require("./projects");
const tasks = require("./tasks");
const comments = require("./comments");
const results = require("./results");
const workers = require("./workers");
const access = require("../../middleware/access");
const updateToken = require("../../middleware/updateToken");

// не знаю есть ли смысл выносить ее в отдельный файл
function compose() {
  return [...arguments];
}

const middleware = compose(access, updateToken);

module.exports = function (server) {
  server.use("/api", auth);
  server.use("/api", middleware, projects);
  server.use("/api", middleware, users);
  server.use("/api", middleware, tasks);
  server.use("/api", middleware, comments);
  server.use("/api", middleware, results);
  server.use("/api", middleware, workers);
};
