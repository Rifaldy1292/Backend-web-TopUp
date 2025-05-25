import bcrypt from "bcrypt";
import pkg from "../../models/index.cjs";
const { User } = pkg;
// import jwt from "jsonwebtoken";

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
