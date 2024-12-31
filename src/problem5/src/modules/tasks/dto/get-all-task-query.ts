import { IsEnum, IsOptional } from "class-validator";
import { PaginationDTO } from "../../../utils/common.dto";
import { TaskStatusEnum } from "../../../core/enums/database-validation-enums";

export class GetAllTaskQuery extends PaginationDTO {
  @IsOptional()
  status?: TaskStatusEnum;
}
