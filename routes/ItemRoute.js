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
import { refreshToken } from "../controllers/RefreshToken.js";
import { createReportItem, GetAllReports } from "../controllers/reports.js";
import { Login, Logout, Register } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
const router = express.Router();

router.get("/item_01", verifyToken, CreateItem);
router.post("/item_01", verifyToken, GetAllItems);
router.get("/move_item_01", verifyToken, moveItem1DATtoCSV);

router.post("/create_reports_01", verifyToken, createReportItem);
router.post("/reports_01", verifyToken, GetAllReports);

router.post("/dashboard_point_01", verifyToken, DashboardPoint01);
router.post("/dashboard_point_02", verifyToken, DashboardPoint02);
router.post("/dashboard_point_03", verifyToken, DashboardPoint03);

router.get("/item_02", CreateItem2);
router.post("/item_02", GetAllItems2);
router.get("/move_item_02", moveItem2DATtoCSV);

router.post("/auth/register", Register);
router.post("/auth/login", Login);
router.get("/auth/token", refreshToken);
router.get("/auth/logout", Logout);

export default router;
