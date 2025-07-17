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



# 💼 Job Management System - Frontend

This is the **frontend** of the Job Management System, developed using **React v19** with **Vite** for fast development and build. It includes **responsive UI** using Bootstrap, dynamic tables with filtering and sorting using `@tanstack/react-table`, form handling with `react-hook-form`, and client-side routing using React Router v7.

The frontend interacts with the backend API to support user and admin functionalities like registration, login, dashboard views, job creation/editing, and role-based job access.

---

## ✅ Requirements

Ensure you have the following installed:

- [Node.js v20.x](https://nodejs.org/)
- [npm v9+](https://www.npmjs.com/)
- Backend server running (API)

---

## ⚙️ Tech Stack

- **React v19**
- **Vite v7**
- **React Router v7**
- **Bootstrap v5**
- **React-Bootstrap**
- **React Hook Form**
- **React Toastify**
- **@tanstack/react-table v8**
- **Axios** (for API calls)

---

## 🚀 Features

- User & Admin Login/Register (JWT-based)
- Dashboard layout with role-based views
- Create, edit, and delete jobs (modal based)
- Show job listings in a styled, paginated table
- Filtering, searching, and status tags
- Toast notifications for user feedback
- Responsive UI for all screen sizes
- Context API for global auth & job state
- Form validation and error messages

---

## 📁 Folder Structure

