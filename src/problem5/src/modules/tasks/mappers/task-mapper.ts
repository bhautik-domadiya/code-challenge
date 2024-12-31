import { AuditInfoMapper } from "../../../core/audit-info/mapper/audit-info-mapper";
import { Task } from "../../../database/models/tasks/task.model";
import { CreateTaskDto } from "../dto/create-task-dto";
import { TaskDisplayModel } from "../dto/task-display-model";

export class TaskMapper {
  public static toDisplay(taskEntity: Task) {
    const task = new TaskDisplayModel();
    task.id = taskEntity.id;
    task.title = taskEntity.title;
    task.description = taskEntity.description;
    task.status = taskEntity.status;
    task.priority = taskEntity.priority;
    task.dueDate = taskEntity.dueDate;
    task.assignedTo = taskEntity.assignedTo;
    task.auditInfo = AuditInfoMapper.toAuditInfoDto(taskEntity.auditInfo);
    return task;
  }

  public static toTaskDisplayList(tasks: Task[]): TaskDisplayModel[] {
    if (!tasks || !tasks.length) {
      return [];
    }
    return tasks.map((task) => {
      return this.toDisplay(task);
    });
  }

  // Task model creation
  public static toTaskModel(createUserDTO: CreateTaskDto): Task {
    return new Task(createUserDTO);
  }
}
