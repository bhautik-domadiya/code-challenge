import { Request } from "express";
import { User } from "../../database/models/users/user.model";

export interface AuthenticatedRequest extends Request {
  user: User;
}
