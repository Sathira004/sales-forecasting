import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import salesForecastRoute from "./routes/salesForecastRoute.js";
import connectDB from "./database/connect.js";

const app = express();
const port = process.argv[3] || 3000;

dotenv.config();
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json({ limit: "50mb" }));

app.use("/api/v1", salesForecastRoute);

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello salesforecsting API",
  });
});

app.get("/api", (req, res) => {
  res.json({ msg: "Hello world" });
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URI);
    app.listen(port, () => console.log('Server started on port 3000'));
  } catch (error) {
    console.log(error);
  }
};

startServer();
