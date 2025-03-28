import Reward from "../Model/Reward.js";

// Create a reward
export const createReward = async (req, res) => {
  try {
    const reward = new Reward(req.body);
    await reward.save();
    res.status(201).json(reward);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all rewards
export const getAllRewards = async (req, res) => {
  try {
    const rewards = await Reward.find();
    res.json(rewards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single reward by ID
export const getRewardById = async (req, res) => {
  try {
    const reward = await Reward.findById(req.params.id);
    if (!reward) {
      return res.status(404).json({ error: "Reward not found" });
    }
    res.json(reward);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a reward
export const updateReward = async (req, res) => {
  try {
    const reward = await Reward.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!reward) {
      return res.status(404).json({ error: "Reward not found" });
    }
    res.json(reward);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a reward
export const deleteReward = async (req, res) => {
  try {
    const reward = await Reward.findByIdAndDelete(req.params.id);
    if (!reward) {
      return res.status(404).json({ error: "Reward not found" });
    }
    res.json({ message: "Reward deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Redeem a reward
export const redeemReward = async (req, res) => {
  const { rewardId } = req.body;
  try {
    const reward = await Reward.findById(rewardId);
    if (!reward) return res.status(404).json({ error: "Reward not found" });

    // TODO: Implement logic to deduct user points

    res.json({ message: "Reward redeemed successfully", reward });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

