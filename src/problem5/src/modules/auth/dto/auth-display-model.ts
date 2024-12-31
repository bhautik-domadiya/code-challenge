export class AuthDisplayModel {
  token_type: "bearer"; // will add more type if we anytime needed, not making it a string to make it hard coded
  scope: string;
  expires_in: string | number;
  access_token: string;
  refresh_token: string;
}

export class VerifyOtpDisplayModel {
  tempToken: string;
}
