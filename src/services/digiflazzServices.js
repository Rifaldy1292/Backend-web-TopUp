// controllers/digiflazzController.js
import axios from "axios";
import md5 from "md5";

export const fetchDigiflazzPriceList = async () => {
  try {
    const username = process.env.DIGIFLAZZ_USERNAME;
    const apiKey = process.env.DIGIFLAZZ_APIKEY;
    const sign = md5(username + apiKey + "prepaid");

    const response = await axios.post(
      "https://api.digiflazz.com/v1/price-list",
      {
        cmd: "prepaid",
        username,
        sign,
      }
    );

    const data = response.data;

    return response.data.data;
  } catch (error) {
    throw error;
  }
};
