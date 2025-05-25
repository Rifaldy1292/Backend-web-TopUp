"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("payment", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      method: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      transaction_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "transactions",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("payment");
  },
};
