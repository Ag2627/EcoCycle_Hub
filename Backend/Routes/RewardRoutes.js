import express from "express";
import {
  createReward,
  getUserRewardsOverview,
  getAllRewards,
  getRewardById,
  updateReward,
  deleteReward,
  redeemReward,
} from "../controllers/rewardController.js";

const rewardRouter = express.Router();

rewardRouter.post("/", createReward);
rewardRouter.get("/overview/:userId", getUserRewardsOverview);
rewardRouter.get("/", getAllRewards);
rewardRouter.get("/:id", getRewardById);
rewardRouter.put("/:id", updateReward);
rewardRouter.delete("/:id", deleteReward);
rewardRouter.post("/redeem", redeemReward);

export default rewardRouter;

