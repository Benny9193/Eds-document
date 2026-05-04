# Database Schema

This file is auto-generated from a live Azure SQL Server. To populate it, run:

```bash
npm install
npm run schema
```

The generator (`src/introspect.js`) reads connection settings from `.env` and writes a refreshed `SCHEMA.md` containing:

- All user databases (excluding system DBs `master`, `model`, `msdb`, `tempdb`)
- For each database:
  - Tables and views, grouped by schema, with row counts
  - Columns with data types, nullability, defaults, and PK markers
  - Foreign keys (parent column → referenced column, with `ON DELETE` / `ON UPDATE`)
  - Indexes (key columns and included columns, uniqueness, type)
  - Stored procedures and functions

## Connection (from `.env`)

| Setting | Value |
|---|---|
| `DB_SERVER` | `eds-sqlserver.eastus2.cloudapp.azure.com` |
| `DB_DATABASE` | `master` (default — set to a user database before running) |
| `DB_PORT` | `1433` |
| `DB_ENCRYPT` | `true` |
| `DB_TRUST_SERVER_CERTIFICATE` | `true` |

> **Note:** This SCHEMA.md is a placeholder. The introspection script could not be
> executed in the environment where this branch was prepared because outbound
> traffic on TCP 1433 was blocked. Run `npm run schema` from a host that can
> reach the SQL Server (e.g. allowlisted office IP / VPN) to overwrite this file
> with the live schema.
