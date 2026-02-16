# Taskly — Micro SaaS Productivity App

Taskly is a full‑stack, production‑ready micro‑SaaS productivity application built for hackathons and real‑world use.  
It provides secure authentication, task management (CRUD), status tracking, and cloud deployment using modern technologies.

---

## 🚀 Live Demo

- **Frontend (Vercel)**: https://taskly-frontend-iota.vercel.app (Expired)
- **Backend API (Render)**: https://taskly-backend-5gzf.onrender.com (Expired)  
- **API Docs (Swagger)**: https://taskly-backend-5gzf.onrender.com/docs

---

## ✨ Features

- 🔐 JWT‑based Authentication (Register & Login)
- 🗂️ Task CRUD (Create, Read, Update, Delete)
- 🔄 Task Status Updates (Todo / In‑Progress / Done)
- 🛡️ Protected Routes (Frontend + Backend)
- 🌍 Cloud Database (PostgreSQL on Render)
- ⚡ Async Backend with FastAPI
- ☁️ Production Deployment (Render + Vercel)

---

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI (Python)
- **ORM**: SQLAlchemy (Async)
- **Auth**: JWT (OAuth2 Password Flow)
- **Database**: PostgreSQL (Render)
- **Server**: Uvicorn

### Frontend
- **Framework**: React (Vite)
- **Styling**: TailwindCSS / Custom CSS
- **Routing**: React Router
- **Auth Handling**: LocalStorage + Protected Routes

### Deployment
- **Backend Hosting**: Render (Free tier)
- **Frontend Hosting**: Vercel
- **Database Hosting**: Render PostgreSQL

---

## 🏗️ Architecture

```
Browser (React)
      │
      ▼
Vercel Frontend
      │  HTTPS + JWT
      ▼
Render Backend (FastAPI)
      │
      ▼
PostgreSQL (Render)
```

---

## 📁 Repository Structure

```
Taskly/
 ├── backend/
 │   ├── app/
 │   │   ├── api/
 │   │   ├── core/
 │   │   ├── db/
 │   │   ├── models/
 │   │   └── main.py
 │   └── requirements.txt
 │
 ├── frontend/
 │   ├── src/
 │   ├── public/
 │   ├── package.json
 │   └── vite.config.js
 │
 └── README.md
```



---

## 🧪 Local Development Setup

### 1️⃣ Backend Setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend runs at:
```
http://127.0.0.1:8000
```

---

### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:
```
http://localhost:5173
```

---

## 🔐 Authentication Flow

1. User registers via `/auth/register`  
2. User logs in via `/auth/login`  
3. Backend returns JWT access token  
4. Frontend stores token in localStorage  
5. Token sent in `Authorization: Bearer <token>` header for all requests  

---

## 📡 API Endpoints

### Auth

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`

### Tasks

- `GET /api/v1/tasks` — Get all user tasks
- `POST /api/v1/tasks` — Create task
- `PUT /api/v1/tasks/{id}` — Update task
- `DELETE /api/v1/tasks/{id}` — Delete task

---

## 🧩 Branching Strategy

We follow a professional Git workflow:

- `main` → Production branch  
- `dev` → Development branch  

Flow:

```
feature → dev → main
```

Deployment is always done from `dev`, then merged into `main` once stable.

---

## ☁️ Deployment Summary

### Backend (Render)

- Connected to GitHub `dev` branch
- Auto‑deploy on push
- Uses Render PostgreSQL

### Frontend (Vercel)

- Deployed using Vercel CLI from `/frontend`
- Production build using Vite

---

## 🏆 Hackathon Readiness

This project is:

- Production deployed
- Secure authentication implemented
- Cloud database integrated
- Scalable architecture
- Clean Git workflow

Perfect for:

- Hackathons  
- Demo day  
- Portfolio project  
- SaaS MVP prototype  

---

## 🧠 Key Learnings

- Async FastAPI with SQLAlchemy
- JWT authentication
- CORS handling in production
- Monorepo deployment strategy
- Real cloud deployment workflow

---

## 👤 Author

**Anii (Aniket Bhil) 😊**  
 

---

## 📜 License

This project is licensed for educational and hackathon use.

---

> 🚀 *Taskly is a complete end‑to‑end SaaS prototype demonstrating real‑world full‑stack engineering practices.*

