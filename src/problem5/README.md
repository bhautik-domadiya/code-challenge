# Express API with TypeORM and PostgreSQL

A production-ready RESTful API built with Express.js, TypeORM, and PostgreSQL. This project implements a robust architecture with comprehensive features for building scalable backend applications.

## ✨ Features

- **Express.js Framework**

  - Robust routing and middleware system
  - Well-structured request/response handling
  - Comprehensive error management

- **Database Integration**

  - TypeORM with full migration support
  - PostgreSQL for reliable data persistence
  - Optimized query performance

- **Security & Authentication**

  - JWT-based authentication
  - Secure password handling
  - OTP verification system

- **Developer Experience**

  - Swagger UI API documentation
  - Environment-based configurations
  - TypeScript for type safety
  - Structured codebase with clear separation of concerns

- **Data Validation**
  - Request validation using class-validator
  - Comprehensive error handling
  - Data transformation with class-transformer

## 🚀 Quick Start

### Prerequisites

- Node.js >= 20.x
- npm or yarn
- PostgreSQL

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment**
   Create a `.env` file in the root directory:

    **Note** : you can simply copy .env from env.example file
   ```env
   # App Configuration
   FRONT_END_URL=your_frontend_url
   APP_PORT=your_app_port

   # Database Configuration
   DB_HOST=your_db_host
   DB_PORT=your_db_port
   DB_USERNAME=your_db_uname
   DB_PASSWORD=your_db_pass
   DB_NAME=your_db_name

   # Swagger Configuration
   SWAGGER_ENABLED=true
   SWAGGER_ROUTE=/swagger
   SWAGGER_USERNAME=admin
   SWAGGER_PASSWORD=1234

   # JWT Configuration
   ACCESS_TOKEN_SECRET=access_token_secret
   ACCESS_TOKEN_EXPIRY=20m
   REFRESH_TOKEN_SECRET=refresh_token_secret
   REFRESH_TOKEN_EXPIRY=2d
   CRYPTO_SALT=5EbwVqBmHttb8fMwbC7PJ+6Q1musnjTb

   # OTP Configuration
   OTP_EXPIRY_SECONDS=600
   TOKEN_EXPIRY_SECONDS=600

   # Environment
   NODE_ENV=dev
   ```



4. **Run migrations**
   ```bash
   npm run migration         # Apply or Run migration
   ```
   **Note** : We already add the sample login user , After running migrations, you can log in with these credentials:

   **Default Login Credentials**
    - email: `admin123@gmail.com`
    - Password: `Password@123`

5. **Start development server**

   ```bash
   npm run dev
   ```

6. **API Documentation with swagger**

    Access the API documentation at: [http://localhost:5050/swagger]

   **Default swagger Credentials**
 
   - Username: `admin`
   - Password: `1234`

### Available Endpoints

#### Authentication

| Method | Endpoint                    | Description                |
| ------ | --------------------------- | -------------------------- |
| POST   | `/api/auth/register`        | Register new user          |
| POST   | `/api/auth/login`           | User login                 |
| POST   | `/api/auth/change-password` | Change password            |
| GET    | `/api/auth/me`              | Get current user           |
| POST   | `/api/auth/refresh-token`   | Refresh access token       |
| POST   | `/api/auth/forgot-password` | Initiate password reset    |
| POST   | `/api/auth/resend-otp`      | Resend OTP                 |
| POST   | `/api/auth/verify-otp`      | Verify OTP (Default: 0000) |
| POST   | `/api/auth/reset-password`  | Set new password           |

#### Users

| Method | Endpoint    | Description    |
| ------ | ----------- | -------------- |
| GET    | `/api/user` | List all users |

#### Tasks

| Method | Endpoint        | Description             |
| ------ | --------------- | ----------------------- |
| GET    | `/api/task`     | List tasks with filters |
| GET    | `/api/task/:id` | Get task by ID          |
| POST   | `/api/task`     | Create task             |
| PUT    | `/api/task/:id` | Update task             |
| DELETE | `/api/task/:id` | Soft delete task        |

## 📁 Project Structure

```
src/
├── core/                # Core functionality
│   ├── dto/             # Data Transfer Objects
│   ├── enums/           # Enumerations
│   ├── mappers/         # Data mappers
│   └── query/           # Query builders
├── database/            # Database configuration
├── modules/             # Feature modules
│   └── <module_name>/   # Module-specific code
│       ├── controllers/
│       ├── dto/
│       ├── mappers/
│       ├── repositories/
│       └── services/
└── utils/              # Utility functions
    ├── collection/     # Pagination utilities
    ├── errors/         # Error handling
    ├── helpers/        # Helper functions
    ├── logger/         # Logging setup
    └── swagger/        # Swagger configuration
```

## 🛠 Technologies

- **Core**

  - Node.js
  - Express.js
  - TypeScript
  - PostgreSQL

- **ORM & Database**

  - TypeORM
  - Database migrations

- **Validation & Transformation**

  - class-validator
  - class-transformer

- **Documentation**
  - Swagger UI

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
