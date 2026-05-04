# AGENTS.md

This file provides guidance to Codex when working with code in this repository.

## Purpose

This repo connects to an Azure SQL Server (the EDS database server) and generates Markdown documentation for schema, routines, dependencies, and curated table descriptions. It is a documentation-generation tool, not an application. Generated output lives mainly in `SCHEMA.md`, `EDS_GUIDE.md`, `docs/tables/`, `docs/procedures/`, `docs/dependencies/`, and `apply-descriptions.sql`.

## Commands

- `npm run schema` - connect to the server, enumerate every online user database (`sys.databases` where `database_id > 4`), introspect each, and regenerate `SCHEMA.md` plus `docs/tables/<db>/...`. **Wipes and recreates `docs/tables/` on every run.**
- `npm run procs` - document procedures and functions for the curated production database list in `src/document-procedures.js`. Regenerates `docs/procedures/`. **Wipes and recreates `docs/procedures/` on every run.**
- `npm run deps` - scan routines, views, and triggers for cross-database references across the curated production database list in `src/document-dependencies.js`. Regenerates `docs/dependencies/`. **Wipes and recreates `docs/dependencies/` on every run.**
- `npm run guide` - regenerate the curated narrative `EDS_GUIDE.md` from `descriptions.json`, row counts, and the hand-curated domain layout in `src/generate-guide.js`.
- `npm run descriptions:sql` - generate idempotent `sp_addextendedproperty` / `sp_updateextendedproperty` SQL in `apply-descriptions.sql` from `descriptions.json`.
- `npm run descriptions:check` - validate that every `descriptions.json` key references a real database object or column.
- `npm run test:connection` - sanity-check connectivity (`src/test-connection.js`).
- `npm start` - minimal "who am I / what db" probe (`src/index.js`).

There are no tests, lint, or build steps. Use `node --check <file>` for a quick syntax check after editing scripts. Connection settings come from `.env` (see `.env.example`); `DB_DATABASE` only sets the initial connection context. `npm run schema` still iterates all online user databases regardless of that initial database.

## Architecture

Node.js codebase using `mssql` and direct catalog queries:

- `src/db.js` - single shared `ConnectionPool` (lazy `getPool()` + `query()` + `close()`). Use `request.input()` for parameters; never string-concatenate user input.
- `src/introspect.js` - schema documentation generator. For each online user database, `inspectDatabase(db)` queries `[<db>].INFORMATION_SCHEMA.*` and `[<db>].sys.*` to collect tables, views, columns, PKs, FKs, indexes, routines, row counts, view definitions, view dependencies, and curated descriptions. It renders per-table pages, per-view pages, per-database indexes, and root `SCHEMA.md`.
- `src/document-procedures.js` - procedure/function documentation generator for a fixed curated database list (`DBS`). It validates each configured DB against `sys.databases`, then documents routine metadata, parameters, defaults, definitions, dependency lists, callers, create/modify dates, and encrypted-module status under `docs/procedures/`.
- `src/document-dependencies.js` - cross-database dependency generator for the same curated production database list. It scans `sys.sql_modules.definition` for three-part names after stripping SQL comments, compares with `sys.sql_expression_dependencies`, and renders outbound/inbound pages plus a coupling matrix under `docs/dependencies/`.
- `src/generate-guide.js` - hand-curated EDS narrative guide. The domain layout is defined in code; descriptions come from `descriptions.json`; row counts are fetched from `EDS.sys.partitions`.
- `src/generate-ms-description-sql.js` - converts `descriptions.json` entries into idempotent `MS_Description` extended-property SQL.
- `src/validate-descriptions.js` - validates `descriptions.json` keys against `INFORMATION_SCHEMA.TABLES` and `INFORMATION_SCHEMA.COLUMNS`.
- `src/index.js` and `src/test-connection.js` - connection probes, not documentation generators.

Cross-database queries often bracket database names directly into SQL (`[${dbName}]...`). Keep database names trusted: use names returned by `sys.databases`, fixed internal allow-lists validated against `sys.databases`, or a safe SQL Server identifier quoting helper. Do not accept user-provided database names into these query builders without quoting and validation.

## Output Layout

```
SCHEMA.md                                      # root schema index
EDS_GUIDE.md                                   # curated EDS overview
apply-descriptions.sql                         # generated MS_Description script
docs/tables/<db>/README.md                     # per-database table/view index
docs/tables/<db>/<schema>.<object>.md          # one file per table or view
docs/procedures/README.md                      # procedures/functions root index
docs/procedures/<db>/README.md                 # per-database routine index
docs/procedures/<db>/<schema>.<routine>.md     # one file per procedure/function
docs/dependencies/README.md                    # cross-database dependency matrix
docs/dependencies/<db>/outbound.md             # references from this DB to others
docs/dependencies/<db>/inbound.md              # references from other DBs to this DB
```

Filenames go through `safeSegment()` (replaces non-`[A-Za-z0-9._-]` with `_`). Link helpers must stay in sync with their file builders or generated links break. Views and base tables share the same filename pattern in `docs/tables/<db>/`; view pages are distinguished by content (`# View:` heading, depends-on / used-by sections, SQL definition), and `SCHEMA.md` labels each row `table` or `view`.

## Descriptions

`descriptions.json` is the curated description source of truth.

- Object descriptions use keys like `<db>.<schema>.<object>`.
- Column descriptions use keys like `<db>.<schema>.<object>.<column>`.
- `npm run schema` inserts descriptions into generated table/view pages and database indexes.
- `npm run guide` uses selected object descriptions for the curated EDS tour.
- `npm run descriptions:sql` emits SQL Server extended-property statements from the same file.
- `npm run descriptions:check` should pass before trusting a new description batch.

## Conventions

- Do not introduce an ORM or query builder. The point of this repo is direct `INFORMATION_SCHEMA` / `sys.*` access.
- When adding a new schema metadata dimension, extend the relevant `inspect*()` function to return it on an `info` object, then thread it through renderers rather than re-querying inside renderers.
- Treat generated docs as disposable. Do not hand-edit files under `docs/tables/`, `docs/procedures/`, or `docs/dependencies/`; they will be overwritten.
- Keep `safeSegment()` and link-building helpers aligned across any new generated output.
- Escape Markdown table cell content when adding fields that can contain `|`, backticks, or newlines.
- Prefer deterministic output ordering for generated docs so diffs stay reviewable.
