# Atharv Joshi — Portfolio Monorepo

A dark-first, terminal/pipeline-themed portfolio site with a live "Ask my portfolio"
RAG chat widget. Monorepo with an independently deployable `/frontend` (Vite + React +
TypeScript + Tailwind + Framer Motion) and `/backend` (FastAPI + FAISS + Google Gemini).

```
.
├── frontend/   # Vite React TS app — deploys to Vercel
└── backend/    # FastAPI RAG service — deploys to Render/Railway
```

All site copy lives in one file: [`frontend/src/content.ts`](frontend/src/content.ts).
Edit it, then re-run the backend's index builder (see below) to keep the chat widget's
knowledge in sync.

---

## 1. Local development

### Backend (FastAPI)

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env
# Edit .env and set GEMINI_API_KEY (get a free key at https://aistudio.google.com/apikey)
# ALLOWED_ORIGIN should match your frontend's URL (http://localhost:5173 for local dev)

python scripts/build_index.py   # builds the local FAISS index from data/content.json
uvicorn app.main:app --reload --port 8000
```

Check it's alive: `curl http://localhost:8000/api/health` → `{"status":"ok"}`.

### Frontend (Vite + React)

```bash
cd frontend
npm install

cp .env.example .env
# VITE_API_BASE_URL=http://localhost:8000 (already the default)

npm run dev
```

Open http://localhost:5173. The chat widget in the "GenAI Lab" section calls your
local backend directly.

### Updating your resume content

1. Edit `frontend/src/content.ts` (site copy) **and** `backend/data/content.json`
   (chat knowledge base) — keep them in sync.
2. Re-run `python scripts/build_index.py` in `backend/` to rebuild the FAISS index.
3. Restart the backend.

---

## 2. Deploying the backend (Render or Railway, free tier)

Both platforms can build directly from the `backend/Dockerfile`.

### Render

1. Push this repo to GitHub.
2. In Render: **New → Web Service** → connect the repo.
3. Set **Root Directory** to `backend`.
4. Render will detect the `Dockerfile` automatically (Runtime: Docker).
5. Add environment variables:
   - `GEMINI_API_KEY` = your Gemini API key
   - `ALLOWED_ORIGIN` = your Vercel frontend URL (e.g. `https://your-site.vercel.app`)
6. Deploy. Render sets `PORT` automatically — the Dockerfile already reads it.
7. Note the deployed URL (e.g. `https://your-backend.onrender.com`) — you'll need it
   for the frontend's `VITE_API_BASE_URL`.

> Free-tier services on Render spin down when idle and cold-start on the next request
> (can take ~30s). The chat widget already shows a friendly "waking up" message for
> this case — no action needed, just expect the first message after idle to be slow.

### Railway

1. In Railway: **New Project → Deploy from GitHub repo**.
2. Set the service's **Root Directory** to `backend`.
3. Railway detects the `Dockerfile` automatically.
4. Add environment variables (same as above): `GEMINI_API_KEY`, `ALLOWED_ORIGIN`.
5. Railway assigns a public URL and a `PORT` — no extra config needed.

---

## 3. Deploying the frontend (Vercel, free tier)

1. In Vercel: **Add New → Project** → import this repo.
2. Set **Root Directory** to `frontend`.
3. Framework preset: Vite (auto-detected).
4. Add environment variable:
   - `VITE_API_BASE_URL` = your deployed backend URL from step 2 (e.g.
     `https://your-backend.onrender.com`)
5. Deploy. `vercel.json` in `frontend/` already handles SPA routing/rewrites.

After both are deployed, update the backend's `ALLOWED_ORIGIN` env var to your final
Vercel URL and redeploy the backend so CORS allows it.

---

## 4. Before you go live — checklist

- [ ] Add your real résumé PDF at `frontend/public/resume.pdf` (referenced by the
      "Download Resume" buttons).
- [ ] Add an Open Graph preview image at `frontend/public/og-image.png` (1200×630
      recommended).
- [ ] Set a real `GEMINI_API_KEY` in the backend (free tier at
      https://aistudio.google.com/apikey).
- [ ] Set `ALLOWED_ORIGIN` on the backend to your exact deployed frontend origin.
- [ ] Rebuild the FAISS index (`python scripts/build_index.py`) any time
      `backend/data/content.json` changes, and redeploy the backend so the new index
      ships with it (the Dockerfile's `CMD` rebuilds it automatically on every boot).

---

## API endpoints

- `GET /api/health` — health check, also polled client-side for the nav bar's live status badge.
- `POST /api/chat` — `{ message }` → `{ reply }`. RAG chat, rate-limited to 10 req/min per IP.
- `POST /api/similarity` — `{ text_a, text_b }` → `{ similarity }` (0-1 cosine similarity between
  Gemini embeddings). Powers the "Labs" section's live embedding-similarity demo. Same rate limit.

## Tech stack

**Frontend:** React, Vite, TypeScript, Tailwind CSS, Framer Motion, React Router, lucide-react
**Backend:** FastAPI, FAISS (local vector index), Google Gemini (`gemini-embedding-001` for
embeddings, `gemini-flash-latest` for chat), slowapi (rate limiting)
