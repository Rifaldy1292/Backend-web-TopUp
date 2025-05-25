"use strict";

module.exports = (sequelize, DataTypes) => {
  const ListGame = sequelize.define(
    "ListGame",
    {
      game_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url_games_image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "list_game", // harus sesuai dengan nama tabel di database
      timestamps: true, // karena kamu punya createdAt dan updatedAt
    }
  );

  // Relasi ke tabel lain (ListPacket)
  ListGame.associate = (models) => {
    ListGame.hasMany(models.ListPacket, {
      foreignKey: "game_id",
      as: "packets", // alias opsional untuk akses relasi
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
  };

  return ListGame;
};
