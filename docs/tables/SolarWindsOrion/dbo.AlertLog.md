# Table: `dbo.AlertLog`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `MsgID` | bigint | NO |  | YES |
| 2 | `LogDateTime` | datetime | NO | `(getdate())` |  |
| 3 | `AlertDefID` | uniqueidentifier | YES |  |  |
| 4 | `ObjectType` | varchar(50) | YES |  |  |
| 5 | `ObjectID` | varchar(150) | YES |  |  |
| 6 | `ObjectName` | nvarchar(250) | YES |  |  |
| 7 | `ActionType` | varchar(50) | YES |  |  |
| 8 | `Message` | nvarchar(1000) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_AlertLog_DateTime` | no | NONCLUSTERED | `LogDateTime` |  |
