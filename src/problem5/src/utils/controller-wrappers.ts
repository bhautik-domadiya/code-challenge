import { Request, Response, NextFunction } from "express";
import { isAuthenticated } from "./type-guards";
import { AuthenticatedRequest } from "@utils/types/core";

type ControllerFunction<T extends Request> = (
  req: T,
  res: Response,
  next: NextFunction
) => Promise<any>;

export function withAuth<T extends ControllerFunction<AuthenticatedRequest>>(
  fn: T
) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (isAuthenticated(req)) {
      return fn(req, res, next);
    } else {
      next(new Error("Please use auth middleware if using withAuth wrapper"));
    }
  };
}
