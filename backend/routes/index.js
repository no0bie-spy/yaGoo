import { Router } from "express";
import authRouter from "./authRoutes.js";

const routes = Router();

routes.use("/auth", authRouter);
export default routes;