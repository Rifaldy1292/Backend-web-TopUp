import corsMidlleware from "./src/config/cors.js";
import express from "express";
import route from "./src/routes/route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import cron from "node-cron";
import { fetchPricelistJob } from "./src/jobs/fetchPriceListDigiflazz.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use(corsMidlleware);
app.use("/api", route);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use((req, res, next) => {
//   if (req.headers["x-forwarded-proto"] !== "https") {
//     return res.redirect("https://" + req.headers.host + req.url);
//   }
//   next();
// });

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  cron.schedule("0 2 * * *", () => {
    fetchPricelistJob();
  });
});
