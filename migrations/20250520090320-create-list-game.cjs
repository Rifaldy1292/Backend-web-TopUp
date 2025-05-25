"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("list_game", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      game_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      url_games_image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("list_game");
  },
};
