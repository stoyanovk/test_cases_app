const Sequelize = require("sequelize");
const sequelize = require("../database");

const Workers = sequelize.define("workers", {
  id: {
    primaryKey: true,
    allowNull: true,
    autoIncrement: true,
    type: Sequelize.INTEGER,
  },
});

Workers.createWorker = async function (project_id, user_id) {
  try {
    Workers.create({
      project_id,
      user_id,
    });
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = Workers;
