# Table: `EDSWebRpts.REPMAN_REPORTS`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `EDSWebRpts`
**Approx rows:** 1

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `REPORT_NAME` | varchar(100) | NO |  | YES |
| 2 | `REPORT` | varbinary(8000) | NO |  |  |
| 3 | `REPORT_GROUP` | int | YES |  |  |
| 4 | `USER_FLAG` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
