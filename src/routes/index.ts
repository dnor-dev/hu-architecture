import { Router } from "express";
import { authRoutes } from "./auth.route";
import { requestRoutes } from "./request.route";
import { sessionRoutes } from "./session.route";

export const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/request", requestRoutes);
routes.use("/session", sessionRoutes);
