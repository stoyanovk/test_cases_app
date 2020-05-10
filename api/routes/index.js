const auth = require("./auth");
const users = require("./users");
const projects = require("./projects");
const tasks = require("./tasks");
const comments = require("./comments");
const results = require("./results");
const workers = require("./workers");

const access = require("../../middleware/access");
const updateToken = require("../../middleware/updateToken");


module.exports = function (server) {
  server.use("/api", auth);

  server.use("/api", access, updateToken);
  
  server.use("/api", projects);
  server.use("/api", users);
  server.use("/api", tasks);
  server.use("/api", comments);
  server.use("/api", results);
  server.use("/api", workers);
};
