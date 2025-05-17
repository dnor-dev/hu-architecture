import { Router } from "express";
import { authRoutes } from "./auth.route";
import { requestRoutes } from "./request.route";

export const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/request", requestRoutes);
