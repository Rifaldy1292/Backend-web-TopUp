"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("list_packet", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      game_id: {
        type: Sequelize.INTEGER,
        references: { model: "list_game", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL", // Sesuaikan dengan kebutuhan
      },
      packet_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      product_digiflazz_id: {
        type: Sequelize.INTEGER,
        refrences: { model: "product_digiflazz", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: true,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable("list_packet");
  },
};
