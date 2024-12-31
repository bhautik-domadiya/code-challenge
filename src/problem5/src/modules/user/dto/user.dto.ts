import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UserDTO {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsNumber()
  phone: number;


  constructor(body?: Partial<UserDTO | null>) {
    if (body) {
      Object.assign(this, body);
    }
  }
}
