import express from "express";
import { getAllGames, getListDiamondById } from "../controllers/controllers.js";
import {
  createTransaction,
  paymentSuccess,
} from "../controllers/transactionControllers.js";
import {
  login,
  register,
  handleRefreshToken,
  logout,
} from "../controllers/authControllers.js";
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

router.post("/create-transaction", createTransaction);
router.post("/payment-success", paymentSuccess);
router.post("/register", register);
router.post("/login", login);
router.get("/refresh-token", handleRefreshToken);
router.post("/logout", logout);
export default router;
