# District Manager

> Modern Node.js/React replacement for the legacy ASP DistrictManager application. Currently the most actively-developed repo in the org.

| | |
|---|---|
| **Project** | [District Manager](https://dev.azure.com/EDSIQ/District%20Manager) |
| **Repo** | [District Manager](https://dev.azure.com/EDSIQ/District%20Manager/_git/District%20Manager) |
| **Default branch** | `main` |
| **Size** | 78 MB |
| **Created** | 2026-01-07 |
| **Status** | Active development |
| **Clone (HTTPS)** | `https://EDSIQ@dev.azure.com/EDSIQ/District%20Manager/_git/District%20Manager` |
| **Clone (SSH)** | `git@ssh.dev.azure.com:v3/EDSIQ/District%20Manager/District%20Manager` |

## At a glance

Full-stack TypeScript app: **Express + mssql backend** and **React + Vite + MUI frontend**, deployed to **Azure AKS**, authenticated via **Azure AD / Entra ID SSO** with JWT session tokens. Replaces a legacy ASP system; reads/writes the existing EDSIQ SQL Server.

## Repository layout

```
/                     ← repo root (mostly empty wrapper)
├── .claude/          ← Claude Code config for the project
└── DistrictManager/  ← actual application
    ├── backend/                  ← Express.js + TypeScript API
    ├── frontend/                 ← React SPA (Vite)
    ├── k8s/                      ← Kubernetes manifests for AKS
    ├── devops/
    ├── scripts/
    ├── docker-compose.yml        ← local dev
    ├── docker-compose.prod.yml
    ├── azure-pipelines.yml       ← CI/CD definition
    ├── .dockerignore
    ├── .env                      ← ⚠️ committed env file (see Notes)
    ├── .env.prod.example
    ├── README.md
    └── CLAUDE.md
```

## Tech stack

**Backend** (`/DistrictManager/backend`)
- Node.js 20 LTS, Express.js, TypeScript
- `mssql` package against SQL Server (the EDS database)
- JWT auth with Azure AD / Entra ID SSO
- Zod for validation

**Frontend** (`/DistrictManager/frontend`)
- React 18 + TypeScript, built with Vite
- Material UI (MUI) + Tailwind CSS
- AG Grid for data tables
- TanStack Query (React Query) for server state
- React Hook Form + Zod
- React Router v6

**Infra**
- Docker Compose for local dev
- Azure Pipelines (`azure-pipelines.yml`) for CI/CD
- Kubernetes manifests under `k8s/` targeting AKS
- Sits behind Azure App Gateway (commit history shows path-param refactoring driven by Gateway compatibility)

## API surface (from README)

Auth (`/api/auth/*`), Districts (`/api/districts/*`), Schools (`/api/schools/*` and nested under districts), Users (with a `/users/:id/transfer` action between schools), Budgets. Backend listens on `:3000/api`, frontend dev server on `:5173`.

## Branches

| Branch | Notes |
|---|---|
| `main` | default — production target |
| `uat` | user acceptance testing |

No feature branches currently; work appears to land directly on `main`/`uat`.

## Recent activity

All recent commits by **David Harrison** (`davidh@ed-data.com`). Last 15 commits, all 2026-01-09:

| Date (UTC) | Commit |
|---|---|
| 2026-01-09 19:08 | Add path-based accounts endpoint for Azure App Gateway compatibility |
| 2026-01-09 18:46 | Fix price-plans and vendors routes to use correct table structure |
| 2026-01-09 18:37 | Fix shipping routes to use correct ShipLocations table |
| 2026-01-09 18:26 | Convert query param APIs to path params for Azure App Gateway compatibility |
| 2026-01-09 18:17 | Use path params instead of query strings for schools API |
| 2026-01-09 18:03 | Add debug logging for all incoming requests |
| 2026-01-09 17:56 | Add debug logging for schools route query params |
| 2026-01-09 17:44 | Remove broken vite.svg favicon and debug logging |
| 2026-01-09 17:36 | Remove ingress rewrite-target annotation to fix asset MIME types |
| 2026-01-09 17:23 | and again |
| 2026-01-09 17:13 | one more tweak |
| 2026-01-09 16:57 | Let's see what this does |
| 2026-01-09 16:23 | Change for /dm again |
| 2026-01-09 15:56 | test redeploy for not changing districts |
| 2026-01-09 15:29 | Minor tweaks plus debug info |

**Recurring themes:** Azure App Gateway path/query-param compatibility, ingress/MIME-type tuning, fixing routes against actual SQL table names. Suggests the current focus is getting the AKS deployment behind App Gateway working end-to-end.

## Pull requests

None — all states (Active, Completed, Abandoned). Work flows directly to `main`/`uat`.

## Build pipelines

| ID | Name | Created | Author |
|---|---|---|---|
| [62](https://dev.azure.com/EDSIQ/District%20Manager/_build/definition?definitionId=62) | District Manager | 2026-01-08 | David Harrison |

Single Azure Pipelines definition on the hosted `Azure Pipelines` agent pool. Build definition file: `DistrictManager/azure-pipelines.yml`.

## Notes & flags

- ⚠️ **`.env` is committed** at `DistrictManager/.env`. Even if values are placeholders, this is a footgun — accidental real secrets would land in history. Worth verifying contents and adding to `.gitignore` if it shouldn't be tracked.
- The "App Gateway compatibility" commits (path params replacing query strings) suggest the API contract was reshaped recently — older clients or docs referencing query-string endpoints may be stale.
- Project description on ADO is just "District Manager" — no further context. The substantive description lives in `DistrictManager/README.md`.
- A `CLAUDE.md` exists at `DistrictManager/CLAUDE.md` (Claude Code instructions specific to this repo).

## Source links

- [Repo home](https://dev.azure.com/EDSIQ/District%20Manager/_git/District%20Manager)
- [Branches](https://dev.azure.com/EDSIQ/District%20Manager/_git/District%20Manager/branches)
- [Pipelines](https://dev.azure.com/EDSIQ/District%20Manager/_build)
- [README on `main`](https://dev.azure.com/EDSIQ/District%20Manager/_git/District%20Manager?path=/DistrictManager/README.md)
