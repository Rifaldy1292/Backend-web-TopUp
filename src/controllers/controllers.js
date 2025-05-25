// import db from "../config/db.js";
import pkg from "../../models/index.cjs";
const { ListGame, ListPacket } = pkg;

export const getAllGames = async (req, res) => {
  try {
    const games = await ListGame.findAll(); // ambil semua data dari tabel list_game
    res.json(games); // kirim sebagai respons
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// export const getListDiamondById = (req, res) => {
//   const { id } = req.params; // Ambil id dari URL parameter
//   const sql = "SELECT * FROM list_packet WHERE game_id = ?";

//   db.query(sql, [id], (err, result) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.json(result); // Kirim data dalam bentuk array
//   });
// };
export const getListDiamondById = async (req, res) => {
  try {
    const { id } = req.params;

    const diamonds = await ListPacket.findAll({
      where: { game_id: id }, // contoh jika kamu filter berdasarkan game_id
    });

    res.json(diamonds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// export const createTransactions = (req, res) => {
//   const sql = "SELECT * FROM games";
//   db.query(sql, (err, result) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.json(result); // Kirim data dalam bentuk array
//   });
// };
