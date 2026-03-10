# Resume Skill Gap Analyzer

Full-stack MERN application for analyzing skill gaps between a resume and a job description.

## Structure

- `backend/`: Node.js + Express API (MongoDB, OpenAI, Multer, pdf-parse)
- `frontend/`: React + Vite + Tailwind + Chart.js SPA

## Backend

```bash
cd backend
npm install
cp .env.example .env # then fill values
npm run dev
```

API runs by default on `http://localhost:5000`.

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs by default on `http://localhost:5173` and talks to the backend at `http://localhost:5000`.

