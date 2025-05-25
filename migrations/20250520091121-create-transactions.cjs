"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("transactions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE", // atau "CASCADE" sesuai kebutuhan
      },
      packet_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "list_packet",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      payment_method: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      payment_date: {
        type: Sequelize.DATE, // lebih tepat pakai DATE atau DATEONLY
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      total_price: {
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
    await queryInterface.dropTable("transactions");
  },
};
