import { IsDate, IsEnum, IsString } from "class-validator";

import {  Type } from "class-transformer";
import {
  TaskPriorityEnum,
  TaskStatusEnum,
} from "../../../core/enums/database-validation-enums";

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(TaskStatusEnum)
  status: TaskStatusEnum;

  @IsEnum(TaskPriorityEnum)
  priority: TaskPriorityEnum;

  @Type(() => Date) // Transform string to Date
  @IsDate()
  dueDate: Date;

  @IsString()
  assignedTo: string;
}
