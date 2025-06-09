import { fetchDigiflazzPriceList } from "../services/digiflazzServices.js";
import pkg from "../../models/index.cjs";
const { ProductDigiflazz, ListGame, ListPacket } = pkg;

export const updateDigiflazzData = async (req, res) => {
  try {
    const data = await fetchDigiflazzPriceList();

    // Ambil semua game dulu
    const listGames = await ListGame.findAll();

    for (const product of data) {
      // Upsert ke ProductDigiflazz dulu
      await ProductDigiflazz.upsert({
        buyer_sku_code: product.buyer_sku_code,
        product_name: product.product_name,
        category: product.category,
        brand: product.brand,
        type: product.type,
        seller_name: product.seller_name,
        price: parseInt(product.price, 10),
        buyer_product_status: product.buyer_product_status,
        seller_product_status: product.seller_product_status,
        unlimited_stock: product.unlimited_stock,
        stock: product.stock,
        multi: product.multi,
        start_cut_off: product.start_cut_off,
        end_cut_off: product.end_cut_off,
        desc: product.desc,
      });

      // Cari productDigiflazz yang baru saja di-upsert (dapatkan id)
      const productDigiflazz = await ProductDigiflazz.findOne({
        where: { buyer_sku_code: product.buyer_sku_code },
      });

      // Cari game yang cocok (sesuaikan brand dengan game_name)
      const matchedGames = listGames.filter(
        (game) => game.game_name.toLowerCase() === product.brand.toLowerCase()
      );

      for (const matchedGame of matchedGames) {
        // Cari apakah packet sudah ada untuk game_id dan packet_name ini
        const existingPacket = await ListPacket.findOne({
          where: {
            game_id: matchedGame.id,
            packet_name: product.product_name,
          },
        });

        if (existingPacket) {
          await existingPacket.update({
            amount: parseInt(product.price, 10),
            price: Math.round(parseInt(product.price, 10) * 1.05),
            product_digiflazz_id: productDigiflazz.id, // update relasi
            status: product.buyer_product_status ? "active" : "inactive",
          });
        } else {
          await ListPacket.create({
            game_id: matchedGame.id,
            packet_name: product.product_name,
            amount: parseInt(product.price, 10),
            price: Math.round(parseInt(product.price, 10) * 1.05),
            product_digiflazz_id: productDigiflazz.id, // simpan relasi
            status: product.buyer_product_status ? "active" : "inactive",
          });
        }
      }
    }

    res.json({
      success: true,
      message: "Data Digiflazz berhasil diupdate dan disinkron!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Gagal update data",
      error: error.message,
    });
  }
};
