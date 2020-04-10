const Sequelize = require("sequelize");
const sequelize = require("../database");
const Tasks = require("./tasks");
const Results = require("./results");
const bcrypt = require("bcrypt");

const Users = sequelize.define("user", {
  id: {
    allowNull: true,
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  user_password: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  admin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  temporary_token: {
    type: Sequelize.STRING,
  },
  life_time_token: {
    type: Sequelize.STRING,
  },
});

Users.hasMany(Tasks, { foreignKey: "owner_id" });
Users.hasMany(Results, { foreignKey: "owner_id" });

Users.createUser = async function (body) {
  try {
    const password = await bcrypt.hash(body.password, 10);
    const user = await this.create({
      user_name: body.user_name,
      user_password: password,
      email: body.email.toLowerCase(),
    });
    const {
      dataValues: { user_password, ...rest },
    } = user;
    return rest;
  } catch (e) {
    console.log(e);
  }
};

Users.prototype.validPassword = function (password) {
  return bcrypt.compare(password, this.user_password);
};

module.exports = Users;
