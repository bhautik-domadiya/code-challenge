import { dataSource } from "../../../database/connection/db.connection";
import { OTP } from "../../../database/models/otps/otp.model";


export const OtpRepository = dataSource.getRepository(OTP).extend({
  // Get otp record by otpId
  async getById(id: number): Promise<OTP | null> {
    const otp = await this.findOne({
      where: { id },
    });
    if (!otp) {
      return null;
    }
    return otp;
  },

  // Get otp record by email
  async getByEmail(email: string): Promise<OTP | null> {
    const otpRecord = await this.findOne({
      where: { email },
    });
    if (!otpRecord) {
      return null;
    }
    return otpRecord;
  },

  
  // Get otp record by email and otp
  async getByEmailAndOTP(email: string,otp:string): Promise<OTP | null> {
    const otpRecord = await this.findOne({
      where: { email ,otp},
    });
    if (!otpRecord) {
      return null;
    }
    return otpRecord;
  },

  // Get otp record by tempToken
  async getByTempToken(tempToken: string): Promise<OTP | null> {
    const otpRecord = await this.findOne({
      where: { token:tempToken },
    });
    if (!otpRecord) {
      return null;
    }
    return otpRecord;
  },


  // Save otp
  async saveOTP(otp: OTP): Promise<OTP> {
    return this.save(otp);
  },
});
