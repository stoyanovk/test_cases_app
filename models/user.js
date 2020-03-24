const Sequelize = require("sequelize");
const sequelize = require("../database");

const user = sequelize.define("user", {
  id: {
    allowNull: true,
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  user_password: {
    type: Sequelize.STRING,
    allowNull: true
  },
  admin: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true
  },
  temporaty_token: {
    type: Sequelize.STRING
  },
  life_time_token: {
    type: Sequelize.STRING
  }
});

module.exports = user;
