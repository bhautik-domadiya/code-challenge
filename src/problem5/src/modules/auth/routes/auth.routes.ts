import express from "express";
import { AuthController } from "../controller/auth.controller";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { AuthErrorCodeEnum } from "@modules/auth/services/auth.service";
import { ErrorCategories } from "@utils/errors/erorr-catagories";
import { withAuth } from "@utils/controller-wrappers";
import { RegisterDTO } from "../dto/register-user.dto";
import { validationMiddleware } from "../../../middlewares/validation.middleware";
import { LoginDTO } from "../dto/login-user.dto";
import { ChangePasswordDTO } from "../dto/change-password.dto";
import { VerifyOtpDto } from "../dto/verify-otp.dto";

const router = express.Router();
const authController = new AuthController();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *                 description: First name of the user
 *               lastName:
 *                 type: string
 *                 example: Doe
 *                 description: Last name of the user
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *                 description: Email address of the user
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 example: Password@123
 *                 description: Password for the user account
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *
 *     responses:
 *       200:
 *         description: Register a new user and receive access and refresh tokens
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/SuccessDisplayModel'
 */
router.post(
  "/register",
  validationMiddleware({
    errorOptions: {
      category: ErrorCategories.Auth,
      code: AuthErrorCodeEnum.ErrorAuthValidation,
    },
    body: RegisterDTO,
  }),
  authController.register
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       -  Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                     type: string
 *                     format: email
 *               password:
 *                     type: string
 *                     format: password
 *             required:
 *               - email
 *               - password
 *           examples:
 *             newUser:
 *               value:
 *                 {
 *                   "email": "user@example.com",
 *                   "password": "Password@123"
 *                 }
 *     responses:
 *       '201':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token_type:
 *                       type: string
 *                 scope:
 *                       type: string
 *                 expires_in:
 *                       type: integer
 *                       example: 3600
 */
router.post(
  "/login",
  validationMiddleware({
    errorOptions: {
      category: ErrorCategories.Auth,
      code: AuthErrorCodeEnum.ErrorAuthValidation,
    },
    body: LoginDTO,
  }),
  authController.login
);

/**
 * @swagger
 * /api/auth/change-password:
 *   post:
 *     summary: Change the user's password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 example: oldpassword123
 *               newPassword:
 *                 type: string
 *                 example: newpassword123
 *             required:
 *               - oldPassword
 *               - newPassword
 *     responses:
 *       200:
 *         description: OTP sent to email.
 *         content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/SuccessDisplayModel'
 *       400:
 *         description: Bad Request - Validation error or missing parameters
 *       401:
 *         description: Unauthorized - Authentication is required
 *       403:
 *         description: Forbidden - User does not have permission to change the password
 */
router.post(
  "/change-password",
  authMiddleware,
  validationMiddleware({
    errorOptions: {
      category: ErrorCategories.Auth,
      code: AuthErrorCodeEnum.ErrorAuthValidation,
    },
    body: ChangePasswordDTO,
  }),
  withAuth(authController.changePassword)
);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get the current authenticated user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successfully retrieved the current user details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "1234567890abcdef"
 *                   description: Unique identifier for the user
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: user@example.com
 *                   description: Email address of the user
 *                 firstName:
 *                   type: string
 *                   example: John
 *                   description: First name of the user
 *                 lastName:
 *                   type: string
 *                   example: Doe
 *                   description: Last name of the user
 *                 phone:
 *                   type: integer
 *                   example: 1234567890
 *                   description: Phone number of the user
 *               required:
 *                 - id
 *                 - email
 *                 - firstName
 *                 - lastName
 *                 - role
 *                 - phone
 *       401:
 *         description: Unauthorized - Authentication is required
 *       403:
 *         description: Forbidden - User does not have permission to access this resource
 */

router.get("/me", authMiddleware, withAuth(authController.getCurrentUser));

/**
 * @swagger
 * /api/auth/refresh-token:
 *   post:
 *     summary: Get new access token and refresh token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *                 description: Email address of the user
 *
 *             required:
 *               - refreshToken
 *
 *     responses:
 *       200:
 *         description: Login successful, returns access and refresh tokens
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token_type:
 *                   type: string
 *                   example: bearer
 *                 expires_in:
 *                   type: integer
 *                   example: 3600
 *                 access_token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5...
 *                 refresh_token:
 *                   type: string
 *                   example: def50200a0...
 */
router.post(
  "/refresh-token",
  // authMiddleware,
  authController.refreshAccessToken
);

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Request a password reset
 *     description: Initiates the password reset process by sending a reset link to the user's email.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *                 description: Email address of the user
 *     responses:
 *       200:
 *         description: OTP sent to email.
 *         content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/SuccessDisplayModel'
 *       400:
 *         description: Bad request, invalid input data.
 *       500:
 *         description: Internal server error.
 */
router.post("/forgot-password", authController.forgotPassword);

/**
 * @swagger
 * /api/auth/resend-otp:
 *   post:
 *     summary: Resend Otp
 *     tags:
 *       -  Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                     type: string
 *                     format: email
 *             required:
 *               - email
 *           examples:
 *             newUser:
 *               value:
 *                 {
 *                   "email": "user@example.com"
 *                 }
 *     responses:
 *       '200':
 *         description: Otp send successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                       type: boolean
 *                 message:
 *                       type: string
 */

router.post("/resend-otp", authController.resendOtp);

/**
 * @swagger
 * /api/auth/verify-otp:
 *   post:
 *     summary: Verify Otp
 *     tags:
 *       -  Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                     type: string
 *                     format: email
 *               otp:
 *                     type: string
 *             required:
 *               - email
 *               - otp
 *           examples:
 *             newUser:
 *               value:
 *                 {
 *                   "email": "user@example.com",
 *                   "otp": "0000"
 *                 }
 *     responses:
 *       '201':
 *         description: Otp send successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tempToken:
 *                       type: string
 *                       example: "temp......"
 */
router.post(
  "/verify-otp",
  validationMiddleware({
    errorOptions: {
      category: ErrorCategories.Auth,
      code: AuthErrorCodeEnum.ErrorAuthValidation,
    },
    body: VerifyOtpDto,
  }),
  authController.verifyOtp
);

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset your password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: Test1@1234
 *               tempToken:
 *                 type: string
 *                 example: "token....."
 *             required:
 *               - password
 *               - tempToken
 *     responses:
 *       200:
 *         description: Otp verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessDisplayModel'
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.post("/reset-password", authController.resetPassword);

export default router;

/**
|--------------------------------------------------
| Common  Components
|--------------------------------------------------
*/

/**
 * @swagger
 * components:
 *   schemas:
 *     SuccessDisplayModel:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates if the email was successfully sent
 *           example: true
 *         message:
 *           type: string
 *           description: Message confirming the email was sent
 *           example: "successfully performed operation"
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     AuthDisplayModel:
 *       type: object
 *       properties:
 *         token_type:
 *           type: string
 *           description: The type of token, typically "bearer"
 *           example: "bearer"
 *         scope:
 *           type: string
 *           description: The scope of the access token
 *           example: "read write"
 *         expires_in:
 *           type: integer
 *           description: The time in seconds until the access token expires
 *           example: 3600
 *         ext_expires_in:
 *           type: integer
 *           description: The extended time in seconds until the token expires if it’s extended
 *           example: 7200
 *         access_token:
 *           type: string
 *           description: The access token issued to the user
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         refresh_token:
 *           type: string
 *           description: The refresh token issued to the user
 *           example: "def50200f77b56761b5b2..."
 *         id_token:
 *           type: string
 *           description: The ID token issued to the user, typically used in OpenID Connect
 *           example: "eyJraWQiOiJrMm1qXzJy..."
 */
