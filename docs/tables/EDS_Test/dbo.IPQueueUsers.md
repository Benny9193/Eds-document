# Table: `dbo.IPQueueUsers`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 489217

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

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
