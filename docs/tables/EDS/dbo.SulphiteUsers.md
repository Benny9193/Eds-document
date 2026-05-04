# Table: `dbo.SulphiteUsers`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1209

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Users authorized to act on Sulphite-specific workflow (~1.2K rows). Vendor-scoped allowlist tying `UserId` to the Sulphite ingest / matching path that uses `SulphiteDetail` / `SulphiteImport`.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SulphiteUserId` | int | NO |  | YES |
| 2 | `UserId` | int | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
