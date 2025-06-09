import cron from "node-cron";
import { fetchPricelistJob } from "./jobs/fetchPricelistJob.js";

// Schedule job untuk dijalankan setiap hari jam 2 pagi
cron.schedule("0 2 * * *", () => {
  console.log("Menjalankan job fetchPricelistJob otomatis...");
  fetchPricelistJob();
});
