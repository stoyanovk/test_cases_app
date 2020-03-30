const users = require("./users");

module.exports = function(server) {
  server.use("/api", users);
};
