"use strict";

module.exports = (sequelize, DataTypes) => {
  const ListPacket = sequelize.define(
    "ListPacket",
    {
      game_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      packet_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      product_digiflazz_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "list_packet", // pastikan sama dengan nama tabel di database
      timestamps: true, // karena kamu punya createdAt dan updatedAt
    }
  );

  // Relasi ke tabel lain, jika perlu
  ListPacket.associate = (models) => {
    ListPacket.belongsTo(models.ListGame, {
      foreignKey: "game_id",
      as: "game", // alias opsional
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
  };

  return ListPacket;
};
