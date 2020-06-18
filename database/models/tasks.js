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

Tasks.hasMany(Results, {
  foreignKey: "task_id",
  onDelete: "cascade",
  hooks: true,
});
Tasks.hasMany(Comments, {
  foreignKey: "task_id",
  onDelete: "cascade",
  hooks: true,
});
module.exports = Tasks;
