const Sequelize = require("sequelize");
const sequelize = require("../database");
const Tasks = require("./tasks");
const Results = require("./results");
const Comments = require("./comments");
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
  password: {
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
});

Users.hasMany(Tasks, { foreignKey: "owner_id" });
Users.hasMany(Results, { foreignKey: "owner_id" });
Users.hasMany(Comments, { foreignKey: "owner_id" });

Users.createUser = async function (body) {
  try {
    const password = await bcrypt.hash(body.password, 10);
    await this.create({
      user_name: body.user_name,
      password,
      email: body.email.toLowerCase(),
    });
  } catch (e) {
    throw new Error(e);
  }
};

Users.prototype.validPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = Users;
