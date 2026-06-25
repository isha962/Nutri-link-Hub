# EvalForge

A lightweight eval debugger for agent workflows.

**Live Demo:** https://evalforge-bice.vercel.app  
**GitHub Repo:** https://github.com/isha962/evalforge

## What it does

- Load a sample benchmark with 9 tasks
- Upload a tiny CSV or JSON benchmark file
- Run a deterministic mock `planner -> worker -> reviewer` evaluation
- Inspect result rows, traces, output, and score explanations
- Compare Prompt Version A vs Prompt Version B
- Show suggested fixes for failing patterns

## Run locally

### Backend

```bash
cd /Users/ishakm/Desktop/evalforge/backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

### Frontend

```bash
cd /Users/ishakm/Desktop/evalforge/frontend
npm install
npm run dev
```

Open `http://127.0.0.1:3000`.

## Deployment Notes

This project is structured for:

- `frontend/` as the Vercel project root
- `backend/` as a separate FastAPI service

### Environment variables

The frontend needs one public environment variable in production:

```bash
NEXT_PUBLIC_API_BASE_URL=https://your-backend-url
```

Local development falls back to `http://127.0.0.1:8000`, so no env var is required locally.

### Vercel readiness

- Set the Vercel root directory to `frontend`
- Build command: `npm run build`
- Output setting: Next.js default
- Add `NEXT_PUBLIC_API_BASE_URL` before deploying

The frontend production build can succeed on Vercel, but the app will only function fully once the FastAPI backend is hosted somewhere reachable by the frontend.
