import express from "express";
import UserController from "../controller/UserController.js";
import { authMiddleware } from "../middleware/auth.js";
const router = express.Router();

router.post("/", UserController.createUser);
router.post("/sign-in", UserController.loginUser);
router.put('/update-user/:id', UserController.updateUser);
router.delete('/delete-user/:id', authMiddleware ,UserController.deleteUser);
export default router;
