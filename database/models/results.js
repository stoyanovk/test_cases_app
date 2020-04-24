const Sequelize = require("sequelize");
const sequelize = require("../database");
const Comments = require("./comments");

const Results = sequelize.define("results", {
  id: {
    allowNull: true,
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  result: Sequelize.STRING,
  date: Sequelize.DATE
});
Results.hasMany(Comments, { foreignKey: "result_id" });
module.exports = Results;
