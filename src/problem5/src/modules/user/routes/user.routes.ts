import express from "express";
import { UserController } from "../controller/user.controller";
import { paginationMiddleware } from "../../../middlewares/pagination.middleware";
import { ErrorCategories } from "../../../utils/errors/erorr-catagories";
import { UserErrorCodeEnum } from "../services/user.service";
import { validationMiddleware } from "../../../middlewares/validation.middleware";
import { PaginationDTO } from "../../../utils/common.dto";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { withAuth } from "../../../utils/controller-wrappers";

const router = express.Router();
const userController = new UserController();

/**
 * @swagger
 * tags:
 *   name: User
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PaginationDTO:
 *       type: object
 *       properties:
 *         skip:
 *           type: integer
 *           description: The number of items to skip in the result set.
 *           example: 0
 *         limit:
 *           type: integer
 *           description: The number of items to return per page (max 100).
 *           minimum: 1
 *           maximum: 100
 *           example: 10
 *         sortOrder:
 *           type: string
 *           description: The order in which to sort the results.
 *           enum:
 *             - ASC
 *             - DESC
 *           example: ASC
 *         status:
 *           type: string
 *           description: filter by status
 *           enum:
 *             - pending
 *             - in-progress
 *             - completed
 *           example: pending
 *       required:
 *         - limit
 *         - skip
 *       description: Pagination DTO used for paginating API results.
 */

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Retrieve a list of users based on pagination and filtering parameters
 *     tags: [User]
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
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserDisplayModel'
 */

router.get(
  "/",
  authMiddleware,
  paginationMiddleware(
    ErrorCategories.User,
    UserErrorCodeEnum.ErrorListingUsers
  ),
  validationMiddleware({
    errorOptions: {
      category: ErrorCategories.User,
      code: UserErrorCodeEnum.ErrorListingUsers,
    },
    query: PaginationDTO,
    numericFieldsInQueryParams: ["skip", "limit"],
  }),

  withAuth(userController.getAllUsers)
);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     UserDisplayModel:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the industry.
 *           example: "60d21b4667d0d8992e610c85"
 *         name:
 *           type: string
 *           description: The name of the industry.
 *           example: "Information Technology"
 *       required:
 *         - _id
 *         - name
 */
