const Sequelize = require("sequelize");
const sequelize = require("../database");

const Comments = sequelize.define("comments", {
    id: {
      primaryKey: true,
      allowNull: true,
      autoIncrement: true,
      type: Sequelize.INTEGER
    },
    description: Sequelize.STRING,
    date: Sequelize.DATE
  });
  
  module.exports = Comments;