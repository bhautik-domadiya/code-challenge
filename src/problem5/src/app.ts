import "reflect-metadata";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import allRoutes from "./routes";

// import AdminJS from "adminjs";
// import AdminJSExpress from '@adminjs/express'
// required for adding modified types for soft delete in mongoose
// Load environment variables from .env file
dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Server started successfully !");
});

/**
|--------------------------------------------------
|  Middleware
|--------------------------------------------------
*/
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

/**
|--------------------------------------------------
| Admin Js Setup
|--------------------------------------------------
*/
// const admin = new AdminJS({})
// const adminRouter = AdminJSExpress.buildRouter(admin)
//   app.use(admin.options.rootPath, adminRouter)
/**
|--------------------------------------------------
| Routes Load
|--------------------------------------------------
*/
app.use("/", allRoutes);

export default app;
