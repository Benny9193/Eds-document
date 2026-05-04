# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Purpose

This repo connects to an Azure SQL Server (the EDS database server) and generates Markdown documentation of every user database's schema. It is a documentation-generation tool, not an application — output lives in `SCHEMA.md` and `docs/tables/`.

## Commands

- `npm run schema` — connect to the server, enumerate every online user database (`sys.databases` where `database_id > 4`), introspect each, and regenerate `SCHEMA.md` plus `docs/tables/<db>/...`. **Wipes and recreates `docs/tables/` on every run.**
- `npm run test:connection` — sanity-check connectivity (`src/test-connection.js`).
- `npm start` — minimal "who am I / what db" probe (`src/index.js`).

There are no tests, lint, or build steps. Connection settings come from `.env` (see `.env.example`); `DB_DATABASE` only sets the initial connection context — introspection iterates *all* user databases regardless.

## Architecture

Three-file Node.js codebase using `mssql`:

- `src/db.js` — single shared `ConnectionPool` (lazy `getPool()` + `query()` + `close()`). Use `request.input()` for params; never string-concatenate user input.
- `src/introspect.js` — the real program. One pass per database:
  1. `listUserDatabases()` finds targets.
  2. `inspectDatabase(db)` runs ~10 cross-database queries against `[<db>].INFORMATION_SCHEMA.*` and `[<db>].sys.*` to collect tables, columns, PKs, FKs, indexes, routines, row counts, and view metadata/dependencies (both directions).
  3. Renders three layers of Markdown: per-table page (`renderTablePage`), per-view page (`renderViewPage`, includes definition + depends-on/used-by), per-database index (`renderDbIndex`), and the root `SCHEMA.md` (`renderRootSchema`).
- `src/index.js` — trivial entry point unrelated to schema generation.

Cross-DB queries bracket the database name directly into SQL (`[${dbName}]...`). `dbName` comes from `sys.databases` so it's trusted, but keep it that way — don't accept user-provided database names into these query builders without quoting.

### Output layout

```
SCHEMA.md                              # root index, links into docs/tables/
docs/tables/<db>/README.md             # per-database index
docs/tables/<db>/<schema>.<table>.md   # one file per table or view
```

Filenames go through `safeSegment()` (replaces non-`[A-Za-z0-9._-]` with `_`); link helpers `tableLinkFromRoot` / `tableLinkFromDbIndex` must stay in sync with `tableFile()` or links break. Views and base tables share the same filename pattern and live in the same directory — view pages are distinguished by content (`# View:` heading, depends-on / used-by sections, SQL definition), and the root index labels each row `table` or `view`.

## Conventions

- Don't introduce an ORM or query builder — the whole point is direct `INFORMATION_SCHEMA` / `sys.*` access.
- When adding a new metadata dimension, extend `inspectDatabase()` to return it on the `info` object, then thread it through `renderTablePage` / `renderViewPage` / `renderDbIndex` rather than re-querying inside renderers.
- `npm run schema` is destructive to `docs/tables/`. Don't hand-edit files there; they will be overwritten.
