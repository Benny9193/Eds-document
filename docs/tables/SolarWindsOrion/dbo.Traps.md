# Table: `dbo.Traps`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `TrapID` | bigint | NO |  | YES |
| 2 | `EngineID` | int | NO |  |  |
| 3 | `DateTime` | datetime | NO | `(getdate())` |  |
| 4 | `IPAddress` | varchar(50) | NO | `('0.0.0.0')` |  |
| 5 | `Community_ANSI` | varchar(255) | NO | `('')` |  |
| 6 | `Community_Unicode` | nvarchar(255) | YES |  |  |
| 7 | `Community` | nvarchar(255) | NO |  |  |
| 8 | `Tag_ANSI` | varchar(100) | NO | `('')` |  |
| 9 | `Tag_Unicode` | nvarchar(100) | YES |  |  |
| 10 | `Tag` | nvarchar(100) | NO |  |  |
| 11 | `Acknowledged` | tinyint | NO | `((0))` |  |
| 12 | `Hostname_ANSI` | varchar(255) | NO | `('')` |  |
| 13 | `Hostname_Unicode` | nvarchar(255) | YES |  |  |
| 14 | `Hostname` | nvarchar(255) | NO |  |  |
| 15 | `NodeID` | bigint | NO | `((0))` |  |
| 16 | `TrapType` | varchar(100) | NO | `('')` |  |
| 17 | `ColorCode` | int | YES |  |  |
| 18 | `TimeStamp` | timestamp | NO |  |  |
| 19 | `Message` | varchar(max) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_TrapNodeID` | no | NONCLUSTERED | `NodeID` |  |
| `IX_Traps_DateTime` | no | NONCLUSTERED | `DateTime` |  |
| `IX_Traps_TimeStamp` | no | NONCLUSTERED | `TimeStamp` |  |
| `IX_TrapType` | no | NONCLUSTERED | `TrapType` |  |
