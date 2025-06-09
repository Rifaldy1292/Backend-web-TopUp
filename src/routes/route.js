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
} from "../controllers/usersController.js";
import { updateDigiflazzData } from "../controllers/digiflazzPricelistController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import upload from "../multer/multer.js";
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
router.post("/digiflazz/pricelist", updateDigiflazzData);
router.get("/games", getAllGames);
router.get("/games-total", getAmountGames);
router.get("/game-detail/:id", getListDiamondById);

router.post("/create-transaction", createTransaction);
router.post("/payment-success", paymentSuccess);
router.post("/register", register);
router.post("/login", login);
router.get("/refresh-token", handleRefreshToken);
router.post("/logout", logout);
router.delete("/delete-game/:id", verifyToken, deleteGame);
// router.get("/get-game/:id", verifyToken, getOneGame);
router.get("/get-game/:id", getOneGame);
router.get("/get-banners", getBanners);
router.put(
  "/edit-game/:id",
  verifyToken,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  editGame
);
router.post(
  "/add-game",
  verifyToken,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  addGame
);
router.post(
  "/add-banner",
  verifyToken,
  upload.fields([{ name: "image", maxCount: 1 }]),
  addBanner
);
router.delete("/delete-banner/:id", verifyToken, deleteBanner);
router.post("/add-list-diamond/:id", verifyToken, addListDiamondById);
router.delete(
  "/delete-list-diamond/:id/:idDiamond",
  verifyToken,
  deleteDiamondGame
);
router.put("/edit-list-diamond/:id/:idDiamond", verifyToken, editDiamondGame);

export default router;
