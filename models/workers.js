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
  return Workers.create({
    project_id,
    user_id,
  });
};

module.exports = Workers;
