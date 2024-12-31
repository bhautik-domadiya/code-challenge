import { IUser } from "database/models/users/user.model";
import mongoose from "mongoose";

declare module "express-serve-static-core" {
  interface Request {
    user?: IUser;
  }
}
