# Table: `dbo.IPQueue`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 5046

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `IPQueueId` | int | NO |  | YES |
| 2 | `Queue` | varchar(50) | NO |  |  |
| 3 | `Email` | varchar(255) | YES |  |  |
| 4 | `SingleFile` | tinyint | YES |  |  |
| 5 | `ToUser` | tinyint | YES |  |  |
| 6 | `Requested` | datetime | NO | `(getdate())` |  |
| 7 | `Started` | datetime | YES |  |  |
| 8 | `Completed` | datetime | YES |  |  |
| 9 | `Status` | varchar(255) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
