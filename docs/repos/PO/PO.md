# PO

> Purchase order management & print application — Node.js API + React webapp deployed to AKS across Local/UAT/Prod tiers.

| | |
|---|---|
| **Project** | [PO](https://dev.azure.com/EDSIQ/PO) |
| **Repo** | [PO](https://dev.azure.com/EDSIQ/PO/_git/PO) |
| **Default branch** | `eds-235` *(unusual — not `main`)* |
| **Size** | 16.6 MB |
| **Created** | 2025-02-19 |
| **Status** | Active development (last commit 2026-04-15) |
| **Clone (HTTPS)** | `https://EDSIQ@dev.azure.com/EDSIQ/PO/_git/PO` |
| **Clone (SSH)** | `git@ssh.dev.azure.com:v3/EDSIQ/PO/PO` |

## At a glance

Two-tier app: an **Express/Node.js API** (`/api`) and a **React-style webapp** (`/webapp`), each with its own `package.json`. Deployed to **Azure AKS** with separate Dockerfiles and AKS manifests per environment (Core / Local / UAT / Prod). Process management via **PM2** (per-env `pm2.*.json`). Includes scheduled cron jobs (notably bounce-email pulling). Project description: *"The application to manage purchase orders like PO Management and PO Print."*

## Repository layout

```
/
├── .idea/                       ← JetBrains config
├── api/                         ← Express/Node API (server.js)
│   ├── configs/  controllers/  cron/  database/
│   ├── doc/  logs/  middleware/  models/
│   ├── po/  repository/  routes/  services/  task/  test/  util/
│   ├── package.json + package-lock.json
│   ├── pm2.json, pm2.local.json, pm2.uat.json, pm2.prod.json
│   ├── server.js
│   ├── run-app-{local,prod,uat}.sh, start-app.sh
│   ├── run-cron.ps1, run-local.ps1
│   └── run-task-pull-bounce-email.ps1
├── webapp/                      ← React-style frontend
│   ├── src/  public/  doc/
│   ├── package.json
│   ├── .eslintrc, .env-cmdrc
│   └── run-local.ps1
├── docker/                      ← supporting docker assets
├── pipeline/                    ← CI/CD support files
├── Dockerfile-Core
├── Dockerfile-Local
├── Dockerfile-Prod
├── Dockerfile-UAT
├── aks-deploy-prod.yaml
├── aks-deploy-uat.yaml
├── local-build-core.ps1
├── local-build.ps1
├── local-deploy.ps1
└── README.md                    ← stub (Microsoft template, not filled in)
```

## Tech stack

**API** (`/api`)
- Node.js + Express (`server.js` entrypoint)
- PM2 for process management with per-environment configs
- MVC-style layout: `controllers/`, `models/`, `routes/`, `services/`, `repository/`, `middleware/`
- Scheduled jobs in `cron/` and PowerShell tasks (e.g. `run-task-pull-bounce-email.ps1`)
- Bounce-email handling — implies SMTP/IMAP integration for delivery feedback

**Webapp** (`/webapp`)
- React-style SPA with `src/` + `public/`
- ESLint configured (`.eslintrc`)
- `env-cmdrc` for environment switching at build/run time
- PowerShell `run-local.ps1` for local dev

**Infra**
- Four Dockerfiles by environment (Core, Local, UAT, Prod)
- AKS deployment manifests (`aks-deploy-uat.yaml`, `aks-deploy-prod.yaml`)
- Three Azure Pipelines build definitions (Core/UAT/Prod)
- PowerShell-driven local build/deploy scripts

## Branches

**71 total branches.** Default: `eds-235`. Branch families:

- **Long-lived environments:** `prod`, `prod-bk`, `prod-bk-20260128`, `uat`, `core`
- **Ticket branches (`eds-NNN`):** `eds-461`, `eds-455`, `eds-454`, `eds-430`, `eds-427`, `eds-321`, `eds-294`, `eds-293`, `eds-279`, `eds-278`, `eds-272-import-user`, `eds-267`, `eds-266`, `eds-264`, `eds-237`, `eds-235`, …
- **Issue branches (`#NNN-Description`):** `#547-FilterEnhancements`, `#461-V2-SentMail`, `#460-PONumberDisplay`, `#458-ChangeOrderDate`, `#456-ViewPO`, `#453-UpdateDistrictUserAccCode`, `#452-BrowseIncidentalOrderUpload`, `#450-GenExecel-AccountCode`, `#449-GenExcel-AttentionCount`, `#448-GenExcelTaggedPOs`, `#440-POHeader-Spacing`, `#426-PrintSafeguards`, …and ~40 more

Two parallel issue-tracking conventions are in active use (`eds-NNN` and `#NNN`). They appear to overlap (e.g., commits reference `#461 EDS - …` while a corresponding `eds-461` branch exists).

## Recent activity

Last 15 commits (across all branches):

| Date (UTC) | Author | Comment |
|---|---|---|
| 2026-04-15 19:13 | Benny9193 | Fix PO export previously-exported false positive |
| 2026-04-01 07:59 | Kevin Mai | Merge `#461-V2-SentMail` → uat |
| 2026-04-01 07:56 | Kevin Mai | #461 EDS - Add Email Sending v2 |
| 2026-03-30 12:38 | Kevin Mai | Merge `#460-PONumberDisplay` → uat |
| 2026-03-30 12:37 | Kevin Mai | #462 EDS - Wrong Number of Copies Printed for Districts PO Detail |
| 2026-03-30 11:01 | Kevin Mai | Merge `#460-PONumberDisplay` → uat |
| 2026-03-30 10:58 | Kevin Mai | #460 EDS - Enhancement to PO Numbers Display |
| 2026-03-30 01:48 | Kevin Mai | Merge `eds-461` → `#458-#459-#461` |
| 2026-03-27 05:01 | Kevin Mai | #461 EDS - Create Account File Functionality - Add Email Sending |
| 2026-03-27 04:44 | Kevin Mai | Merge `eds-461` → uat |
| 2026-03-27 04:43 | Kevin Mai | #461 EDS - Create Account File Functionality - Add Email Sending |
| 2026-03-27 02:57 | Kevin Mai | Merge `eds-461` → uat |
| 2026-03-27 02:36 | Kevin Mai | #461 EDS - Create Account File Functionality - Add Email Sending |
| 2026-03-27 02:13 | Kevin Mai | #461 EDS - Create Account File Functionality - Add Email Sending |
| 2026-03-26 07:08 | Kevin Mai | #461 EDS - Create Account File Functionality - Add Email Sending |

**Contributors:** Kevin Mai (`kevin@webapper.net`), Benny9193 (`newnonnor@gmail.com`). The `webapper.net` email suggests Webapper is an outside dev shop contributing here.

**Recurring themes:** ticket-driven feature work (#460-#462), email-sending enhancements (#461 v2), PO export correctness, repeated merges into `uat`. Suggests a UAT-promote workflow rather than feature→main.

## Pull requests

None — `Active`/`Completed`/`Abandoned` all return zero. Work appears to land via direct merges between feature branches and `uat` rather than PRs.

## Build pipelines

| ID | Name | Created | Author |
|---|---|---|---|
| [56](https://dev.azure.com/EDSIQ/PO/_build/definition?definitionId=56) | EDS-PO-Core | 2025-02-19 | Steven Nguyen (`steven@webapper.net`) |
| [57](https://dev.azure.com/EDSIQ/PO/_build/definition?definitionId=57) | Eds-PO-UAT | 2025-05-20 | Steven Nguyen |
| [58](https://dev.azure.com/EDSIQ/PO/_build/definition?definitionId=58) | Eds-PO-Prod | 2025-03-18 | Steven Nguyen |

All three on the hosted `Azure Pipelines` agent pool. Pipelines authored by Webapper (Steven Nguyen) — same outside team as Kevin Mai.

## Notes & flags

- ⚠️ **Default branch is `eds-235`, not `main`/`prod`.** Whoever clones cold lands on a feature branch by default. Worth confirming this is intentional — likely a leftover from initial repo setup.
- ⚠️ **No filled-in README.** Root `README.md` is the Azure DevOps default Microsoft template ("TODO: Give a short introduction…"). Same for `api/README.md` and `webapp/README.md` (subdirs not shown but likely the same).
- The repo uses **two independent ticket conventions** — `eds-NNN` branch naming AND `#NNN-Description` branch naming — referencing what appear to be the same tickets. This is confusing for git archaeology; worth standardizing.
- The Webapper team (`@webapper.net`) appears to be the primary external developer — both the pipelines and the bulk of recent commits.
- 71 branches and zero PRs is unusual; a branch-cleanup pass might be valuable.

## Source links

- [Repo home](https://dev.azure.com/EDSIQ/PO/_git/PO)
- [Branches](https://dev.azure.com/EDSIQ/PO/_git/PO/branches)
- [Pipelines](https://dev.azure.com/EDSIQ/PO/_build)
