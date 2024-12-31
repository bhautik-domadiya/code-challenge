import { IsNotEmpty, Matches, MinLength } from "class-validator";

export class ChangePasswordDTO {
  @IsNotEmpty()
  oldPassword: string;

  @IsNotEmpty()
  @MinLength(8)
  @Matches(
    /^(?=(.*[a-z]){3,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/,
    {
      message: 'Password too weak',
    },
  )
  newPassword: string;

 
}
