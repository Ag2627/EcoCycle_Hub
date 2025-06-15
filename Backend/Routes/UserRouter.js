import express from "express";
import { getAllUsers, updateUserStatus } from "../controllers/UserController.js";
const UserRouter = express.Router();
UserRouter.get('/',getAllUsers);
UserRouter.put('/:id/status',updateUserStatus);

export default UserRouter;
