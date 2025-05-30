import bcrypt from "bcrypt";
import pkg from "../../models/index.cjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
const { User, ListGame } = pkg;

export const addGame = async (req, res) => {
  try {
    const { game_name, status } = req.body;
    const url_games_image = req.files["logo"]
      ? "/uploads/" + req.files["logo"][0].filename
      : null;
    const url_game_banner = req.files["banner"]
      ? "/uploads/" + req.files["banner"][0].filename
      : null;

    const newGame = await ListGame.create({
      game_name,
      url_games_image,
      url_game_banner,
      status,
    });

    res.status(201).json({
      message: "Game berhasil ditambahkan",
      data: newGame,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menambahkan game",
      error: error.message,
    });
  }
};

export const deleteGame = async (req, res) => {
  try {
    const { id } = req.params; // Ambil ID dari parameter URL

    const deletedGame = await ListGame.destroy({
      where: { id },
    });

    if (deletedGame === 0) {
      return res.status(404).json({
        message: "Game tidak ditemukan",
      });
    }

    res.status(200).json({
      message: "Game berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menghapus game",
      error: error.message,
    });
  }
};

export const getOneGame = async (req, res) => {
  try {
    const { id } = req.params;

    const game = await ListGame.findByPk(id);

    if (!game) {
      return res.status(404).json({ message: "Game tidak ditemukan" });
    }

    res.status(200).json({ data: game });
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data game",
      error: error.message,
    });
  }
};

export const editGame = async (req, res) => {
  try {
    const { id } = req.params;
    const { game_name, status } = req.body;
    const game = await ListGame.findByPk(id);
    if (!game) {
      return res.status(404).json({ message: "game tidak ditemukan" });
    }
    const url_games_image = req.files["logo"]
      ? "uploads/" + req.files["logo"][0].filename
      : game.url_games_image;
    const url_game_banner = req.files["banner"]
      ? "uploads/" + req.files["banner"][0].filename
      : game.url_game_banner;
    await game.update({
      game_name,
      url_games_image,
      url_game_banner,
      status,
    });
    res.json({
      message: "Game berhasil diperbarui",
      data: game,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal memperbarui data game",
      error: error.message,
    });
  }
};

export const getAmountGames = async (req, res) => {
  try {
    const total = await ListGame.count();

    res.status(200).json({
      totalGames: total,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menghitung total game",
      error: error.message,
    });
  }
};
