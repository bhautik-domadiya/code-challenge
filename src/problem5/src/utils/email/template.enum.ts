export enum TemplateNameEnum {
  VERIFICATION = 'verification',
  RESET_PASSWORD = 'reset-password',
}

export interface IContextEmail {
  token?: string;
  otp?: string;
  redirectURL?: string;
  to?: string;
  fullName?: string;
  isResend?: boolean;
}
