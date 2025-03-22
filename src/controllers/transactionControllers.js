import dotenv from "dotenv";
dotenv.config();
import midtransClient from "midtrans-client";

export const createTransaction = async (req, res) => {
  try {
    const { order_id, gross_amount } = req.body;

    // Validasi hanya dua data yang diperlukan
    if (!order_id || !gross_amount) {
      return res
        .status(400)
        .json({ message: "order_id dan gross_amount wajib diisi!" });
    }

    let snap = new midtransClient.Snap({
      isProduction: false, // Ganti ke `true` jika di produksi
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });

    let parameter = {
      transaction_details: { order_id, gross_amount },

      // Hapus customer_details jika tidak digunakan
      customer_details: {},

      credit_card: { secure: true },
    };

    const transaction = await snap.createTransaction(parameter);
    return res.json({ token: transaction.token });
  } catch (error) {
    console.error("Midtrans Error:", error);
    return res.status(500).json({ message: "Gagal membuat transaksi" });
  }
};
