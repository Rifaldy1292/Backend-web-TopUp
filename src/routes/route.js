import express from "express";
import upload from "../multer/multer.js";
import { verifyToken } from "../middleware/verifyToken.js";

// Controller Imports
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
import {
  addGame,
  deleteGame,
  getOneGame,
  editGame,
  getAmountGames,
  getBanners,
  addBanner,
  deleteBanner,
  addListDiamondById,
  deleteDiamondGame,
  editDiamondGame,
  cekIdServer,
} from "../controllers/usersController.js";
import { updateDigiflazzData } from "../controllers/digiflazzPricelistController.js";

const router = express.Router();

// --- User Info ---
router.get("/user", (req, res) => {
  const { id, server } = req.query;
  if (!id || !server) {
    return res.status(400).json({ message: "ID dan server harus diisi" });
  }
  res.json({ id, server, Nickname: "rifky" });
});

// --- Digiflazz ---
router.post("/digiflazz/pricelist", updateDigiflazzData);

// --- Auth ---
router.post("/register", register);
router.post("/login", login);
router.get("/refresh-token", handleRefreshToken);
router.post("/logout", logout);

// --- Games ---
router.get("/games", getAllGames);
router.get("/games-total", getAmountGames);
router.get("/game-detail/:id", getListDiamondById);
router.get("/get-game/:id", getOneGame);
router.post(
  "/add-game",
  verifyToken,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  addGame
);
router.put(
  "/edit-game/:id",
  verifyToken,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  editGame
);
router.delete("/delete-game/:id", verifyToken, deleteGame);

// --- Banners ---
router.get("/get-banners", getBanners);
router.post(
  "/add-banner",
  verifyToken,
  upload.fields([{ name: "image", maxCount: 1 }]),
  addBanner
);
router.delete("/delete-banner/:id", verifyToken, deleteBanner);

// --- Diamonds List ---
router.post("/add-list-diamond/:id", verifyToken, addListDiamondById);
router.put("/edit-list-diamond/:id/:idDiamond", verifyToken, editDiamondGame);
router.delete(
  "/delete-list-diamond/:id/:idDiamond",
  verifyToken,
  deleteDiamondGame
);

// --- Transactions ---
router.post("/create-transaction", createTransaction);
router.post("/payment-success", paymentSuccess);

//cek id
router.get("/cek-id-server", cekIdServer);

export default router;
