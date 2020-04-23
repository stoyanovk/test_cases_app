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

Projects.createProject = async function ({ project_name, description }, user) {
  try {
    const project = await Projects.create({
      project_name: project_name,
      description: description || "",
      owner_id: user.id,
    });
    return project;
  } catch (e) {
    return new Error(e);
  }
};

// я не уверен что это правильно решение, но я нубас не смог найти правильное в ОРМ
// Мне надо было получить все проекты в которые доступные юзеруб не только где он создатель
// но и участник
Projects.getProjects = function (user) {
  try {
    if (user.admin) {
      return Projects.findAll();
    }

    return sequelize.query(
      `
    SELECT projects.id, projects.project_name, projects.description, projects.owner_id, users.id as user_id
    FROM projects
    INNER JOIN workers ON projects.id = workers.project_id
    INNER JOIN users ON users.id = workers.user_id
    WHERE user_id = ${user.id} or owner_id=${user.id}
    `,
      { raw: false, type: Sequelize.QueryTypes.SELECT }
    );
  } catch (e) {
    throw new Error(e);
  }
};

Projects.getProjectById = function (user, id) {
  try {
    if (user.admind) {
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
  } catch (e) {
    throw new Error(e);
  }
};
module.exports = Projects;
