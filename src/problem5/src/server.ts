import "reflect-metadata";
import http from "http";
import { env } from "./env";
import { logger } from "./utils/logger/logger";
import swaggerDocs from "./utils/swagger/swagger";
import { connectDB } from "./database/connection/db.connection";
import app from "./app";

const server = http.createServer(app);

// Connect the Database

connectDB();

server.listen(env.app.port, () => {
  swaggerDocs(app, env.app.port);
  logger.info(`Application is started: http://locahost:${env.app.port}`);
});
