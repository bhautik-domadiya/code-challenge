import { BaseCollection } from "../../../utils/collections/base-collection";
import { SuccessMappers } from "../../../utils/common-mappers";
import { ErrorCategories } from "../../../utils/errors/erorr-catagories";
import { ExpressError } from "../../../utils/errors/express.error";
import { logger } from "../../../utils/logger/logger";
import { CreateTaskDto } from "../dto/create-task-dto";
import { GetAllTaskQuery } from "../dto/get-all-task-query";
import { TaskDisplayModel } from "../dto/task-display-model";
import { UpdateTaskDto } from "../dto/update-task-dto";
import { TaskMapper } from "../mappers/task-mapper";
import { TaskRepository } from "../repositories/task-repository";

export enum TaskErrorCodeEnum {
  ErrorTaskValidation = "ERR_TASK_VALIDATION",
  ErrorTaskNotFound = "ERR_USER_NOT_FOUND",
  ErrorCreateTask = "ERR_TASK_CREATE",
  ErrorListingTask = "ERR_TASK_LIST",
  ErrorGetTaskById = "ERR_GET_TASK_BY_ID",
  ErrorUpdateTask = "ERR_TASK_UPDATE",
  ErrorRemoveTask = "ERR_TASK_REMOVE",
}

export class TaskService {
  expressError: ExpressError;

  constructor() {
    // Error Class initialization
    this.expressError = new ExpressError(ErrorCategories.User);
  }

  public async getAllTasks(getAllTask: GetAllTaskQuery) {
    try {
      logger.info(
        `Task : start executing get all tasks with query : ${JSON.stringify(
          getAllTask
        )} `
      );

      const [tasks, total] = await TaskRepository.getAllTasks(getAllTask);

      logger.info("Task : successfully get all tasks");
      return new BaseCollection(TaskMapper.toTaskDisplayList(tasks), total);
    } catch (error) {
      return this.expressError.updateError(
        TaskErrorCodeEnum.ErrorListingTask,
        `There was an error while get all tasks : ${error}`
      );
    }
  }

  public async getById(id: number): Promise<TaskDisplayModel | ExpressError> {
    try {
      logger.info("Task : start executing get task by Id");

      const task = await TaskRepository.getById(id);

      if (!task) {
        return this.expressError.updateError(
          TaskErrorCodeEnum.ErrorTaskNotFound,
          `task not found !`
        );
      }

      logger.info("Task : successfully get task by id ");
      return TaskMapper.toDisplay(task);
    } catch (error) {
      return this.expressError.updateError(
        TaskErrorCodeEnum.ErrorGetTaskById,
        `There was an error while get task by id : ${error}`
      );
    }
  }

  public async createTask(createTask: CreateTaskDto) {
    try {
      logger.info("Task : start executing create task");

      // validation : check title is exist / not
      const taskExist = await TaskRepository.getByTitle(createTask.title);
      if (taskExist) {
        return this.expressError.updateError(
          TaskErrorCodeEnum.ErrorCreateTask,
          `task already exist with title : ${createTask.title}`
        );
      }
      //   create task if not exist
      const createdTask = TaskMapper.toTaskModel(createTask);
      await TaskRepository.saveTask(createdTask);

      logger.info("Task : successfully created task");
      return TaskMapper.toDisplay(createdTask);
    } catch (error) {
      return this.expressError.updateError(
        TaskErrorCodeEnum.ErrorCreateTask,
        `There was an error while create task : ${error}`
      );
    }
  }

  public async updateTask(
    taskId: number,
    updateTask: UpdateTaskDto
  ): Promise<TaskDisplayModel | ExpressError> {
    try {
      logger.info("Task : start executing update task");
      // validation : task exist or not in db
      const taskExist = await TaskRepository.getById(taskId);
      if (!taskExist) {
        return this.expressError.updateError(
          TaskErrorCodeEnum.ErrorTaskNotFound,
          `task not found with id : ${taskId}`
        );
      }

      //   update task :
      taskExist.update(updateTask);
      await TaskRepository.saveTask(taskExist);

      logger.info("Task : successfully updated task");
      return TaskMapper.toDisplay(taskExist);
    } catch (error) {
      return this.expressError.updateError(
        TaskErrorCodeEnum.ErrorUpdateTask,
        `There was an error while update task : ${error}`
      );
    }
  }

  public async removeTask(taskId: number) {
    try {
      logger.info("Task : start executing remove task");

      // validation : task exist or not in db
      const taskExist = await TaskRepository.getById(taskId);
      if (!taskExist) {
        return this.expressError.updateError(
          TaskErrorCodeEnum.ErrorTaskNotFound,
          `task not found with id : ${taskId}`
        );
      }

      //   remove task here
      await TaskRepository.removeTask(taskExist);

      logger.info("Task : successfully removed task");

      return SuccessMappers.toDisplay(true, "task deleted successfully !");
    } catch (error) {
      return this.expressError.updateError(
        TaskErrorCodeEnum.ErrorRemoveTask,
        `There was an error while remove task : ${error}`
      );
    }
  }
}
