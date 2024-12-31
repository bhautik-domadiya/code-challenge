import { randomBytes } from "crypto";
import { env } from "../../env";
import { CryptoService } from "./crypto.provider";
import jwt from "jsonwebtoken";

type JwtPayload = {
  sub: any;
};

export interface ITokenProvider {
  createAccessToken(payload: JwtPayload): Promise<string>;
  createRefreshToken(payload: JwtPayload): Promise<string>;
  decryptAccessToken(accessToken: string): Promise<JwtPayload>;
  decryptRefreshToken(refreshToken: string): Promise<JwtPayload>;
}

export class TokenProvider implements ITokenProvider {
  cryptoService = new CryptoService();

  constructor() {}

  public async createAccessToken(payload: JwtPayload): Promise<string> {
    const encryptedSub = this.cryptoService.encrypt(payload.sub.toString());
    const newPayload = JSON.stringify(encryptedSub);

    // Sign the token using the access token secret
    return jwt.sign({ sub: newPayload }, env.jwt.accessTokenSecret, {
      expiresIn: env.jwt.accessTokenExpiry,
    });
  }

  public async createRefreshToken(payload: JwtPayload): Promise<string> {
    const encryptedSub = this.cryptoService.encrypt(payload.sub.toString());
    const newPayload = JSON.stringify(encryptedSub);

    // Sign the token using the refresh token secret
    return jwt.sign({ sub: newPayload }, env.jwt.refreshTokenSecret, {
      expiresIn: env.jwt.refreshTokenExpiry,
    });
  }

  public async decryptRefreshToken(refreshToken: string): Promise<JwtPayload> {
    try {
      // Verify the refresh token
      const payload = jwt.verify(
        refreshToken,
        env.jwt.refreshTokenSecret
      ) as JwtPayload;

      if (!payload) {
        throw new Error("Invalid user token");
      }

      // Decrypt the subject
      const subPayload = JSON.parse(payload.sub);
      return {
        sub: this.cryptoService.decrypt(subPayload),
      };
    } catch (error) {
      throw new Error("Invalid refresh token");
    }
  }

  public async decryptAccessToken(accessToken: string): Promise<JwtPayload> {
    try {
      // Verify the access token
      const payload =await jwt.verify(
        accessToken,
        env.jwt.accessTokenSecret
      ) as JwtPayload;

      if (!payload) {
        throw new Error("Invalid user token");
      }

      // Decrypt the subject
      const subPayload = JSON.parse(payload.sub);
      return {
        sub: this.cryptoService.decrypt(subPayload),
      };
    } catch (error) {
      throw new Error("Invalid access token");
    }
  }

  public async createResetPasswordToken() {
    try {
      const buffer = randomBytes(48);

      // Convert the buffer to a base64url encoded string
      const token = buffer.toString("base64url");
      return token.padEnd(64, "_");
    } catch (error) {
      throw error;
    }
  }
}
