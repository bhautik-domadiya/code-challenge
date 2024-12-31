import { logger } from "../logger/logger";
import { nodeEnvEnum } from "../nodeEnv.enum";
import { IContextEmail, TemplateNameEnum } from "./template.enum";
import { getResetPasswordTemplate } from "./templates/reset-password.template";
import { getVerificationTemplate } from "./templates/verification.template";

export class EmailService {
  constructor() {}
  public sentMail(
    to: string,
    templateName: TemplateNameEnum,
    context: IContextEmail
  ) {
    try {
      if (
        process.env.NODE_ENV === nodeEnvEnum.PRODUCTION ||
        process.env.NODE_ENV === nodeEnvEnum.STAGING
      ) {
        if (templateName === TemplateNameEnum.VERIFICATION) {
          // Get the sub and html using template
          const { subject, html } = getVerificationTemplate(
            context.otp,
            context.fullName,
            context.isResend
          );
          // here call your external service
        }

        if (templateName === TemplateNameEnum.RESET_PASSWORD) {
          const { subject, html } = getResetPasswordTemplate(
            context.otp,
            context.fullName,
            to,
            context.isResend
          );

          // here call your external service
        }
      } else {
        logger.info(
          `Your OTP for Reset Password / Verification  => ${context.otp}`
        );
      }
    } catch (error) {}
  }
}
