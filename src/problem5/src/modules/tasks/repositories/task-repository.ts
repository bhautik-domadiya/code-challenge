import { orderBy } from "../../../core/query/query-validation-enum";
import { dataSource } from "../../../database/connection/db.connection";
import { Task } from "../../../database/models/tasks/task.model";
import { GetAllTaskQuery } from "../dto/get-all-task-query";

export const TaskRepository = dataSource.getRepository(Task).extend({
  // Get task record by id
  async getById(id: number): Promise<Task | null> {
    const task = await this.findOne({
      where: { id },
    });
    if (!task) {
      return null;
    }
    return task;
  },

  // Get all tasks
  async getAllTasks(query: GetAllTaskQuery) {
    let sortBy = "task.auditInfo.createdAt";

    let queryable = this.createQueryBuilder("task");

    if (query) {
      queryable
        .orderBy(sortBy, query.sortOrder || orderBy.DESC)
        .skip(query.skip)
        .take(query.limit);
    }

    // Filter by status if it's provided in the query
    if (query.status) {
      queryable.andWhere("task.status = :status", { status: query.status });
    }

    return await queryable.getManyAndCount();
  },

  //   Get task by id
  async getByTitle(title: string): Promise<Task | null> {
    const task = await this.findOne({
      where: { title },
    });
    if (!task) {
      return null;
    }
    return task;
  },

  //   remove task (soft delete)
  async removeTask(task: Task) {
    // remove
    await this.softRemove(task);
  },

  // Save task
  async saveTask(task: Task): Promise<Task> {
    return this.save(task);
  },
});
