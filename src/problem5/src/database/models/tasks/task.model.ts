import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { AuditInfo } from "../../../core/audit-info/audit-info";
import { TaskPriorityEnum, TaskStatusEnum } from "../../../core/enums/database-validation-enums";


interface taskParam {
  title: string;
  description: string;
  status: TaskStatusEnum;
  priority: TaskPriorityEnum;
  dueDate: Date;
  assignedTo: string;
}

@Entity("tasks")
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", name: "title", length: 255 })
  title: string;

  @Column({ type: "text", name: "description" })
  description: string;

  @Column({
    type: "varchar",
    name: "status",
    length: 50,
    unique: true,
  })
  status: TaskStatusEnum;

  @Column({ type: "varchar", name: "priority", length: 20 })
  priority: TaskPriorityEnum;

  @Column({ type: "date", name: "due_date" })
  dueDate: Date;

  @Column({ type: "varchar", name: "assigned_to", length: 50 })
  assignedTo: string;

  @Column(() => AuditInfo, { prefix: false })
  auditInfo: AuditInfo;

  constructor(param: taskParam) {
    super();
    if (param) {
      this.title = param.title;
      this.description = param.description;
      this.status = param.status;
      this.priority = param.priority;
      this.dueDate = param.dueDate;
      this.assignedTo = param.assignedTo;
    }
  }

  update(param: taskParam) {
    if (param) {
      this.title = param.title;
      this.description = param.description;
      this.status = param.status;
      this.priority = param.priority;
      this.dueDate = param.dueDate;
      this.assignedTo = param.assignedTo;
    }
  }
}
