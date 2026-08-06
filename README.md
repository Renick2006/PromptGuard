# 🤖 PromptGuard

> **An AI-powered platform for prompt management, evaluation,
> versioning, and testing.**

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb)
![Python](https://img.shields.io/badge/Python-3.12-3776AB?logo=python)
![Groq](https://img.shields.io/badge/Groq-LLM-orange)

## 📖 Overview

PromptGuard is a full-stack AI application that helps developers and
prompt engineers manage, evaluate, version, and test prompts in one
place.

### Features

-   JWT Authentication
-   Project Management
-   Prompt CRUD
-   Prompt Versioning
-   AI Prompt Evaluation
-   Analytics Dashboard
-   Prompt Playground (Groq + Llama 3.3 70B)

## Tech Stack

### Frontend

-   React
-   Vite
-   Tailwind CSS
-   Axios
-   React Router
-   Recharts

### Backend

-   FastAPI
-   Python
-   MongoDB
-   Groq API
-   JWT Authentication

## Architecture

``` text
React
  │
Axios
  │
FastAPI
  │
Service Layer
  │
Repository Layer
  │
MongoDB
  │
Groq API
```

## Installation

### Backend

``` bash
cd backend
python -m venv .venv
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend

``` bash
cd frontend
npm install
npm run dev
```

## Environment Variables

``` env
MONGODB_URL=
SECRET_KEY=
GROQ_API_KEY=
```

## Screenshots

Add screenshots for: - Login - Dashboard - Projects - Evaluation -
Playground - Analytics

## Future Improvements

-   Deployment
-   Prompt Templates
-   Team Collaboration
-   Export Reports

## Author

**Renick Rajesh**

GitHub: https://github.com/Renick2006

## License

MIT
