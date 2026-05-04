# Table: `dbo.AlertConditionState`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 52

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `AlertID` | int | NO |  |  |
| 2 | `AlertLastEdit` | datetime2 | NO |  |  |
| 3 | `ConditionIndex` | int | NO |  |  |
| 4 | `Type` | int | NO |  |  |
| 5 | `ObjectId` | nvarchar(400) | NO |  |  |
| 6 | `TimeStamp` | datetime2 | NO |  |  |
| 7 | `Resolved` | bit | NO |  |  |
| 8 | `ResolveOn` | datetime2 | YES |  |  |
| 9 | `Context` | nvarchar(max) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_AlertConditionState` | YES | CLUSTERED | `AlertID`, `AlertLastEdit`, `ConditionIndex`, `Type`, `ObjectId` |  |
