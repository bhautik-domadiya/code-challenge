import express from "express";
import { ErrorCategories } from "../../../utils/errors/erorr-catagories";
import { validationMiddleware } from "../../../middlewares/validation.middleware";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { withAuth } from "../../../utils/controller-wrappers";
import { TaskController } from "../controller/task.controller";
import { TaskErrorCodeEnum } from "../services/task.service";
import { CreateTaskDto } from "../dto/create-task-dto";
import { IdParamDTO, PaginationDTO } from "../../../utils/common.dto";
import { UpdateTaskDto } from "../dto/update-task-dto";

const router = express.Router();
const taskController = new TaskController();

/**
 * @swagger
 * tags:
 *   name: Task
 */

/**
 * @swagger
 * /api/task:
 *   post:
 *     summary: Create task
 *     tags: [Task]
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Learn Node js
 *                 description: title of task
 *               description:
 *                 type: string
 *                 example: task des
 *                 description: task description
 *               status:
 *                 type: string
 *                 example: pending
 *                 description: task status (pending,in-progress,completed)
 *                 enum:
 *                  - pending
 *                  - in-progress
 *                  - completed
 *               priority:
 *                 type: string
 *                 example: medium
 *                 description: task priority (low,medium,high)
 *                 enum:
 *                  - low
 *                  - medium
 *                  - high
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 description: task due date
 *                 example: 2024-12-31
 *               assignedTo:
 *                 type: string
 *                 example: demo user
 *                 description: task due date
 *             required:
 *               - title
 *               - description
 *               - status
 *               - priority
 *               - assignedTo
 *
 *     responses:
 *       200:
 *         description: Register a new user and receive access and refresh tokens
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskDisplayModel'
 */

router.post(
  "/",
  authMiddleware,
  validationMiddleware({
    errorOptions: {
      category: ErrorCategories.Task,
      code: TaskErrorCodeEnum.ErrorCreateTask,
    },
    body: CreateTaskDto,
  }),
  withAuth(taskController.createTask)
);

/**
 * @swagger
 * /api/task/{id}:
 *   get:
 *     summary: Get a task by its ID
 *     description: Retrieve a single task by its unique ID. Returns a 404 error if the task is not found.
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the task to retrieve.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved the task.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: Write blog post
 *                 description:
 *                   type: string
 *                   example: Draft a blog post about Node.js
 *                 status:
 *                   type: string
 *                   example: pending
 *                 priority:
 *                   type: string
 *                   example: high
 *                 due_date:
 *                   type: string
 *                   format: date
 *                   example: 2024-02-15
 *                 assigned_to:
 *                   type: string
 *                   example: John Doe
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: 2024-01-01T12:00:00Z
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   example: 2024-01-10T12:00:00Z
 */

router.get(
  "/:id",
  authMiddleware,
  validationMiddleware({
    errorOptions: {
      category: ErrorCategories.Task,
      code: TaskErrorCodeEnum.ErrorGetTaskById,
    },
    params: IdParamDTO,
    numericFieldsInQueryParams: ["id"],
  }),
  withAuth(taskController.getById)
);

/**
 * @swagger
 * /api/task:
 *   get:
 *     summary: Retrieve a list of task based on pagination and filtering parameters
 *     tags: [Task]
 *     parameters:
 *       - in: query
 *         name: skip
 *         schema:
 *           $ref: '#/components/schemas/PaginationDTO/properties/skip'
 *         description: The number of items to skip before starting to collect the result set.
 *       - in: query
 *         name: limit
 *         schema:
 *           $ref: '#/components/schemas/PaginationDTO/properties/limit'
 *         description: The maximum number of items to return.
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           $ref: '#/components/schemas/PaginationDTO/properties/sortOrder'
 *         description: The order in which results should be sorted. 'asc' for ascending, 'desc' for descending.
 *       - in: query
 *         name: status
 *         schema:
 *           $ref: '#/components/schemas/PaginationDTO/properties/status'
 *         description: filter by status 
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TaskDisplayModel'
 */

router.get(
  "/",
  authMiddleware,
  validationMiddleware({
    errorOptions: {
      category: ErrorCategories.Task,
      code: TaskErrorCodeEnum.ErrorListingTask,
    },
    query: PaginationDTO,
    numericFieldsInQueryParams: ["skip", "limit"],
  }),
  withAuth(taskController.getAll)
);

/**
 * @swagger
 * /api/task/{id}:
 *   put:
 *     summary: update task
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the task to retrieve.
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Learn Node js
 *                 description: title of task
 *               description:
 *                 type: string
 *                 example: task des
 *                 description: task description
 *               status:
 *                 type: string
 *                 example: pending
 *                 description: task status (pending,in-progress,completed)
 *                 enum:
 *                  - pending
 *                  - in-progress
 *                  - completed
 *               priority:
 *                 type: string
 *                 example: medium
 *                 description: task priority (low,medium,high)
 *                 enum:
 *                  - low
 *                  - medium
 *                  - high
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 description: task due date
 *                 example: 2024-12-31
 *               assignedTo:
 *                 type: string
 *                 example: demo user
 *                 description: task due date
 *             required:
 *               - title
 *               - description
 *               - status
 *               - priority
 *               - assignedTo
 *
 *     responses:
 *       200:
 *         description: Register a new user and receive access and refresh tokens
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskDisplayModel'
 */

router.put(
  "/:id",
  authMiddleware,
  validationMiddleware({
    errorOptions: {
      category: ErrorCategories.Task,
      code: TaskErrorCodeEnum.ErrorUpdateTask,
    },
    body: UpdateTaskDto,
    params: IdParamDTO,
    numericFieldsInQueryParams: ["id"],
  }),
  withAuth(taskController.updateTask)
);

/**
 * @swagger
 * /api/task/{id}:
 *   delete:
 *     summary: remove task by id
 *     description: Retrieve a single task by its unique ID. Returns a 404 error if the task is not found.
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the task to retrieve.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Register a new user and receive access and refresh tokens
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/SuccessDisplayModel'
 */
router.delete(
  "/:id",
  authMiddleware,
  validationMiddleware({
    errorOptions: {
      category: ErrorCategories.Task,
      code: TaskErrorCodeEnum.ErrorRemoveTask,
    },
    params: IdParamDTO,
    numericFieldsInQueryParams: ["id"],
  }),
  withAuth(taskController.removeTask)
);

export default router;

/**
|--------------------------------------------------
| Compo
|--------------------------------------------------
*/

/**
 * @swagger
 * components:
 *   schemas:
 *     TaskDisplayModel:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: The unique identifier of the task.
 *           example: 1
 *         title:
 *           type: string
 *           description: The title of the task.
 *           example: "Information Technology"
 *         description:
 *           type: string
 *           description: The title of the task.
 *           example: "Information Technology"
 *         status:
 *           type: string
 *           description: The title of the task.
 *           example: "Information Technology"
 *         priority:
 *           type: string
 *           description: The title of the task.
 *           example: "Information Technology"
 *         dueDate:
 *           type: string
 *           description: The title of the task.
 *           example: "Information Technology"
 *         assignedTo:
 *           type: string
 *           description: The title of the task.
 *           example: "Information Technology"
 */
