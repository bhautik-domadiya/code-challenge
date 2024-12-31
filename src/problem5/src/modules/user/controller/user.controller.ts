import { Request, Response } from "express";
import { BaseController } from "../../../core/api/base-controller";
import { ExpressError } from "../../../utils/errors/express.error";
import { UserService } from "../services/user.service";
import { UserDisplayModel } from "../dto/user-display-model";

export class UserController extends BaseController {
  public userService: UserService;
  constructor() {
    super();
    this.userService = new UserService();
    this.getAllUsers = this.getAllUsers.bind(this);
  }

  public async getAllUsers(
    req: Request,
    res: Response
  ): Promise<Response<UserDisplayModel[] | ExpressError>> {
    return this.getResult(await this.userService.getAllUsers(req.query), res);
  }
}
