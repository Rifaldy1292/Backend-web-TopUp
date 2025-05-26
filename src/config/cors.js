import cors from "cors";

const corsOption = {
  origin: "http://localhost:5173",
  methods: "GET,POST,DELETE,PUT",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};

export default cors(corsOption);
