"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("product_digiflazz", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      product_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      brand: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      seller_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      buyer_sku_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      buyer_product_status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      seller_product_status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      unlimited_stock: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      stock: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      multi: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      start_cut_off: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      end_cut_off: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      desc: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("product_digiflazz");
  },
};
