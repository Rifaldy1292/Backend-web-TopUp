"use strict";

module.exports = (sequelize, DataTypes) => {
  const ProductDigiflazz = sequelize.define(
    "ProductDigiflazz",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      product_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      seller_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      buyer_sku_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      buyer_product_status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      seller_product_status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      unlimited_stock: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      stock: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      multi: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      start_cut_off: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      end_cut_off: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      desc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "product_digiflazz", // sesuaikan nama tabel di DB-mu
      timestamps: true, // kalau kamu pakai createdAt dan updatedAt
    }
  );

  // Kalau ada relasi ke tabel lain, bisa ditambah di sini
  ProductDigiflazz.associate = (models) => {
    // Contoh relasi kalau ada
    // Product.hasMany(models.SomeOtherModel, { foreignKey: "product_id" });
  };

  return ProductDigiflazz;
};
