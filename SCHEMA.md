# Database Schema

This file is auto-generated from a live Azure SQL Server. To populate it, run:

```bash
npm install
npm run schema
```

The generator (`src/introspect.js`) reads connection settings from `.env` and writes:

- **`SCHEMA.md`** (this file) — top-level overview with one section per database, each linking out to per-table pages.
- **`docs/tables/<dbname>/README.md`** — per-database index of tables, views, and routines.
- **`docs/tables/<dbname>/<schema>.<table>.md`** — one Markdown page per table/view, with:
  - Columns (type, nullability, default, PK marker)
  - Outgoing foreign keys (with cross-links to referenced tables)
  - Incoming foreign keys (back-references from tables that point at this one)
  - Non-PK indexes (key + included columns, uniqueness, type)
  - Approximate row count

The generator iterates every non-system database (skips `master`, `model`, `msdb`, `tempdb`), so you don't need to change `DB_DATABASE` to cover the full server. `docs/tables/` is wiped and rewritten on every run.

## Connection (from `.env`)

| Setting | Value |
|---|---|
| `DB_SERVER` | `eds-sqlserver.eastus2.cloudapp.azure.com` |
| `DB_DATABASE` | `master` (default — the script enumerates user DBs regardless) |
| `DB_PORT` | `1433` |
| `DB_ENCRYPT` | `true` |
| `DB_TRUST_SERVER_CERTIFICATE` | `true` |

> **Note:** This `SCHEMA.md` is a placeholder. The introspection script could not be
> executed in the environment where this branch was prepared because outbound
> traffic on TCP 1433 was blocked. Run `npm run schema` from a host that can
> reach the SQL Server (e.g. allowlisted office IP / VPN) to overwrite this file
> and generate the per-table docs.
