const Sequelize = require("sequelize");
const sequelize = require("../database");
const Users = require("./users");
const Workers = require("./workers");
const Tasks = require("./tasks");

const Projects = sequelize.define("projects", {
  id: {
    primaryKey: true,
    allowNull: true,
    autoIncrement: true,
    type: Sequelize.INTEGER
  },
  project_name: Sequelize.STRING,
  description: Sequelize.TEXT
});

Projects.belongsTo(Users, { foreignKey: "owner_id" });
Projects.hasMany(Tasks, { foreignKey: "project_id" });
Projects.belongsToMany(Users, { through: Workers, foreignKey: "project_id" });
Users.belongsToMany(Projects, { through: Workers, foreignKey: "user_id" });

module.exports = Projects;
