"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("users", "token", {
      type: Sequelize.STRING(1234),
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("users", "token");
  },
};
