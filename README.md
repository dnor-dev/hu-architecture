# BreezeLearn - Scalable E-Learning System (HU App)

This project is a scalable backend system for a global e-learning platform where students can request tutorial sessions and be matched with tutors by the admin team. It showcases features like authentication, request management, session scheduling, reminder notifications, and role-based access control.

---

## Features

- JWT-based Authentication for Students, Tutors, and Admins
- Students can create Tutorial Requests
- Admins can assign Tutors to requests
- Tutors can create live Session Rooms
- Reminders via BullMQ for sessions 1 hour before start time
- Session Notes and Ratings (to be expanded)
- Role-Based Access Middleware

---

## Project Structure

<pre>
    ```src/
├── controllers/ # Route Handlers
├── services/ # Business Logic
├── entities/ # TypeORM Entity Models
├── routes/ # Express Route Definitions
├── middleware/ # Express Middleware
├── utils/ # Utility functions (e.g. JWT, hashing)
├── jobs/ # BullMQ Workers and Queues
└── index.ts # Application Entry Point ```
</pre>

## API Endpoints

### Auth

- `POST /auth/signup` – Register user (`role`: student, tutor, or admin)
- `POST /auth/login` – Login and receive JWT token

### Tutorial Requests

- `POST /request` – Student creates tutorial request
- `GET /request` – Admin fetches all pending requests
- `PATCH /request/:id/assign` – Admin assigns a tutor

### Sessions

- `POST /sessions` – Tutor creates a session
- `GET /sessions/:id` – Get session info

---

## Auth & Middleware

- JWT is used for secure access across routes
- Role-based middleware ensures proper access:
  - Students can only create requests
  - Admins can assign tutors
  - Tutors can create sessions

---

## Technologies Used

- **Node.js**, **Express**
- **TypeScript**
- **PostgreSQL** via **TypeORM**
- **Redis** + **BullMQ** for job queues
- **bcrypt** for secure password hashing
- **JWT** for authentication
- **dotenv** for env config

---

```

```
