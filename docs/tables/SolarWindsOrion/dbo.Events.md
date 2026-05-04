# Table: `dbo.Events`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 3282

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `EventID` | int | NO |  | YES |
| 2 | `EventTime` | datetime | YES |  |  |
| 3 | `NetworkNode` | int | YES |  |  |
| 4 | `NetObjectID` | int | YES |  |  |
| 5 | `NetObjectID2` | int | YES |  |  |
| 6 | `NetObjectValue` | nvarchar(255) | YES |  |  |
| 7 | `EventType` | smallint | YES |  |  |
| 8 | `Message` | nvarchar(max) | YES |  |  |
| 9 | `Acknowledged` | bit | NO |  |  |
| 10 | `EngineID` | int | YES |  |  |
| 11 | `NetObjectType` | varchar(10) | YES |  |  |
| 12 | `TimeStamp` | timestamp | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_EventTime` | no | NONCLUSTERED | `EventTime`, `NetObjectType`, `NetObjectID` |  |
| `IX_NetObjectID` | no | NONCLUSTERED | `NetObjectID` |  |
| `IX_NetworkNode` | no | CLUSTERED | `NetworkNode` |  |
