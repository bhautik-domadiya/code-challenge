import { ExpressError } from "../../../utils/errors/express.error";
import { ErrorCategories } from "../../../utils/errors/erorr-catagories";
import { NotFoundError } from "../../../utils/errors/not-found-error";
import {
  AuthDisplayModel,
  VerifyOtpDisplayModel,
} from "../dto/auth-display-model";
import { ChangePasswordDTO } from "../dto/change-password.dto";
import { AuthMapper } from "../mappers/auth-mappers";
import { env } from "../../../env";
import { UserDisplayModel } from "@modules/user/dto/user-display-model";
import { UserMapper } from "@modules/user/mappers/user-mappers";
import { SuccessDisplayModel } from "@utils/base-display-model";
import { SuccessMappers } from "@utils/common-mappers";
import { RegisterDTO } from "../dto/register-user.dto";
import { LoginDTO } from "../dto/login-user.dto";
import { RefreshTokenDTO } from "../dto/refresh-token.dto";
import { TokenProvider } from "../../../utils/helpers/token.provider";
import {
  User,
  UserStatusEnum,
} from "../../../database/models/users/user.model";
import { logger } from "../../../utils/logger/logger";
import { UserRepository } from "../../user/repositories/user-repository";
import { ForgotPasswordDto } from "../dto/forgot-password.dto";
import { EmailService } from "../../../utils/email/email.service";
import { TemplateNameEnum } from "../../../utils/email/template.enum";
import { ResendOTPDto } from "../dto/resend-otp.dto";
import { VerifyOtpDto } from "../dto/verify-otp.dto";
import { ResetPasswordDto } from "../dto/reset-password.dto";
import { nodeEnvEnum } from "../../../utils/nodeEnv.enum";
import { OtpRepository } from "../repositories/otp-repository";

export enum AuthErrorCodeEnum {
  ErrorAuthForbidden = "ERR_AUTH_FORBIDDEN",
  ErrorAuthUserAlreadyExists = "ERR_AUTH_USER_ALREADY_EXISTS",
  ErrorAuthValidation = "ERR_AUTH_VALIDATION",
  ErrorAuthOtpResend = "ERR_AUTH_OTP_RESEND",
  ErrorAuthNotFound = "ERR_AUTH_NOT_FOUND",
  ErrorAuthPasswordNotMatch = "ERR_AUTH_PASSWORD_NOT_MATCH",
  ErrorAuthNoTokenFound = "ERR_AUTH_NO_TOKEN_FOUND",
  ErrorAuthInvalidToken = "ERR_AUTH_INVALID_TOKEN",
  ErrorAuthUserBlocked = "ERR_AUTH_USER_BLOCKED",

  // Forgot password
  ErrorAuthForgotPassword = "ERR_AUTH_FORGOT_PASSWORD",
  ErrorAuthResetPassword = "ERR_AUTH_RESET_PASSWORD",
  ErrorAuthResendOTP = "ERR_AUTH_RESEND_OTP",
  ErrorAuthVerifyOTP = "ERR_AUTH_VERIFY_OTP",
  ErrorAuthInvalidOTP = "ERR_AUTH_INVALID_OTP",
  ErrorAuthExpiredOTP = "ERR_AUTH_EXPIRED_OTP",
  ErrorAuthExpiredToken = "ERR_AUTH_EXPIRED_TOKEN",
  ErrorAuthInvalidTempToken = "ERR_AUTH_EXPIRED_TOKEN",
}

export interface AuthTokensInterface {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

export class AuthService {
  expressError: ExpressError;
  emailService: EmailService;
  tokenProvider: TokenProvider;
  constructor() {
    // Error Class initialization
    this.expressError = new ExpressError(ErrorCategories.Auth);
    this.tokenProvider = new TokenProvider();
    this.emailService = new EmailService();
  }
  public async registerUser(
    registerDto: RegisterDTO
  ): Promise<SuccessDisplayModel | ExpressError> {
    try {
      logger.info(`Auth : start executing register user `);
      const { email } = registerDto;

      // Check if user already exists
      const existingUser = await UserRepository.getByEmail(email);
      if (existingUser) {
        return this.expressError.updateError(
          AuthErrorCodeEnum.ErrorAuthUserAlreadyExists,
          "User with this email already exists."
        );
      }
      const user = UserMapper.toUserModel(registerDto);

      await user.save();

      logger.info(`Auth : successfully register user `);
      return SuccessMappers.toDisplay(true, "Register successfully");
    } catch (error) {
      return this.expressError.updateError(
        AuthErrorCodeEnum.ErrorAuthValidation,
        `There was an error while registering : ${error}`
      );
    }
  }
  // Service for create a Login a user
  public async loginUser(
    loginDto: LoginDTO
  ): Promise<AuthDisplayModel | ExpressError> {
    try {
      logger.info("Auth : Start executing login user");
      const { email, password } = loginDto;
      const user = await UserRepository.getByEmail(email);
      if (!user) {
        return this.expressError.updateError(
          AuthErrorCodeEnum.ErrorAuthNotFound,
          `Enter valid email or password !`
        );
      }
      // CHECK IF PASSWORD MATCHES OR NOT
      const isPasswordValid = await user.isPasswordCorrect(password);

      if (!isPasswordValid) {
        return this.expressError.updateError(
          AuthErrorCodeEnum.ErrorAuthPasswordNotMatch,
          "Invalid password"
        );
      }

      // Generate access and refresh tokens
      const tokens = await this.generateAccessAndRefreshTokens(user);
      if (tokens instanceof ExpressError) {
        return tokens;
      }
      logger.info("Auth : Successfully executed login user");
      return AuthMapper.toDisplay(tokens);
    } catch (error) {
      return this.expressError.updateError(
        AuthErrorCodeEnum.ErrorAuthValidation,
        `There was an error while login`
      );
    }
  }

  // Change Password Service
  public async changePassword(
    payload: ChangePasswordDTO,
    userId: number
  ): Promise<SuccessDisplayModel | ExpressError> {
    try {
      logger.info("Auth : Start executing change password");
      const { oldPassword, newPassword } = payload;

      const user = await UserRepository.getById(userId);
      if (!user) {
        return this.expressError.updateError(
          AuthErrorCodeEnum.ErrorAuthNotFound,
          "User not found"
        );
      }

      const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
      if (!isPasswordCorrect) {
        return this.expressError.updateError(
          AuthErrorCodeEnum.ErrorAuthPasswordNotMatch,
          "Invalid old password"
        );
      }

      user.password = newPassword;
      await UserRepository.saveUser(user);
      logger.info("Auth : Successfully changed password");
      return SuccessMappers.toDisplay(true, "Password updated");
    } catch (error) {
      return this.expressError.updateError(
        AuthErrorCodeEnum.ErrorAuthValidation,
        `There was an error while changing password`
      );
    }
  }

  // Get Current User Service
  public async getCurrentUser(
    userId: number
  ): Promise<UserDisplayModel | ExpressError> {
    try {
      logger.info("Auth : Start executing get current user");
      const user = await UserRepository.getById(userId);

      if (!user) {
        return this.expressError.updateError(
          AuthErrorCodeEnum.ErrorAuthNotFound,
          `User not found`
        );
      }

      if (user.status === UserStatusEnum.Blocked) {
        return this.expressError.updateError(
          AuthErrorCodeEnum.ErrorAuthUserBlocked,
          "User Blocked"
        );
      }
      logger.info("Auth : Start executed get current user");
      return UserMapper.toDisplay(user);
    } catch (error) {
      return this.expressError.updateError(
        AuthErrorCodeEnum.ErrorAuthValidation,
        `There was an error while fetching user`
      );
    }
  }

  /**
|--------------------------------------------------
| Reset Password
|--------------------------------------------------
*/

  public async forgotPassword(
    forgotPassword: ForgotPasswordDto
  ): Promise<SuccessDisplayModel | ExpressError> {
    try {
      logger.info(`Auth : | Executing Forgot Password`);

      const user = await UserRepository.getByEmail(forgotPassword.email);

      if (!user) {
        return this.expressError.updateError(
          AuthErrorCodeEnum.ErrorAuthNotFound,
          "Invalid Email !"
        );
      }

      const otp = await this.storeOTP(user.email);

      const fullName = user.firstName + " " + user.lastName;
      // Sent OTP via Email
      await this.emailService?.sentMail(
        user.email,
        TemplateNameEnum.RESET_PASSWORD,
        { otp, fullName, isResend: false }
      );
      logger.info(`Auth : | Successfully Forgot Password`);
      return SuccessMappers.toDisplay(true, "otp send successfully !");
    } catch (error) {
      return this.expressError.updateError(
        AuthErrorCodeEnum.ErrorAuthForgotPassword,
        "There was error in forgot password",
        error
      );
    }
  }

  public async resendOTP(
    resendOTP: ResendOTPDto
  ): Promise<SuccessDisplayModel | ExpressError> {
    try {
      logger.info(`Auth : | Executing Resend OTP`);
      const user = await UserRepository.getByEmail(resendOTP.email);

      if (!user) {
        return this.expressError.updateError(
          AuthErrorCodeEnum.ErrorAuthNotFound,
          "Invalid Email !"
        );
      }

      //  Store OTP in DB
      const otp = await this.storeOTP(user.email);

      const fullName = user.firstName + " " + user.lastName;
      // Sent OTP via Email

      await this.emailService?.sentMail(
        user.email,
        TemplateNameEnum.RESET_PASSWORD,
        { otp, fullName, isResend: true }
      );

      logger.info(`Auth : | Successfully Resend OTP`);
      return SuccessMappers.toDisplay(true, "otp resend successfully !");
    } catch (error) {
      return this.expressError.updateError(
        AuthErrorCodeEnum.ErrorAuthResendOTP,
        "There was error in resend OTP ",
        error
      );
    }
  }

  public async verifyOTP(
    verifyOtp: VerifyOtpDto
  ): Promise<VerifyOtpDisplayModel | ExpressError> {
    try {
      logger.info(`Auth : | Executing Verify OTP`);

      const user = await UserRepository.getByEmail(verifyOtp.email);

      if (!user) {
        return this.expressError.updateError(
          AuthErrorCodeEnum.ErrorAuthNotFound,
          "Invalid Email !"
        );
      }

      // Verify OTP
      const otpRecord = await OtpRepository.getByEmailAndOTP(
        user.email,
        verifyOtp.otp
      );

      if (!otpRecord) {
        return this.expressError.updateError(
          AuthErrorCodeEnum.ErrorAuthInvalidOTP,
          "Invalid OTP !"
        );
      }
      // Check OTP Expiry
      const isOtpExpired = await otpRecord.isOtpExpired();
      if (isOtpExpired) {
        return this.expressError.updateError(
          AuthErrorCodeEnum.ErrorAuthExpiredOTP,
          "Your OTP has been Expired !"
        );
      }

      // Process : Generating Token and store in DB
      const token = await this.tokenProvider.createResetPasswordToken();
      const veryOldDate = new Date(0);

      otpRecord.token = token;
      otpRecord.tokenExpiresAt = new Date();
      //Expire the OTP
      otpRecord.otpExpiresAt = veryOldDate;
      await OtpRepository.saveOTP(otpRecord);

      logger.info(`Auth : | Successfully Verify OTP`);
      return { tempToken: token };
    } catch (error) {
      return this.expressError.updateError(
        AuthErrorCodeEnum.ErrorAuthVerifyOTP,
        "There was error in verifying OTP",
        error
      );
    }
  }

  public async resetPassword(
    resetPassword: ResetPasswordDto
  ): Promise<SuccessDisplayModel | ExpressError> {
    try {
      logger.info(`Auth : | Executing Reset Password`);

      const otpRecord = await OtpRepository.getByTempToken(
        resetPassword.tempToken
      );

      if (!otpRecord) {
        return this.expressError.updateError(
          AuthErrorCodeEnum.ErrorAuthInvalidTempToken,
          "Invalid tempToken !"
        );
      }
      const user = await UserRepository.getByEmail(otpRecord.email);
      if (!user) {
        return this.expressError.updateError(
          AuthErrorCodeEnum.ErrorAuthNotFound,
          "User Not found !"
        );
      }

      const isTokenExpired = await otpRecord.isTokenExpired();

      if (isTokenExpired) {
        return this.expressError.updateError(
          AuthErrorCodeEnum.ErrorAuthExpiredToken,
          "Your Session has been Expired !"
        );
      }

      user.password = resetPassword.password;
      await user.save();

      // Remove OTP record from DB

      await OtpRepository.delete(otpRecord.id);

      logger.info(`Auth : | Successfully Reset Password`);
      return SuccessMappers.toDisplay(true, "password reset successfully !");
    } catch (error) {
      return this.expressError.updateError(
        AuthErrorCodeEnum.ErrorAuthResetPassword,
        "There was error in reset password !",
        error
      );
    }
  }

  /**
|--------------------------------------------------
| Common Methods
|--------------------------------------------------
*/

  private generateOTP(): string {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    return otp;
  }

  private async storeOTP(email: string) {
    let otpRecord = await OtpRepository.getByEmail(email);
    let generatedOTP = this.generateOTP();
    if (process.env.NODE_ENV === nodeEnvEnum.DEVELOPMENT) {
      generatedOTP = "0000";
    }
    if (!otpRecord) {
      otpRecord = AuthMapper.toOtpModel({
        otp: generatedOTP,
        email: email,
        otpExpiresAt: new Date(),
      });
    } else {
      otpRecord.otp = generatedOTP;
      otpRecord.otpExpiresAt = new Date();
    }
    await OtpRepository.saveOTP(otpRecord);
    return generatedOTP;
  }

  // Generate Access and Refresh Tokens
  private async generateAccessAndRefreshTokens(
    user: User
  ): Promise<AuthTokensInterface | ExpressError> {
    try {
      const expiresIn = env.jwt.accessTokenExpiry;

      const accessToken = await user.generateAccessToken();
      const refreshToken = await user.generateRefreshToken();

      await UserRepository.saveUser(user);
      return { accessToken, refreshToken, expiresIn };
    } catch (error) {
      return this.expressError.updateError(
        AuthErrorCodeEnum.ErrorAuthValidation,
        `Error generating tokens `
      );
    }
  }

  // Refresh Access Token Service
  public async refreshAccessToken(
    refreshTokenDto: RefreshTokenDTO
  ): Promise<AuthDisplayModel | ExpressError> {
    try {
      const incomingRefreshToken = refreshTokenDto.refreshToken;

      // console.log("incomingRefreshToken ->",incomingRefreshToken)
      if (!incomingRefreshToken) {
        return this.expressError.updateError(
          AuthErrorCodeEnum.ErrorAuthNoTokenFound,
          "Unauthorized! Refresh token required"
        );
      }

      const payload = await new TokenProvider().decryptRefreshToken(
        incomingRefreshToken
      );

      const user = await UserRepository.getById(payload.sub);

      if (!user) {
        return new NotFoundError(
          undefined,
          "User not found. Invalid refresh token!",
          ErrorCategories.User,
          AuthErrorCodeEnum.ErrorAuthNotFound
        );
      }

      const tokens = await this.generateAccessAndRefreshTokens(user);
      if (tokens instanceof ExpressError) {
        return tokens;
      }

      return AuthMapper.toDisplay(tokens);
    } catch (error) {
      return this.expressError.updateError(
        AuthErrorCodeEnum.ErrorAuthValidation,
        `There was an error while refreshing access token`
      );
    }
  }
}
