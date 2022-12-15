import express from "express";
import UserController from "../controller/UserController.js";
const router = express.Router();

router.post("/", UserController.createUser);
router.post("/sign-in", UserController.loginUser);
router.put('/update-user/:id', UserController.updateUser);

export default router;
