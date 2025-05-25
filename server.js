import corsMidlleware from "./src/config/cors.js";
import express from "express";
import route from "./src/routes/route.js";
import dotenv from "dotenv";

import morgan from "morgan";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(morgan("dev"));
app.use(express.json());
app.use(corsMidlleware);
app.use("/api", route);

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
