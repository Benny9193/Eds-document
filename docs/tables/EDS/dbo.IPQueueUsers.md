# Table: `dbo.IPQueueUsers`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 489930

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Per-user import-process queue assignments (~490K rows). Tracks `Requested`, `Started`, `Completed` timestamps and `Status` so background work can be parallelized and resumed.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `IPQueueUserId` | int | NO |  | YES |
| 2 | `IPQueueId` | int | NO |  |  |
| 3 | `UserId` | int | NO |  |  |
| 4 | `Requested` | datetime | NO | `(getdate())` |  |
| 5 | `Started` | datetime | YES |  |  |
| 6 | `Completed` | datetime | YES |  |  |
| 7 | `Status` | varchar(255) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
