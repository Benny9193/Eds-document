# Table: `dbo.DistrictTypes`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 6

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DistrictTypeId` | int | NO |  | YES |
| 2 | `Description` | varchar(64) | YES |  |  |
| 3 | `UsesOnline` | tinyint | YES |  |  |
| 4 | `UsesBooklet` | tinyint | YES |  |  |
| 5 | `UsePriorYearReqs` | tinyint | YES |  |  |
| 6 | `VerifySBSOnline` | tinyint | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
