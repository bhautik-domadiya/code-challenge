
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @MinLength(8)
  @Matches(
    /^(?=(.*[a-z]){3,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/,
    {
      message: 'Password too weak',
    },
  )
  public password: string;


  @IsString()
  @IsNotEmpty()
  tempToken: string;



}
