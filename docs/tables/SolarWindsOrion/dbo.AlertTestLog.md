# Table: `dbo.AlertTestLog`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `AlertTestID` | uniqueidentifier | NO |  | YES |
| 2 | `LogID` | bigint | NO |  | YES |
| 3 | `DateTime` | datetime | NO |  |  |
| 4 | `AlertDefID` | uniqueidentifier | NO |  |  |
| 5 | `Mode` | char(1) | NO |  |  |
| 6 | `NodeID` | int | NO |  |  |
| 7 | `NodeName` | nvarchar(250) | NO |  |  |
| 8 | `ObjectType` | varchar(50) | NO |  |  |
| 9 | `ObjectID` | varchar(150) | NO |  |  |
| 10 | `ObjectName` | nvarchar(250) | NO |  |  |
| 11 | `Message` | nvarchar(1000) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
