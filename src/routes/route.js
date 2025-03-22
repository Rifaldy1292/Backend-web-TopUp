import express from "express";
import {
  getAllGames,
  getListDiamondById,
  createTransactions,
} from "../controllers/controllers.js";
import { createTransaction } from "../controllers/transactionControllers.js";

const router = express.Router();
router.get("/user", (req, res) => {
  const { id, server } = req.query;

  if (!id || !server) {
    return res.status(400).json({ message: "ID dan server harus diisi" });
  }

  res.json({
    id: id,
    server: server,
    Nickname: "rifky",
  });
});
router.get("/games", getAllGames);
router.get("/game-detail/:id", getListDiamondById);
router.post("/transadtions", createTransactions);
router.post("/create-transaction", createTransaction);

export default router;
