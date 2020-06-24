"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("tokens", {
      id: {
        primaryKey: true,
        allowNull: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      token: Sequelize.STRING(1234),
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
      owner_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "cascade",
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("tokens");
  },
};
