import express from "express";
import UserController from "../controller/UserController.js";
import { authMiddleware, authUserMiddleware } from "../middleware/auth.js";
const router = express.Router();

router.post("/", UserController.createUser);
router.post("/sign-in", UserController.loginUser);
router.put('/update-user/:id',authMiddleware, UserController.updateUser);
router.delete('/delete-user/:id', authMiddleware ,UserController.deleteUser);
router.get("/getAll-user",authMiddleware, UserController.getAll);
router.get('/getDetail-user/:id', authUserMiddleware, UserController.getDetailUser);
router.get('/refresh-token', UserController.refreshToken);
export default router;
