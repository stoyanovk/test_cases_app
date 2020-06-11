'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("tasks", "task_id");
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("tasks", "task_id", {
      type: Sequelize.INTEGER,
    });
  }
};
