# Table: `dbo.SDSs`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `sdsId` | bigint | NO |  | YES |
| 2 | `sdsURL` | varchar(512) | YES |  |  |
| 3 | `sdsPath` | varchar(512) | YES |  |  |
| 4 | `sdsHash` | bigint | YES |  |  |
| 5 | `dateLoaded` | datetime | YES | `(getdate())` |  |
| 6 | `dateChecked` | datetime | YES | `(getdate())` |  |
| 7 | `dateDeleted` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
