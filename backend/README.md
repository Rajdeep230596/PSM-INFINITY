# PSM Infinity backend

This folder is a **separate Next.js app**: JSON API for the public frontend + owner admin.

GoDaddy deploy this directory as its own Node.js app (second slot). The frontend app stays independent.

Local:

```bash
cd backend
cp .env.example .env
docker-compose up -d
# or: docker compose up -d
npm install
npm run db:migrate
npm run dev
```

- API/admin: http://localhost:4000  
- Frontend (other developer): http://localhost:3000, `ALLOWED_ORIGINS=http://localhost:3000`

See `FE_CONTRACT.md` for the public endpoints (catalogue, search, advanced chat).

Useful scripts:

```bash
npm run db:migrate
npm run admin:set-password -- 'new-password'
```

Password reset needs `SMTP_*` in production. Locally, forgot-password logs a `debugLink` when SMTP is unset.

Chatbot needs `OPENAI_API_KEY` (client-paid). Without it, `/api/v1/chat` still returns a catalogue-grounded fallback.

Draft concierge facts live in `content/curated-knowledge.json` — replace with client-approved copy before launch.
