import { AuthErrorCodeEnum } from "./../modules/auth/services/auth.service";
import { NextFunction, Request, Response } from "express";
import { ExpressError } from "../utils/errors/express.error";
import { ErrorCategories } from "../utils/errors/erorr-catagories";
import jwt from "jsonwebtoken";
import { UserStatusEnum } from "../database/models/users/user.model";
import { AuthenticatedRequest } from "@utils/types/core";
import { TokenProvider } from "../utils/helpers/token.provider";
import { UserRepository } from "../modules/user/repositories/user-repository";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const tokenProvider = new TokenProvider();

  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res
      .status(401)
      .send(
        new ExpressError(ErrorCategories.Unauthorized).updateError(
          AuthErrorCodeEnum.ErrorAuthNoTokenFound,
          "Unauthorized! Access token required"
        )
      );
  }

  try {
    const payload = await tokenProvider.decryptAccessToken(token);

    const user = await UserRepository.findOneBy({ id: payload?.sub });

    if (!user) {
      return new ExpressError(ErrorCategories.Unauthorized).updateError(
        ErrorCategories.User,
        "User not found. Invalid Token!"
      );
    }

    if (user.status === UserStatusEnum.Blocked) {
      return res
        .status(401)
        .send(
          new ExpressError(ErrorCategories.Unauthorized).updateError(
            AuthErrorCodeEnum.ErrorAuthUserBlocked,
            "User Blocked"
          )
        );
    }

    (req as AuthenticatedRequest).user = user;

    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res
        .status(401)
        .send(
          new ExpressError(ErrorCategories.Unauthorized).updateError(
            AuthErrorCodeEnum.ErrorAuthInvalidToken,
            "Invalid token"
          )
        );
    } else {
      next(err);
    }
  }
}
