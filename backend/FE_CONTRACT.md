# Frontend API contract

Base URL (local): `http://localhost:4000`  
Set `NEXT_PUBLIC_API_URL` on the marketing site to this origin.

All public GETs return `{ data: ... }`. Unpublished rows are omitted.

| Method | Path | Notes |
|---|---|---|
| GET | `/api/v1/health` | Liveness |
| GET | `/api/v1/industries` | All published industries |
| GET | `/api/v1/industries/:slug` | One industry |
| GET | `/api/v1/companies?industryId=` | Optional filter |
| GET | `/api/v1/companies/:slug` | One company |
| GET | `/api/v1/products?industryId=&companyId=` | Optional filters |
| GET | `/api/v1/products/:slug` | One product (+ `specs` on detail) |
| GET | `/api/v1/search?q=` | `q` min 2 chars; **industries + companies + products** |
| POST | `/api/v1/chat` | Advanced concierge (Option B). See below. |

CORS: set `ALLOWED_ORIGINS` to the frontend origin. Credentials not required for public GETs/chat.

## Chat widget (`POST /api/v1/chat`)

Request:

```json
{
  "messages": [{ "role": "user", "content": "Looking for villa partners" }],
  "includeWhatsApp": true
}
```

Response:

```json
{
  "data": {
    "message": "…assistant reply…",
    "links": [
      {
        "type": "company",
        "id": 1,
        "slug": "acme-linen",
        "name": "Acme Linen",
        "summary": "…",
        "pathHint": "/catalogue/companies/acme-linen"
      }
    ],
    "whatsappUrl": "https://wa.me/919007331000?text=…",
    "aiConfigured": false
  }
}
```

- FE owns the chat UI; call this endpoint from the browser (CORS-allowed origin).
- `pathHint` is a suggested public path. FE may remap slugs to final routes; do not hard-require the hint path.
- Path templates are env-configurable on the backend: `PUBLIC_PATH_INDUSTRY`, `PUBLIC_PATH_COMPANY`, `PUBLIC_PATH_PRODUCT` (default `/catalogue/{type}s/{slug}`).
- `whatsappUrl` is a prefilled discovery summary handoff. Hide the button if null.
- When `aiConfigured` is false, the backend still returns a catalogue-grounded fallback reply (no OpenAI key yet).
- Never send the OpenAI key to the frontend.

## Owner mutations (admin cookie `psm_admin`)

`POST` collections and `PATCH`/`DELETE` `/api/v1/{industries|companies|products}/:slug`.

Media (admin only, multipart):

| Method | Path | Notes |
|---|---|---|
| GET | `/api/v1/media?ownerType=&ownerId=` | List |
| POST | `/api/v1/media` | Form fields: `file`, `ownerType`, `ownerId`, optional `alt` |
| DELETE | `/api/v1/media/:id` | Deletes DB row + disk file |

Uploaded files are served from the backend origin, e.g. `http://localhost:4000/assets/uploads/…`.

Do not call admin/auth routes from the marketing site. Enquiry stays WhatsApp (site CTA and/or chat handoff).
