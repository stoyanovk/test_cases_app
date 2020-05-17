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

Projects.hasMany(Tasks, { foreignKey: "project_id" });
Projects.belongsToMany(Users, { through: Workers, foreignKey: "project_id" });
Users.belongsToMany(Projects, { through: Workers, foreignKey: "user_id" });
Projects.belongsTo(Users, { foreignKey: "owner_id" });

Projects.getUserProjects = function (user) {
  if (user.admin) {
    return Projects.findAll();
  }

  return sequelize.query(
    `
    SELECT projects.id, projects.project_name, projects.description, projects.owner_id, users.id as user_id
    FROM projects
    INNER JOIN workers ON projects.id = workers.project_id
    INNER JOIN users ON users.id = workers.user_id
    WHERE user_id = ${user.id} OR owner_id = ${user.id}
    `,
    { bind: ["active"], raw: false, type: Sequelize.QueryTypes.SELECT }
  );
};

Projects.getUserProjectsBySubstring = async function (user, substring) {
  if (user.admin) {
    return Projects.findAll({
      where: {
        project_name: { [Sequelize.Op.substring]: substring },
      },
    });
  }
  return sequelize.query(
    `
    SELECT projects.id, projects.project_name, projects.description, projects.owner_id, users.id as user_id
    FROM projects
    INNER JOIN workers ON projects.id = workers.project_id
    INNER JOIN users ON users.id = workers.user_id
    WHERE user_id = ${user.id} AND project_name LIKE '%${substring}%' OR owner_id = ${user.id} AND project_name LIKE '%${substring}%'
    `,
    { bind: ["active"], raw: false, type: Sequelize.QueryTypes.SELECT }
  );
};

Projects.getProjectById = function (user, id) {
  if (user.admin) {
    return Projects.findByPk(id);
  }

  return Projects.findOne({
    where: { id },
    include: {
      model: Users,
      attributes: ["id"],
      where: { id: user.id },
    },
  });
};
module.exports = Projects;
