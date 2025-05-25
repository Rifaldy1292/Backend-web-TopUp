"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("list_game", [
      {
        game_name: "Mobile Legends",
        url_games_image: "ml.png",

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        game_name: "Free Fire",
        url_games_image: "ff.png",

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        game_name: "PUBG Mobile",
        url_games_image: "pubg.png",

        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("list_game", null, {});
  },
};
