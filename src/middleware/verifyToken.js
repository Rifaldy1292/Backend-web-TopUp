import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Format: Bearer token
  if (!token) return res.status(401).json({ message: "Token tidak ditemukan" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded; // simpan data user ke request
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token tidak valid" });
  }
};
