import { fetchDigiflazzPriceList } from "../services/digiflazzServices.js";
import ProductDigiflazz from "../../models/product-digiflazz.cjs";

export const fetchPricelistJob = async () => {
  try {
    // Panggil service yang fetch data dari API Digiflazz
    const products = await fetchDigiflazzPriceList();

    if (!products || products.length === 0) {
      console.log("Tidak ada produk yang diterima dari API Digiflazz");
      return;
    }

    // Loop produk dan update atau buat baru di database
    for (const product of products) {
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
    }

    console.log("Job fetchPricelistJob selesai dengan sukses");
  } catch (error) {
    console.error("Error di fetchPricelistJob:", error);
  }
};
