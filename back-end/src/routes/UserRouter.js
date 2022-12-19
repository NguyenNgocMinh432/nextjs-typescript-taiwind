import express from "express";
import UserController from "../controller/UserController.js";
import { authMiddleware } from "../middleware/auth.js";
const router = express.Router();

router.post("/", UserController.createUser);
router.post("/sign-in", UserController.loginUser);
router.put('/update-user/:id',authMiddleware, UserController.updateUser);
router.delete('/delete-user/:id', authMiddleware ,UserController.deleteUser);
router.get("/getAll-user",authMiddleware, UserController.getAll);
router.get('/getDetail-user/:id', authMiddleware, UserController.getDetailUser);
export default router;
