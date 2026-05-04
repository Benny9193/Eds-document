# Table: `dbo.AlertTests`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `AlertTestID` | uniqueidentifier | NO |  | YES |
| 2 | `AlertDefID` | uniqueidentifier | NO |  |  |
| 3 | `AlertName` | nvarchar(255) | NO |  |  |
| 4 | `NodeID` | int | NO |  |  |
| 5 | `NodeName` | nvarchar(250) | NO |  |  |
| 6 | `ObjectType` | varchar(50) | NO |  |  |
| 7 | `ObjectID` | varchar(150) | NO |  |  |
| 8 | `ObjectName` | nvarchar(250) | NO |  |  |
| 9 | `Mode` | char(1) | NO |  |  |
| 10 | `Status` | char(1) | NO |  |  |
| 11 | `Initiated` | datetime | NO |  |  |
| 12 | `Completed` | datetime | NO | `((-2))` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
