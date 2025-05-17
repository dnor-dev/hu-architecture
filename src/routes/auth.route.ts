import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

export const authRoutes = Router();

const authController = new AuthController();

authRoutes.post("/login", authController.login.bind(authController));
authRoutes.post("/register", authController.register.bind(authController));
