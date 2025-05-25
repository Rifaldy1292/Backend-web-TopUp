import dotenv from "dotenv";
dotenv.config();
import midtransClient from "midtrans-client";
import axios from "axios";

const DIGIFLAZZ_API_URL = "https://api.digiflazz.com/v1/transaction"; // Gantilah dengan endpoint yang sesuai
const DIGIFLAZZ_API_KEY = "dev-23e8f300-1688-11f0-a8bf-09faefcb70f8"; // Gantilah dengan API Key Digiflazz Anda

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

export const paymentSuccess = async (req, res) => {
  res.status(200).json({ message: "Notification received" });
  try {
    const {
      order_id,
      transaction_status,
      payment_method,
      amount,
      transaction_id,
    } = req.body;

    // Jika status transaksi bukan settlement, langsung beri respons gagal
    if (transaction_status !== "settlement") {
      console.log(`Order ${order_id} failed or pending.`);
      return;
    }

    // Segera respon 200 OK ke Midtrans supaya mereka tahu notifikasi diterima

    // Proses transaksi ke Digiflazz secara asynchronous
    const paymentData = {
      username: "gesagiDL4vZD",
      buyer_sku_code: "xld10",
      customer_no: "087800001230",
      ref_id: "test1",
      testing: true,
      sign: "eb5adc56706fd3a7ac40cd752086aad0",
    };

    try {
      const response = await axios.post(DIGIFLAZZ_API_URL, paymentData, {
        headers: {
          Authorization: `Bearer ${DIGIFLAZZ_API_KEY}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        console.log(
          "Payment processed successfully with Digiflazz:",
          response.data
        );
        // Bisa simpan hasil ini ke DB jika perlu
      } else {
        console.error(
          "Error processing payment with Digiflazz, status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Failed to process payment with Digiflazz:", error.message);
    }
  } catch (error) {
    console.error("Error processing payment notification:", error);
    // Kalau error fatal di sini, kemungkinan Midtrans sudah dapat respons 200 tadi,
    // tapi kamu bisa log error untuk pengecekan.
  }
};
