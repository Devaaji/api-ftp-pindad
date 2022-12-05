import express from "express";
import { CreateItem, GetAllItems } from "../controllers/Items.js";
const router = express.Router();

router.get("/item", CreateItem);
router.post("/", GetAllItems);

export default router;
