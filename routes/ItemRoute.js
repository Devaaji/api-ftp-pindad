import express from "express";
import {
  DashboardPoint01,
  DashboardPoint02,
  DashboardPoint03,
} from "../controllers/dashboard.js";
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
import { createReportItem, GetAllReports } from "../controllers/reports.js";
const router = express.Router();

router.get("/item_01", CreateItem);
router.post("/item_01", GetAllItems);
router.get("/move_item_01", moveItem1DATtoCSV);

router.post("/create_reports_01", createReportItem);
router.post("/reports_01", GetAllReports);

router.get("/dashboard_point_01", DashboardPoint01);
router.get("/dashboard_point_02", DashboardPoint02);
router.get("/dashboard_point_03", DashboardPoint03);

router.get("/item_02", CreateItem2);
router.post("/item_02", GetAllItems2);
router.get("/move_item_02", moveItem2DATtoCSV);

export default router;
