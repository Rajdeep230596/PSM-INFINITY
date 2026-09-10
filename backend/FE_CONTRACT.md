# Frontend API contract

Base URL (local): `http://localhost:4000`

All public GETs return `{ data: ... }`. Unpublished rows are omitted.

| Method | Path | Notes |
|---|---|---|
| GET | `/api/v1/health` | Liveness |
| GET | `/api/v1/industries` | All published industries |
| GET | `/api/v1/industries/:slug` | One industry |
| GET | `/api/v1/companies?industryId=` | Optional filter |
| GET | `/api/v1/companies/:slug` | One company |
| GET | `/api/v1/products?industryId=&companyId=` | Optional filters |
| GET | `/api/v1/products/:slug` | One product |
| GET | `/api/v1/search?q=` | `q` min 2 chars; companies + products |

CORS: set `ALLOWED_ORIGINS` to the frontend origin. Credentials not required for public GETs.

Owner mutations (cookie `psm_admin`): `POST` collections and `PATCH`/`DELETE` `/api/v1/{industries|companies|products}/:slug`. Public GETs omit unpublished rows.

Do not call admin/auth routes from the marketing site. Enquiry stays WhatsApp on the frontend.
