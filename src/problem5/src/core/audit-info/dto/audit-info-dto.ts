import { IsOptional, IsDateString, IsString } from "class-validator";



export class AuditInfoDto {
  @IsDateString()
  @IsOptional()
  createdAt?: Date;

  @IsOptional()
  @IsString()
  createdBy?: string;

  @IsDateString()
  @IsOptional()
  updatedAt?: Date;

  @IsOptional()
  @IsString()
  updatedBy?: string;
}
