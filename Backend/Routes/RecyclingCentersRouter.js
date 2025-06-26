// routes/recyclingCenterRoutes.js
import express from "express";
import {
  getAllCenters,
  createCenter,
  updateCenter,
  deleteCenter,
} from "../controllers/RecyclingCenterController.js";

const CenterRouter = express.Router();

CenterRouter.get("/", getAllCenters);
CenterRouter.post("/", createCenter);
CenterRouter.put("/:id", updateCenter);
CenterRouter.delete("/:id", deleteCenter);

export default CenterRouter;
