const Sequelize = require("sequelize");
const sequelize = require("../database");
const Comments = require("./comments");

const Results = sequelize.define("results", {
  id: {
    allowNull: true,
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  result: Sequelize.BOOLEAN,
});
Results.hasMany(Comments, {
  foreignKey: "result_id",
  onDelete: "cascade",
  hooks: true,
});
module.exports = Results;
