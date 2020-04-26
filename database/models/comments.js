const Sequelize = require("sequelize");
const sequelize = require("../database");

const Comments = sequelize.define("comments", {
  id: {
    primaryKey: true,
    allowNull: true,
    autoIncrement: true,
    type: Sequelize.INTEGER,
  },
  description: Sequelize.STRING,
  date: { type: Sequelize.DATE, defaultValue: new Date().toLocaleString() },
});

module.exports = Comments;
