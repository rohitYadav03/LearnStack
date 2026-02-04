# LearnStack 

LearnStack is a full-stack task management application that allows users to create tasks with deadlines and receive **email reminders** if tasks are not completed on time.  
The system combines **REST APIs** with **background job processing** for reliable and scalable reminders.

---

## 🚀 Features

- User authentication (Signup / Login / Logout)
- Cookie-based JWT authentication
- Create, update, delete tasks
- Task status tracking 
- Tags support 
- Set deadlines with email reminders
- Share tasks via public share link
- Background email processing using Redis queue

---

## 🧠 High-Level Architecture

The project is split into **three logical parts**:

1. **Backend API (Express + Prisma)**
   - Handles authentication and task CRUD
   - Stateless REST APIs
   - PostgreSQL as database

2. **Background Worker**
   - Runs a scheduler (cron-like job)
   - Pushes reminder jobs to Redis
   - Sends emails asynchronously

3. **Frontend (React + Vite)**
   - User interface
   - Auth state managed via Context
   - Communicates with backend via Axios

---

## 🏗️ Tech Stack

### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT (httpOnly cookies)
- BullMQ (Redis queue)
- Node-schedule (cron jobs)
- Nodemailer

### Frontend
- React
- TypeScript
- Vite
- React Router
- Axios
- Context API

### Infrastructure
- Redis (Upstash)
- PostgreSQL (managed)
- Deployed on AWS (EC2)
- Frontend deployed on Vercel

---

## 📦 Database Design

- **User** → stores auth & sharing info  
- **Task** → stores task details and reminder metadata  
- **Tag** → reusable tags  
- **TaskTag** → join table (many-to-many)

This normalized design avoids duplication and supports flexible tagging.

---

## 🔐 Authentication Flow

- User logs in → JWT stored in httpOnly cookie
- Frontend never accesses token directly
- `/auth/me` endpoint validates session
- Protected routes enforced on frontend and backend

---

## 🔄 Background Processing Flow

1. Scheduler runs every 10 minutes
2. Finds overdue, incomplete tasks
3. Pushes jobs to Redis queue
4. Worker consumes jobs
5. Sends reminder emails
6. Marks reminder as sent (prevents duplicates)

---

## 🧪 Environment Variables

### Backend
```env
DATABASE_URL=
JWT_PASSWORD=
GMAIL_USER=
GMAIL_PASS=

REDIS_HOST=
REDIS_PORT=
REDIS_PASSWORD=
NODE_ENV=production
