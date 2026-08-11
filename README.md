# 🛡️ PromptGuard

### AI-Powered Prompt Engineering, Evaluation & Management Platform

PromptGuard is a full-stack AI platform designed to help users **create, organize, evaluate, version, and test prompts** using large language models.

The platform combines prompt management with automated AI evaluation, allowing users to understand the quality of their prompts and experiment with them through an interactive playground.

## ✨ Features

### 🔐 Authentication
- User registration and login
- JWT-based authentication
- Protected application routes
- Persistent authentication state
- User-specific project access

### 📁 Project Management
- Create and manage projects
- Organize prompts inside projects
- View recent projects from the dashboard
- Project-based prompt organization

### 📝 Prompt Management
- Create prompts
- Edit prompts
- Delete prompts
- View stored prompts
- Maintain prompt versions
- Restore previous prompt versions

### 🤖 AI Prompt Evaluation

PromptGuard uses an LLM to evaluate prompt quality based on:

- Quality Score
- Clarity Score
- Readability Score
- Estimated Token Usage
- Estimated API Cost
- Strengths
- Weaknesses
- Improved Prompt

The evaluation system treats the submitted prompt as text to analyze rather than executing the instructions contained inside it.

## 🏛️ Architecture

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
## 🛠️ Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Recharts
- Lucide React

### Backend
- Python
- FastAPI
- Uvicorn
- Pydantic
- JWT Authentication
- MongoDB / PyMongo
- Layered Architecture

### AI
- Groq API
- Llama 3.3 70B Versatile

### Database
- MongoDB Atlas

### Deployment
- Vercel
- Render

### Tools
- Git
- GitHub
- VS Code
- npm

## 🧪 Prompt Playground

Users can test saved prompts against custom inputs.

Example:

```text
Saved Prompt:
"You are an expert career assistant..."

Test Input:
"I am a second-year AI and Data Science student looking for an internship."

PromptGuard then generates an AI response using the saved prompt.
```

## 📸 Screenshots
<img width="1917" height="1087" alt="Screenshot 2026-08-11 110311" src="https://github.com/user-attachments/assets/39145e61-f0b9-48e6-8a21-c13c6d729df1" />
<img width="1915" height="1091" alt="Screenshot 2026-08-11 105704" src="https://github.com/user-attachments/assets/87604e57-0740-49f2-ba61-05edb9019f5e" />
<img width="1918" height="1087" alt="Screenshot 2026-08-11 105720" src="https://github.com/user-attachments/assets/9c90b5e9-5737-4527-ad50-0cdeb4363286" />
<img width="1918" height="1085" alt="Screenshot 2026-08-11 110207" src="https://github.com/user-attachments/assets/05ecad4b-05a6-40f3-91f6-fd1bbb275cb7" />
<img width="1918" height="1035" alt="Screenshot 2026-08-11 105830" src="https://github.com/user-attachments/assets/223ce6d5-6817-425a-9ae1-48014e03c7ad" />
<img width="1907" height="1082" alt="image" src="https://github.com/user-attachments/assets/42b08688-fba1-4e5d-950c-a259e4400a5d" />






## Author

**Renick Rajesh**

GitHub: https://github.com/Renick2006

## License

MIT
