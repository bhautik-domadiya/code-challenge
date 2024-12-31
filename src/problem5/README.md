# **Express API with TypeORM and PostgreSQL**

A robust RESTful API built with Express.js, TypeORM, and PostgreSQL, featuring a migration setup for database version control.

---

## **Features**

- Built with **Express.js** for routing and middleware.
- Database integration using **TypeORM** with support for migrations.
- **PostgreSQL** as the database.
- Support for environment-based configurations.
- Scalable and structured codebase.
- CRUD operations with validation and error handling.

---

## **Prerequisites**

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (>= 14.x)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/)

---

## **Setup Instructions**

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. . Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a .env file in the root directory and configure the following variables:

```bash
#
# App Configuration
#
FRONT_END_URL=your_frontend_url
APP_PORT=your_app_port
#
# Database Configuration
#
DB_HOST=your_db_host
DB_PORT=your_db_port
DB_USERNAME=your_db_uname
DB_PASSWORD=your_db_pass
DB_NAME=your_db_name
#
# Swagger
#
SWAGGER_ENABLED=true
SWAGGER_ROUTE=/swagger
SWAGGER_USERNAME=admin
SWAGGER_PASSWORD=1234
#
# JWT Configuration
#
ACCESS_TOKEN_SECRET=access_token_secret
ACCESS_TOKEN_EXPIRY=20m
REFRESH_TOKEN_SECRET=refresh_token_secret
REFRESH_TOKEN_EXPIRY=2d
CRYPTO_SALT=5EbwVqBmHttb8fMwbC7PJ+6Q1musnjTb
#
# OTP / Token Expiry
#
OTP_EXPIRY_SECONDS=600  # 10 minutes (60 * 10 seconds)
TOKEN_EXPIRY_SECONDS=600 # 10 minutes (60 * 10 seconds)
#
# Node Environment
#
NODE_ENV=dev

```

### 4. Run Database Migrations

Generate and run database migrations using TypeORM:

```bash
npm run migration:create  # Generate a migration
```

```bash
npm run migration # run migration
```

### 4. Run Database Migrations

Run the server in development mode:

```bash
npm run dev
```

## **Technologies Used**

The project uses the following technologies and libraries:

- **Node.js**: A JavaScript runtime environment.
- **Express.js**: A web application framework for Node.js.
- **TypeORM**: An Object-Relational Mapper (ORM) for database interaction.
- **PostgreSQL**: A powerful, open-source relational database.
- **TypeScript**: A superset of JavaScript with static typing.
- **class-validator**: A library for validating class-based objects.
- **class-transformer**: A library for transforming plain objects to class instances and vice versa.

---

## **Available API Endpoints**

### **Auth Endpoints**

The following endpoints are available for authentication:

| Method   | Endpoint                    | Description             |
| -------- | --------------------------- | ----------------------- |
| **POST** | `/api/auth/register`        | register new user       |
| **POST** | `/api/auth/login`           | Login user              |
| **POST** | `/api/auth/change-password` | change password by user |
| **GET**  | `/api/auth/me`              | get current user        |
| **POST** | `/api/auth/refresh-token`   | get new access token    |
| **POST** | `/api/auth/forgot-password` | forgot user password    |
| **POST** | `/api/auth/resend-otp`      | resend OTP              |
| **POST** | `/api/auth/verify-otp`      | verify OTP ( Default - 0000 ) |
| **POST** | `/api/auth/reset-password`  | set new password        |

### **User Endpoints**

The following endpoints are available for authentication:

| Method  | Endpoint    | Description       |
| ------- | ----------- | ----------------- |
| **GET** | `/api/user` | get list of users |

### **Task Endpoints**

The following endpoints are available for managing tasks:

| Method     | Endpoint        | Description                               |
| ---------- | --------------- | ----------------------------------------- |
| **GET**    | `/api/task`     | Retrieve all tasks with optional filters. |
| **GET**    | `/api/task/:id` | Retrieve a single task by its ID.         |
| **POST**   | `/api/task`     | Create a new task.                        |
| **PUT**    | `/api/task/:id` | Update an existing task by its ID.        |
| **DELETE** | `/api/task/:id` | Soft delete a task by its ID.             |

## Project Structure

```ts
+-- dist // Source build
+-- node_modules // Contains all npm dependencies
+-- src
|   +-- core // Contain the core functionality
|   |   +-- dto
|   |   +-- enums
|   |   +-- mappers
|   |   +-- query
|   +-- database // Contain the database config / migrations / model
|   +-- modules
|   |   +-- <module_name> //Name of module
|   |   |    +-- controllers //Controllers
|   |   |    +-- dto // DTO (Data Transfer Object) Schema, Validation
|   |   |    +-- mappers // Mapper for data transfer
|   |   |    +-- repositories //  Custom repository
|   |   |    +-- services // Services for specific module
|   |   +-- * // Other common modules
|   +-- utils // Contain all utility classes/area of application
|   |    +-- collection // use for the pagination return response
|   |    +-- errors //contain errors
|   |    +-- helpers // token provider and crypto service 
|   |    +-- logger // setup of logger
|   |    +-- swagger //setup of swaager
|   +-- app.ts // Entry point of application
|   +-- env.ts
|   +-- routes.ts // all routes
|   +-- server.ts // Entry point of application
+-- .env // environment variable


```

- API Document endpoints

  swagger-ui Endpoint : http://localhost:5050/swagger

  Enter above Cred for login in swagger 

  ```bash
  Username : admin
  Password : 1234
  ```