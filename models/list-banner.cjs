"use strict";

module.exports = (sequelize, DataTypes) => {
  const ListBanner = sequelize.define(
    "ListBanner",
    {
      banner_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url_banner_image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "list_banner", // harus sesuai dengan nama tabel di database
      timestamps: true, // karena kamu punya createdAt dan updatedAt
    }
  );

  // Relasi ke tabel lain (ListPacket)

  return ListBanner;
};
