"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("list_banner", [
      {
        banner_name: "Mobile Legends",

        url_banner_image: "ml.png",

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        banner_name: "ff",

        url_banner_image: "ml.png",

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        banner_name: "pubg",

        url_banner_image: "ml.png",

        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("list_banner", null, {});
  },
};
