import { Router } from "express";
import { SessionController } from "../controllers/session.controller";
import { authMiddleware } from "../middleware/auth.middleware";

export const sessionRoutes = Router();

const sessionController = new SessionController();

sessionRoutes.post(
  "/:id",
  authMiddleware(["tutor"]),
  sessionController.createSession.bind(sessionController)
);
