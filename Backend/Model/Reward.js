import mongoose from "mongoose";

const rewardSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Referencing the User model
        required: true,
    },
    points: {
        type: Number,
        required: true,
        default: 0,
    },
    level: {
        type: Number,
        required: true,
        default: 1,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    isAvailable: {
        type: Boolean,
        required: true,
        default: true,
    },
    description: {
        type: String,
    },
    name: {
        type: String,
        required: true,
        maxlength: 255, // Equivalent to varchar(255)
    },
    collectionInfo: {
        type: String,
        required: true,
    },
});

// Creating the Reward model
const Reward = mongoose.model("Reward", rewardSchema);
export default Reward;
