import multer from "multer";
import path from "path";

// Setting folder penyimpanan dan nama file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder uploads harus sudah ada atau dibuat manual
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // misal: 1680000000.jpg
  },
});

const upload = multer({ storage: storage });
export default upload;
