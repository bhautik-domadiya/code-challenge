import { Request, Response } from "express";
import { BaseController } from "../../../core/api/base-controller";
import { ExpressError } from "../../../utils/errors/express.error";
import { AuthService } from "../services/auth.service";
import {
  AuthDisplayModel,
  VerifyOtpDisplayModel,
} from "../dto/auth-display-model";
import { AuthenticatedRequest } from "@utils/types/core";
import { SuccessDisplayModel } from "@utils/base-display-model";
import { UserDisplayModel } from "../../user/dto/user-display-model";

export class AuthController extends BaseController {
  public authService: AuthService;

  constructor() {
    super();
    this.authService = new AuthService();
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.refreshAccessToken = this.refreshAccessToken.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
    // Forgot Password
    this.forgotPassword = this.forgotPassword.bind(this);
    this.resendOtp = this.resendOtp.bind(this);
    this.verifyOtp = this.verifyOtp.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }

  public async register(
    req: Request,
    res: Response
  ): Promise<Response<SuccessDisplayModel | ExpressError>> {
    return this.getResult(await this.authService.registerUser(req.body), res);
  }

  public async login(
    req: Request,
    res: Response
  ): Promise<Response<AuthDisplayModel | ExpressError>> {
    return this.getResult(await this.authService.loginUser(req.body), res);
  }

  public async refreshAccessToken(
    req: Request,
    res: Response
  ): Promise<Response<AuthDisplayModel | ExpressError>> {
    return this.getResult(
      await this.authService.refreshAccessToken(req.body),
      res
    );
  }

  public async changePassword(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<Response<SuccessDisplayModel | ExpressError>> {
    return this.getResult(
      await this.authService.changePassword(req.body, req.user.id),
      res
    );
  }

  public async getCurrentUser(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<Response<UserDisplayModel | ExpressError>> {
    return this.getResult(
      await this.authService.getCurrentUser(req.user.id),
      res
    );
  }

  /**
  |--------------------------------------------------
  | Forgot Password 
  |--------------------------------------------------
  */

  public async forgotPassword(
    req: Request,
    res: Response
  ): Promise<Response<SuccessDisplayModel | ExpressError>> {
    return this.getResult(await this.authService.forgotPassword(req.body), res);
  }

  public async resendOtp(
    req: Request,
    res: Response
  ): Promise<Response<SuccessDisplayModel | ExpressError>> {
    return this.getResult(await this.authService.resendOTP(req.body), res);
  }

  public async verifyOtp(
    req: Request,
    res: Response
  ): Promise<Response<VerifyOtpDisplayModel | ExpressError>> {
    return this.getResult(await this.authService.verifyOTP(req.body), res);
  }

  public async resetPassword(
    req: Request,
    res: Response
  ): Promise<Response<SuccessDisplayModel | ExpressError>> {
    return this.getResult(await this.authService.resetPassword(req.body), res);
  }
}
