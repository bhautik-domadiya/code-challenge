import "reflect-metadata";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import allRoutes from "./routes";
import { env } from "./env";


dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send(`<!DOCTYPE html>
    <html>
      <head>
        <title>Server Status</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            background-color: #f0f2f5;
          }
          .container {
            text-align: center;
            background-color: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .status {
            color: #28a745;
            font-size: 24px;
            margin-bottom: 20px;
          }
          .docs-link {
            color: #007bff;
            text-decoration: none;
            font-size: 18px;
            padding: 10px 20px;
            border: 1px solid #007bff;
            border-radius: 4px;
            transition: all 0.3s ease;
          }
          .docs-link:hover {
            background-color: #007bff;
            color: white;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="status">Server started successfully!</div>
          <a href="${env.swagger.route}" class="docs-link">API Documentation</a>
        </div>
      </body>
    </html>`);
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
| Routes Load
|--------------------------------------------------
*/
app.use("/", allRoutes);

export default app;
