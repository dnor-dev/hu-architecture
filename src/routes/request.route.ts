import { Router } from "express";
import { TutorialRequestController } from "../controllers/tutorial-request.controller";
import { authMiddleware } from "../middleware/auth.middleware";

export const requestRoutes = Router();

const tutorialRequestController = new TutorialRequestController();

requestRoutes.get(
  "/:id",
  authMiddleware(["tutor", "admin"]),
  tutorialRequestController.getRequest.bind(tutorialRequestController)
);
requestRoutes.get(
  "/",
  authMiddleware(["admin"]),
  tutorialRequestController.getAllRequests.bind(tutorialRequestController)
);
requestRoutes.post(
  "/",
  authMiddleware(["tutor"]),
  tutorialRequestController.createTutorialRequest.bind(
    tutorialRequestController
  )
);
requestRoutes.post(
  "/:id/assign",
  authMiddleware(["admin"]),
  tutorialRequestController.assignTutorialRequest.bind(
    tutorialRequestController
  )
);
