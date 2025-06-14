import cors from "cors";

const allowed = [
  "http://localhost:5173",
  "https://web-top-m8p2em5tw-rifaldy1292s-projects.vercel.app/", // Vercel production
  // bisa tambahkan domain preview
  // tambahkan lagi jika perlu
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: Origin ${origin} tidak diizinkan`));
    }
  },
  methods: "GET,POST,DELETE,PUT,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};

export default cors(corsOptions);
