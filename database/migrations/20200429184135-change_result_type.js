"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("results", "result", {
      type: Sequelize.BOOLEAN,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("results", "result", {
      type: Sequelize.STRING,
    });
  },
};
