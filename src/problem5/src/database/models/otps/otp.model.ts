import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import { TokenProvider } from "../../../utils/helpers/token.provider";
import { env } from "../../../env";

const tokenProvider = new TokenProvider();

interface OtpParams {
  otp: string;
  email: string;
  otpExpiresAt: Date;
}

@Entity("otps") // Table name
export class OTP extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", name: "otp", length: 4 })
  otp: string;

  @Column({ type: "timestamp", name: "otp_expires_at" })
  otpExpiresAt: Date;

  @Column({
    type: "varchar",
    name: "token",
    length: 255,
    unique: true,
  })
  token: string;

  @Column({ type: "timestamp", name: "token_expires_at" })
  tokenExpiresAt: Date;

  @Column({ type: "character varying", name: "email", length: 100 })
  email: string;


  @BeforeInsert()
  @BeforeUpdate()
  async isOtpExpired(): Promise<boolean> {
    const now = new Date();
    const expirationTime = new Date(
      this.otpExpiresAt.getTime() + env.auth.otpExpiry * 1000
    );
    return now > expirationTime;
  }

  async isTokenExpired(): Promise<boolean> {
    const now = new Date();
    const expirationTime = new Date(
      this.tokenExpiresAt.getTime() + env.auth.tokenExpiry * 1000
    );
    return now > expirationTime;
  }

  constructor(param: OtpParams) {
    super();
    if (param) {
      this.otp = param.otp;
      this.email = param.email;
      this.otpExpiresAt = param.otpExpiresAt;
    }
  }
}
