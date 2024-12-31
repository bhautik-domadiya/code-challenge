import { Request, Response, NextFunction } from "express";
import { ExpressError } from "../utils/errors/express.error";
import { ErrorCategories } from "../utils/errors/erorr-catagories";

export const paginationMiddleware = (
  errorCategory: ErrorCategories,
  errorCode: string
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    let { skip = "0", limit = "10" } = req.query;

    const skipValue = Number(skip);
    const limitValue = Number(limit);

    if (isNaN(skipValue) || skipValue < 0) {
      return res
        .status(400)
        .send(
          new ExpressError(errorCategory).updateError(
            errorCode,
            "Invalid value for skip. It should be a non-negative number."
          )
        );
    }

    if (isNaN(limitValue) || limitValue <= 0) {
      return res
        .status(400)
        .send(
          new ExpressError(errorCategory).updateError(
            errorCode,
            "Invalid value for limit. It should be a positive number."
          )
        );
    }

    req.query.skip = skipValue.toString();
    req.query.limit = limitValue.toString();

    next();
  };
};
