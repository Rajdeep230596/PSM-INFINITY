# PSM Infinity backend

This folder is a **separate Next.js app**: JSON API for the public frontend + owner admin.

GoDaddy deploy this directory as its own Node.js app (second slot). The frontend app stays independent.

Local:

```bash
cd backend
cp .env.example .env
docker compose up -d
npm install
npm run db:migrate
npm run dev
```

- API/admin: http://localhost:4000  
- Frontend (other developer): http://localhost:3000, `ALLOWED_ORIGINS=http://localhost:3000`

See `FE_CONTRACT.md` for the public endpoints.
