# Table: `dbo.VoipCDRConfiguration`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | int | NO |  | YES |
| 2 | `Name` | nvarchar(100) | YES |  |  |
| 3 | `DateFormat` | nvarchar(32) | YES |  |  |
| 4 | `MsgFormat` | ntext(1073741823) | YES |  |  |
| 5 | `LastModified` | datetime | YES |  |  |
| 6 | `Type` | nvarchar(32) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
