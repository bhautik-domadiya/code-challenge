import { Request, Response } from "express";
import { BaseController } from "../../../core/api/base-controller";
import { ExpressError } from "../../../utils/errors/express.error";
import { SuccessDisplayModel } from "@utils/base-display-model";
import { TaskService } from "../services/task.service";

export class TaskController extends BaseController {
  public taskService: TaskService;

  constructor() {
    super();
    this.taskService = new TaskService();
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.createTask = this.createTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
  }

  public async getAll(
    req: Request,
    res: Response
  ): Promise<Response<SuccessDisplayModel | ExpressError>> {
    return this.getResult(await this.taskService.getAllTasks(req.query), res);
  }

  public async getById(
    req: Request,
    res: Response
  ): Promise<Response<SuccessDisplayModel | ExpressError>> {
    const taskId = Number(req.params?.id);
    return this.getResult(await this.taskService.getById(taskId), res);
  }

  public async createTask(
    req: Request,
    res: Response
  ): Promise<Response<SuccessDisplayModel | ExpressError>> {
    return this.getResult(await this.taskService.createTask(req.body), res);
  }

  public async updateTask(
    req: Request,
    res: Response
  ): Promise<Response<SuccessDisplayModel | ExpressError>> {
    console.log("req.params?.id ->",req.params?.id)
    const taskId = Number(req.params?.id);
    return this.getResult(
      await this.taskService.updateTask(taskId, req.body),
      res
    );
  }

  public async removeTask(
    req: Request,
    res: Response
  ): Promise<Response<SuccessDisplayModel | ExpressError>> {
    const taskId = Number(req.params?.id);
    return this.getResult(await this.taskService.removeTask(taskId), res);
  }
}
