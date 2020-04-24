const Sequelize = require("sequelize");
const sequelize = require("../database");
const Results = require("./results");
const Comments = require("./comments");

const Tasks = sequelize.define("tasks", {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    allowNull: true,
    autoIncrement: true,
  },
  task_name: Sequelize.STRING,
  description: Sequelize.TEXT,
});

Tasks.hasMany(Tasks, { foreignKey: "task_id" });
Tasks.hasMany(Results, { foreignKey: "task_id" });
Tasks.hasMany(Comments, { foreignKey: "task_id" });
module.exports = Tasks;
