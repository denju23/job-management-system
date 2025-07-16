# 🧰 Job Management System - Backend

I have successfully developed a secure and scalable backend for a Job Management System using **Node.js v20**, Express, and MongoDB (Mongoose). The backend includes features such as user registration and login with JWT-based authentication, secure password hashing using bcrypt, and role-based access control (user/admin).

I structured the project using modular folder architecture with clear separation of concerns: controllers, routes, middlewares, models, and utils. For authentication, I implemented token generation and protected routes using a custom middleware. I also created centralized error handling using custom `ApiError` and error middleware, with enhanced logging via Winston and Morgan.

Job-related routes allow CRUD operations, and I added support for filtering, searching, sorting, and pagination while ensuring role-based data access — so users only see their own jobs while admins have full access. Input validation is handled using `express-validator` with proper error messages and custom validation middleware. Environment variables are securely managed using `.env`.

All routes were tested using Postman, with environment variables and dynamic token injection configured for protected requests. The system is production-ready, follows clean code principles, and emphasizes security, scalability, and clarity.

---

## ✅ Requirements

Make sure you have the following installed:

- [Node.js v20.x](https://nodejs.org/en/)
- [npm v9+](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/) (local or Atlas cloud instance)

---

## 🚀 Features

- User registration and login using JWT
- Role-based access control (admin, user)
- Job management (CRUD operations)
- Protected routes and authorization middleware
- Secure password storage using bcrypt
- Centralized error handling with custom ApiError
- Logging with Winston and Morgan
- Request validation using express-validator
- Search, filter, sort, and pagination for jobs
- Environment variables using `.env`
- Postman collection for testing APIs

---

## 📁 Folder Structure

