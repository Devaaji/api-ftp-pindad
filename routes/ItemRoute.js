import express from "express";
import {
  CreateItem,
  GetAllItems,
  moveItem1DATtoCSV,
} from "../controllers/Items.js";
import {
  CreateItem2,
  GetAllItems2,
  moveItem2DATtoCSV,
} from "../controllers/items2.js";
const router = express.Router();

router.get("/item_01", CreateItem);
router.post("/item_01", GetAllItems);
router.get("/move_item_01", moveItem1DATtoCSV);

router.get("/item_02", CreateItem2);
router.post("/item_02", GetAllItems2);
router.get("/move_item_02", moveItem2DATtoCSV);

export default router;
