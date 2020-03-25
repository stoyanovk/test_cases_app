const Sequelize = require("sequelize");
const sequelize = require("../database");

const Workers = sequelize.define("workers", {
  id: {
    primaryKey: true,
    allowNull: true,
    autoIncrement: true,
    type: Sequelize.INTEGER
  }
});

module.exports = Workers;
