import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from "class-validator";
import { orderBy } from "../core/query/query-validation-enum";

export class IdParamDTO {
  @IsNotEmpty()
  id: number;
}

export class PaginationDTO {
  @IsOptional()
  @IsNumber()
  @Min(0)
  skip?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number;

  @IsOptional()
  sortOrder?: orderBy;

  

}
