import db from "../config/db.js";

export const getAllGames = (req, res) => {
  const sql = "SELECT * FROM list_game";
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result); // Kirim data dalam bentuk array
  });
};

export const getListDiamondById = (req, res) => {
  const { id } = req.params; // Ambil id dari URL parameter
  const sql = "SELECT * FROM list_packet WHERE id_list_game = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result); // Kirim data dalam bentuk array
  });
};
export const createTransactions = (req, res) => {
  const sql = "SELECT * FROM games";
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result); // Kirim data dalam bentuk array
  });
};
