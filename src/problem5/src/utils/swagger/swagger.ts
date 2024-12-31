import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { logger } from "../logger/logger";
import { env } from "env";
import basicAuth from "express-basic-auth";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API Docs",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        basicAuth: {
          type: "http",
          scheme: "basic",
        },
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        SuccessDisplayModel: {
          type: "object",
          properties: {
            success: { type: "boolean" },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
        basicAuth: [],
      },
    ],
  },
  apis:
    env.app.nodeEnv == "dev"
      ? ["./dist/modules/**/routes/*.js"]
      : ["./src/modules/**/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number) {
  // Basic auth middleware
  const basicAuthMiddleware = env.swagger.username
    ? basicAuth({
        users: { [env.swagger.username]: env.swagger.password },
        challenge: true,
        realm: "Swagger UI",
      })
    : (req: Request, res: Response, next: Function) => next();

  // Apply basic auth before swagger routes
  app.use(env.swagger.route, basicAuthMiddleware);

  // Swagger page
  app.use(env.swagger.route, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get("/docs.json", basicAuthMiddleware, (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  logger.info(`Docs available at http://localhost:${port}/swagger`);
}

export default swaggerDocs;
