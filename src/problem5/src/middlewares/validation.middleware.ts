import { NextFunction, Request, Response } from "express";
import { validate, ValidationError } from "class-validator";
import { plainToInstance } from "class-transformer";
import { ErrorCategories } from "@utils/errors/erorr-catagories";
import { parseQueryParamsToNumber } from "@utils/query-parser";
import { ExpressError } from "../utils/errors/express.error";

type ValidationTarget = "body" | "query" | "params";

interface ValidationMiddlewareConfigs {
  errorOptions: {
    category: ErrorCategories;
    code: string;
  };
  body?: new () => any;
  query?: new () => any;
  params?: new () => any;
  numericFieldsInQueryParams?: string[];
}

export function validationMiddleware(configs: ValidationMiddlewareConfigs) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors: ValidationError[] = [];

      const { errorOptions, numericFieldsInQueryParams, ...validationTargets } =
        configs;

      // Validate each part of the request if DTO class is provided
      for (const target of Object.keys(
        validationTargets
      ) as ValidationTarget[]) {
        if (validationTargets[target]) {
          if (target === "query" && numericFieldsInQueryParams?.length) {
            req[target] = parseQueryParamsToNumber(
              req[target],
              numericFieldsInQueryParams
            );
          }

          if (target === "params" && numericFieldsInQueryParams?.length) {
            req[target] = parseQueryParamsToNumber(
              req[target],
              numericFieldsInQueryParams
            );
          }
          const dtoInstance = plainToInstance(
            validationTargets[target] as any,
            req[target]
          );
          const validationErrors = await validate(dtoInstance);
          if (validationErrors.length > 0) {
            errors.push(...validationErrors);
          }
        }
      }

      if (errors.length > 0) {
        const formattedErrors = errors.reduce((acc, error) => {
          if (error.constraints) {
            acc[error.property] = Object.values(error.constraints);
          }
          return acc;
        }, {} as { [key: string]: string[] });

        return res
          .status(400)
          .send(
            new ExpressError(errorOptions.category).updateError(
              errorOptions.code,
              "Validation error",
              formattedErrors
            )
          );
      }

      next();
    } catch (error) {
      return res
        .status(500)
        .send(
          new ExpressError("Internal server error").updateError(
            "INTERNAL_SERVER_ERROR",
            "Internal server error"
          )
        );
    }
  };
}
