# Table: `dbo.DebugMsgs`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 23717841

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Generic application debug log (~23.7M rows) — one row per `Msg` with `LogDate`. Purely diagnostic; safe to truncate. The `_Orig` variant is an earlier rollover.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SysId` | bigint | NO |  | YES |
| 2 | `LogDate` | datetime | YES | `(getdate())` |  |
| 3 | `Msg` | varchar(1024) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `Idx_LogDate` | no | NONCLUSTERED | `LogDate` |  |
