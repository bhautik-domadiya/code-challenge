import { randomBytes, createCipheriv, createDecipheriv } from "node:crypto";
import { env } from "../../env";

export class CryptoService {
  constructor() {}

  public encrypt(data: string) {
    try {
      const algorithm = "aes-256-cbc";
      const iv = randomBytes(16);
      const cipher = createCipheriv(algorithm, env.jwt.cryptoSalt, iv);
      const encryptedData =
        cipher.update(data, "utf8", "base64") + cipher.final("base64");
      return {
        data: encryptedData,
        iv: iv.toString("hex"),
      };
    } catch (error) {
      throw error;
    }
  }

  public decrypt(encryptedData: { data: string; iv: string }) {
    try {
      const algorithm = "aes-256-cbc";
      const iv = Buffer.from(encryptedData.iv, "hex");
      const decipher = createDecipheriv(algorithm, env.jwt.cryptoSalt, iv);
      const decryptedData =
        decipher.update(encryptedData.data, "base64", "utf8") +
        decipher.final("utf8");
      return decryptedData;
    } catch (error) {
      throw error;
    }
  }
}
