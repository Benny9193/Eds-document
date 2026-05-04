# Table: `dbo.SDSErrors`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `sdsErrorId` | bigint | NO |  | YES |
| 2 | `sdsURL` | varchar(512) | YES |  |  |
| 3 | `error` | varchar(max) | YES |  |  |
| 4 | `logDate` | datetime | YES | `(getdate())` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
