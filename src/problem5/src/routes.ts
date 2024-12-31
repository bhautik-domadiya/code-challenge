import express from "express";
import userRoutes from "./modules/user/routes/user.routes";
import authRoutes from "./modules/auth/routes/auth.routes";
import taskRoutes from "./modules/tasks/routes/task-routes";

const router = express.Router({ mergeParams: true });

// implement all routes 
router.use("/api/auth", authRoutes);
router.use("/api/user", userRoutes);
router.use("/api/task", taskRoutes);

export default router;
``