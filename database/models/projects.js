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
    type: Sequelize.INTEGER,
  },
  project_name: Sequelize.STRING,
  description: Sequelize.TEXT,
});

Projects.hasMany(Tasks, {
  foreignKey: "project_id",
  onDelete: "cascade",
  hooks: true,
});

Projects.belongsToMany(Users, { through: Workers, foreignKey: "project_id" });
Users.belongsToMany(Projects, { through: Workers, foreignKey: "user_id" });
Projects.belongsTo(Users, { foreignKey: "owner_id" });

Projects.getUserProjects = function (user) {
  if (user.admin) {
    return Projects.findAll();
  }

  return Projects.findAll({
    where: {
      [Sequelize.Op.or]: [{ owner_id: user.id }, { "$Users.id$": user.id }],
    },
    include: [{ model: Users, attributes: [] }],
  });
};

Projects.getUserProjectsBySubstring = async function (user, substring) {
  if (user.admin) {
    return Projects.findAll({
      where: {
        project_name: { [Sequelize.Op.substring]: substring },
      },
    });
  }

  return Projects.findAll({
    where: {
      [Sequelize.Op.or]: [{ owner_id: user.id }, { "$Users.id$": user.id }],
      project_name: { [Sequelize.Op.substring]: substring },
    },
    include: [{ model: Users, attributes: [] }],
  });
};

Projects.getProjectById = function (user, id) {
  if (user.admin) {
    return Projects.findOne({
      where: { id },
    });
  }

  return Projects.findOne({
    where: {
      id,
      [Sequelize.Op.or]: [{ owner_id: user.id }, { "$Users.id$": user.id }],
    },
  });
};
module.exports = Projects;
