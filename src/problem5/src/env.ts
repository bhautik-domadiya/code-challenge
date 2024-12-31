import dotenv from "dotenv";
import { getOsEnv, getOsEnvOptional, toBool, toNumber } from "./utils/env";

dotenv.config();

export interface IEnv {
  app: {
    frontEndUrl: string;
    port: number;
    nodeEnv: string;
  };
  db: {
    port: number;
    host: string;
    username: string;
    password: string;
    name: string;
  };
  swagger: {
    enabled: boolean;
    route: string;
    username: string;
    password: string;
  };
  jwt: {
    accessTokenSecret: string;
    accessTokenExpiry: string;
    refreshTokenSecret: string;
    refreshTokenExpiry: string;
    cryptoSalt: string;
  };
  auth: {
    otpExpiry: number;
    tokenExpiry: number;
  };
}

export const env: IEnv = {
  app: {
    frontEndUrl: getOsEnv("FRONT_END_URL"),
    port: toNumber(getOsEnv("APP_PORT")) || 4040,
    nodeEnv: getOsEnvOptional("NODE_ENV") || "local",
  },
  db: {
    port: toNumber(getOsEnv("DB_PORT")),
    host: getOsEnv("DB_HOST"),
    username: getOsEnv("DB_USERNAME"),
    password: getOsEnv("DB_PASSWORD"),
    name: getOsEnv("DB_NAME"),
  },
  swagger: {
    enabled: toBool(getOsEnv("SWAGGER_ENABLED")),
    route: getOsEnv("SWAGGER_ROUTE"),
    username: getOsEnv("SWAGGER_USERNAME"),
    password: getOsEnv("SWAGGER_PASSWORD"),
  },
  jwt: {
    accessTokenSecret: getOsEnv("ACCESS_TOKEN_SECRET"),
    accessTokenExpiry: getOsEnv("ACCESS_TOKEN_EXPIRY"),
    refreshTokenSecret: getOsEnv("REFRESH_TOKEN_SECRET"),
    refreshTokenExpiry: getOsEnv("REFRESH_TOKEN_EXPIRY"),
    cryptoSalt: getOsEnv("CRYPTO_SALT"),
  },
  auth: {
    otpExpiry: toNumber(getOsEnv("OTP_EXPIRY_SECONDS")) || 600, // (Default) 10 minutes (60 * 10 seconds)
    tokenExpiry: toNumber(getOsEnv("TOKEN_EXPIRY_SECONDS")) || 600, // (Default) 10 minutes (60 * 10 seconds)
  },
};
