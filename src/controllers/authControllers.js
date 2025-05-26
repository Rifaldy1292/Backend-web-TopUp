import bcrypt from "bcrypt";
import pkg from "../../models/index.cjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
const { User } = pkg;

export const register = async (req, res) => {
  try {
    const { username, email, password, phone_number } = req.body;

    // Cek apakah user sudah ada berdasarkan email
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User sudah terdaftar" });
    }

    // Hash password sebelum disimpan
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Simpan user baru ke database
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone_number,
    });

    await newUser.save();

    res.status(201).json({
      message: "User berhasil didaftarkan",

      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Register gagal", error: error.message });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Cek apakah user sudah ada
    const existingUser = await User.findOne({ where: { email } });

    if (!existingUser) {
      return res.status(400).json({ message: "User belum terdaftar" });
    }

    // Bandingkan password asli dengan hash yang disimpan
    const isValid = await bcrypt.compare(password, existingUser.password);

    if (!isValid) {
      return res.status(401).json({ message: "Password salah" });
    }
    const payload = {
      id: existingUser.id,
      email: existingUser.email,
      username: existingUser.email,
    };
    const accesstoken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: `1h`,
    });
    const refreshtoken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: `7d`,
    });
    // Jika valid, lanjutkan (misalnya kirim token atau data user)
    res.cookie("refreshtoken", refreshtoken, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
      sameSite: "lax", // supaya cookie tersedia di semua route
    });
    return res.status(200).json({
      message: "Login berhasil",
      token: accesstoken,
      refreshtoken,
      user: {
        id: existingUser.id,
        username: existingUser.username,
        email: existingUser.email,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Terjadi kesalahan saat login", error: error.message });
  }
};

export const handleRefreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshtoken;
  console.log("Cookies:", req.cookies);
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh Token tidak ditemukan" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
    const payload = {
      id: decoded.id,
      email: decoded.email,
      username: decoded.username,
    };

    const newAccessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "Access Token berhasil diperbarui",
      accessToken: newAccessToken,
    });
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Refresh Token tidak valid", error: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("refreshtoken", {
    httpOnly: true,
    secure: true, // kalau pakai https
    sameSite: "strict",
    path: "/", // pastikan path sama dengan cookie yang dibuat
  });
  res.status(200).send({ message: "Logged out" });
};
