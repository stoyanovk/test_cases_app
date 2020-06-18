"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("users", "token", {
      type: Sequelize.STRING(1234),
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("users", "token");
  },
};
