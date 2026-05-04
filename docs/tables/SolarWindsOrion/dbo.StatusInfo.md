# Table: `dbo.StatusInfo`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 26

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `StatusId` | int | NO |  | YES |
| 2 | `StatusName` | nvarchar(50) | NO |  |  |
| 3 | `ShortDescription` | nvarchar(max) | YES |  |  |
| 4 | `RollupType` | int | NO |  |  |
| 5 | `Ranking` | int | NO |  |  |
| 6 | `UiOrder` | int | NO |  |  |
| 7 | `Color` | nvarchar(20) | YES |  |  |
| 8 | `IconPostfix` | varchar(max) | YES |  |  |
| 9 | `ChildStatusMap` | int | NO |  |  |
| 10 | `DefaultIconName` | varchar(max) | YES |  |  |
| 11 | `CategoryStatusMap` | int | YES |  |  |
| 12 | `DisplayProperties` | nvarchar(max) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
