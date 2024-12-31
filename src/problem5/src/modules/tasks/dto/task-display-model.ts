
import { AuditInfoDto } from "../../../core/audit-info/dto/audit-info-dto";
import { TaskPriorityEnum, TaskStatusEnum } from "../../../core/enums/database-validation-enums";

export class TaskDisplayModel {
id:number

  title: string;

  description: string;

  status: TaskStatusEnum;

  priority: TaskPriorityEnum;

  dueDate: Date;

  assignedTo: string;

  auditInfo:AuditInfoDto
}
