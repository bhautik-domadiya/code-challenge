import { IsNotEmpty, IsString, Length } from "class-validator";

export class VerifyOtpDto {
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 4)
  otp: string;

}

export class VerifyOtpDisplayModel {
  tempToken: string;
}
