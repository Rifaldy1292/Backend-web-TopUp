import cors from "cors";

const corsOption = {
  origin: "*",
  methods: "GET,POST,DELETE,PUT",
  allowedHeaders: "Content-Type,Authorization",
};

export default cors(corsOption);
