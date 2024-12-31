import { OTP } from "../../../database/models/otps/otp.model";
import { AuthDisplayModel } from "../dto/auth-display-model";
import { AuthTokensInterface } from "@modules/auth/services/auth.service";

export class AuthMapper {
  public static toDisplay(tokens: AuthTokensInterface) {
    const User = new AuthDisplayModel();
    User.access_token = tokens.accessToken;
    User.refresh_token = tokens.refreshToken;
    User.expires_in = tokens.expiresIn;
    User.token_type = "bearer";
    return User;
  }

  public static toOtpModel(payload: {
    otp: string;
    email: string;
    otpExpiresAt: Date;
  }) {
    return new OTP(payload);
  }
}
