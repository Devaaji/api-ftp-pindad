import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./config/Databases.js";
import router from "./routes/ItemRoute.js";
import cookieParser from "cookie-parser";
const app = express();
dotenv.config();

try {
  db.authenticate().then(() => {
    console.log("Connection has been established successfully.");
  });
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(process.env.PORT, () =>
  console.log(`Server listening on port ${process.env.PORT}`)
);
