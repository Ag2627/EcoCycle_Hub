import User from '../Model/User.js';

export const getAllUsers=async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
}

export const updateUserStatus=async (req, res) => {
  const { status } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Update Failed" });
  }
}
 